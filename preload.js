const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Unsplash se photos search karo
  unsplashSearch: (options) => ipcRenderer.invoke("unsplash-search", options),

  // Photo use hone par Unsplash ko batao (unka rule hai)
  unsplashTrackDownload: (downloadUrl) =>
    ipcRenderer.invoke("unsplash-track-download", downloadUrl),

  // Wallpaper set karo
  applyWallpaper: (imageUrl) => ipcRenderer.invoke("apply-wallpaper", imageUrl),
});