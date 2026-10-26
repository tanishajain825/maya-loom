
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { execFile } = require("node:child_process");
const https = require("node:https");
const http = require("node:http");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;

    client.get(url, (response) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        downloadImage(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error("Could not download wallpaper."));
        return;
      }

      const file = fs.createWriteStream(filePath);
      response.pipe(file);

      file.on("finish", () => {
        file.close(resolve);
      });

      file.on("error", (error) => {
        fs.unlink(filePath, () => {});
        reject(error);
      });
    }).on("error", reject);
  });
}


ipcMain.handle("apply-wallpaper", async (event, imageUrl) => {
  console.log("Main process recieved wallpaper request");
  if (os.platform() !== "win32") {
    throw new Error("Wallpaper integration supports Windows only.");
  }

  if (typeof imageUrl !== "string") {
    throw new Error("Invalid wallpaper image.");
  }

  const parsedUrl = new URL(imageUrl);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Invalid image URL.");
  }

  const wallpaperPath = path.join(
    app.getPath("userData"),
    "current-wallpaper.jpg"
  );

  await fs.promises.mkdir(path.dirname(wallpaperPath), {
    recursive: true
  });

  await downloadImage(imageUrl, wallpaperPath);

  const script = `
    $imagePath = $env:WALLPAPER_PATH

    Add-Type @"
using System.Runtime.InteropServices;
public class Wallpaper {
  [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
  public static extern bool SystemParametersInfo(
    int action, int param, string path, int flags
  );
}
"@

    $result = [Wallpaper]::SystemParametersInfo(20, 0, $imagePath, 3)

    if (-not $result) {
      throw "Windows could not apply the wallpaper."
    }
  `;

  await new Promise((resolve, reject) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-Command", script],
      {
        env: {
          ...process.env,
          WALLPAPER_PATH: wallpaperPath
        }
      },
      (error) => {
        if (error) {
          reject(new Error("Could not apply wallpaper: " + error.message));
        } else {
          resolve();
        }
      }
    );
  });

  console.log("Main process finished applying wallpaper");

  return {
    success: true,
    message: "Wallpaper applied successfully!"
  };
});

app.whenReady().then(createWindow);