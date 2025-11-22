const {
  app,
  BrowserWindow,
  systemPreferences,
  ipcMain,
  dialog,
} = require("electron");
const path = require("path");

let mainWindow = null;

const mainBrowser = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "OfficePT",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:5173");
};

ipcMain.handle("show-camera-permission", async (event) => {
  const win = mainWindow || BrowserWindow.getFocusedWindow();
  const result = await dialog.showMessageBox(win, {
    type: "question",
    buttons: ["Allow", "Deny"],
    defaultId: 0,
    cancelId: 1,
    title: "Camera Permission",
    message: "Office PT would like access to your camera.",
  });
  return result.response === 0;
});

app.whenReady().then(mainBrowser);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
