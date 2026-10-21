
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("mayaAPI", {
  getMessage: () => "Maya Loom is running!"
});
