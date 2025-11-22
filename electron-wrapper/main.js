const { app, BrowserWindow } = require("electron");
const path = require("path");

const mainBrowser = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "OfficePT",
  });

  win.webContents.openDevTools();

  win.loadURL("http://localhost:5173");
};

app.whenReady().then(mainBrowser);
