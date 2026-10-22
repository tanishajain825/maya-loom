
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mayaAPI", {
  getMessage: () => "Maya Loom is running!",
  applyWallpaper: (imagePath) =>
    ipcRenderer.invoke("apply-wallpaper", imagePath)
});
