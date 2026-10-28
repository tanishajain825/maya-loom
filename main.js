require("dotenv").config(); // loads UNSPLASH_ACCESS_KEY from .env (npm i dotenv)

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { execFile } = require("node:child_process");
const https = require("node:https");

const APP_NAME = "maya_loom"; // Unsplash wants your app name in links
const MAX_BYTES = 30 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const MAX_CACHE_ENTRIES = 50;
const photoCache = new Map(); // remembers results so we use fewer requests

// ---------- Window ----------
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
  if (!app.isPackaged) win.webContents.openDevTools();
}

// ---------- Unsplash API ----------
function unsplashRequest(urlString) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!apiKey) {
      reject(new Error("Missing UNSPLASH_ACCESS_KEY in .env file."));
      return;
    }

    const req = https.get(
      urlString,
      {
        timeout: 15000,
        headers: {
          Authorization: `Client-ID ${apiKey}`,
          "Accept-Version": "v1",
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode === 403 || res.statusCode === 429) {
            return reject(new Error("Unsplash limit reached. Try again in an hour."));
          }
          if (res.statusCode !== 200) {
            return reject(new Error("Unsplash error " + res.statusCode));
          }
          try {
            resolve(JSON.parse(body));
          } catch {
            reject(new Error("Bad response from Unsplash."));
          }
        });
      }
    );

    req.on("timeout", () => req.destroy(new Error("Unsplash request timed out.")));
    req.on("error", reject);
  });
}

ipcMain.handle("unsplash-search", async (_event, options = {}) => {
  const query = typeof options.query === "string" ? options.query.trim() : "";
  const category = typeof options.category === "string" ? options.category : "all";
  const page = Math.max(1, Number(options.page) || 1);

  const cacheKey = `${category}|${query}|${page}`;
  if (photoCache.has(cacheKey)) return photoCache.get(cacheKey);

  const url = query
    ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=24&page=${page}`
    : `https://api.unsplash.com/photos?order_by=popular&per_page=24&page=${page}`;

  const data = await unsplashRequest(url);

  // Search returns { results: [...] }, the home list returns [...]
  const photos = Array.isArray(data) ? data : data.results;
  const utm = `?utm_source=${APP_NAME}&utm_medium=referral`;

  const result = photos.map((photo) => ({
    name: (photo.alt_description || photo.description || `Photo by ${photo.user.name}`).slice(0, 60),
    category,
    image: photo.urls.regular, // shown on the card
    full: photo.urls.full,     // used for "Apply to Desktop"
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html + utm,
    downloadLocation: photo.links.download_location,
  }));

  if (photoCache.size >= MAX_CACHE_ENTRIES) {
    photoCache.delete(photoCache.keys().next().value); // drop oldest
  }
  photoCache.set(cacheKey, result);
  return result;
});

// Unsplash asks apps to "ping" them when a photo is actually used.
ipcMain.handle("unsplash-track-download", async (_event, downloadUrl) => {
  try {
    const parsed = new URL(downloadUrl);
    if (parsed.protocol !== "https:" || parsed.hostname !== "api.unsplash.com") return;
    await unsplashRequest(parsed.toString());
  } catch (error) {
    console.error("Could not report download:", error.message);
  }
});

// ---------- Wallpaper ----------
function downloadImage(url, filePath, redirectsLeft = MAX_REDIRECTS) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      const { statusCode, headers } = res;

      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        res.resume();
        if (redirectsLeft === 0) return reject(new Error("Too many redirects."));
        const next = new URL(headers.location, url).toString();
        return downloadImage(next, filePath, redirectsLeft - 1).then(resolve, reject);
      }

      if (statusCode !== 200) {
        res.resume();
        return reject(new Error(`Download failed (HTTP ${statusCode}).`));
      }

      if (!String(headers["content-type"] || "").startsWith("image/")) {
        res.resume();
        return reject(new Error("URL did not return an image."));
      }

      let received = 0;
      const file = fs.createWriteStream(filePath);

      res.on("data", (chunk) => {
        received += chunk.length;
        if (received > MAX_BYTES) req.destroy(new Error("Image too large."));
      });

      res.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
      res.on("error", (err) => {
        file.destroy();
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });

    req.on("timeout", () => req.destroy(new Error("Download timed out.")));
    req.on("error", reject);
  });
}

function setWindowsWallpaper(imagePath) {
  const script = `
$imagePath = $env:WALLPAPER_PATH
Add-Type @"
using System.Runtime.InteropServices;
public class Wallpaper {
  [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
  public static extern bool SystemParametersInfo(int action, int param, string path, int flags);
}
"@
if (-not [Wallpaper]::SystemParametersInfo(20, 0, $imagePath, 3)) {
  throw "Windows could not apply the wallpaper."
}
`;
  const encoded = Buffer.from(script, "utf16le").toString("base64");

  return new Promise((resolve, reject) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-EncodedCommand", encoded],
      { env: { ...process.env, WALLPAPER_PATH: imagePath }, windowsHide: true },
      (error, _stdout, stderr) => {
        if (error) reject(new Error("Could not apply wallpaper: " + (stderr || error.message)));
        else resolve();
      }
    );
  });
}

async function cleanOldWallpapers(dir, keepFile) {
  try {
    for (const name of await fs.promises.readdir(dir)) {
      const full = path.join(dir, name);
      if (/^wallpaper-\d+\.jpg$/.test(name) && full !== keepFile) {
        fs.promises.unlink(full).catch(() => {});
      }
    }
  } catch {}
}

ipcMain.handle("apply-wallpaper", async (_event, imageUrl) => {
  if (os.platform() !== "win32") {
    throw new Error("Wallpaper integration supports Windows only.");
  }
  if (typeof imageUrl !== "string") {
    throw new Error("Invalid wallpaper image.");
  }

  let parsed;
  try {
    parsed = new URL(imageUrl);
  } catch {
    throw new Error("Invalid image URL.");
  }
  // Only Unsplash images are ever applied
  if (parsed.protocol !== "https:" || parsed.hostname !== "images.unsplash.com") {
    throw new Error("Only Unsplash image URLs are allowed.");
  }

  const dir = app.getPath("userData");
  await fs.promises.mkdir(dir, { recursive: true });
  const wallpaperPath = path.join(dir, `wallpaper-${Date.now()}.jpg`);

  await downloadImage(imageUrl, wallpaperPath);
  await setWindowsWallpaper(wallpaperPath);
  cleanOldWallpapers(dir, wallpaperPath);

  return { success: true, message: "Wallpaper applied successfully!" };
});

app.whenReady().then(createWindow);