const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  requestCameraPermission: () => ipcRenderer.invoke("show-camera-permission"),
});
