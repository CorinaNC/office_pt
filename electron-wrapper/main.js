const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

const mainBrowser = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "OfficePT",
    icon: path.join(__dirname, "assets/logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
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
