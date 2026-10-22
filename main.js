
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const fs = require("node:fs");
const { execFile} = require("node:child_process");
const os = require("node:os");



ipcMain.handle("apply-wallpaper", async (event, imagePath) => {
  if (typeof imagePath !== "string" || !path.isAbsolute(imagePath)) {
    throw new Error("Please provide a valid image path.");
  }

  if (!fs.existsSync(imagePath)) {
    throw new Error("The selected image file does not exist.");
  }

  if (os.platform() !== "win32") {
    throw new Error("Wallpaper integration currently supports Windows only.");
  }

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
  { env: { ...process.env, WALLPAPER_PATH: imagePath } },
  (error) => {
    if (error) {
      reject(new Error("Could not apply wallpaper: " + error.message));
    } else {
      resolve();
    }
  }
);

  });

  return { success: true, message: "Wallpaper applied successfully!" };
});



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
}

app.whenReady().then(createWindow);
