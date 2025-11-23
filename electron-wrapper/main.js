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
    icon: path.join(__dirname, "assets/logo.png"),
    autoHideMenuBar: true,
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:5173");
};

app.whenReady().then(mainBrowser);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
