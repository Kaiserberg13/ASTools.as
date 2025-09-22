import { BrowserWindow, app, ipcMain, protocol } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __approot = path.join(__dirname, "..");
const __preloadpath = path.join(__dirname, "preload.mjs");
const MAIN_WINDOW_DEV_URL = "http://localhost:3000/";
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(__approot, "dist");
const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(__approot, "public") : RENDERER_DIST;
let win = null;
function createMainWindow() {
  win = new BrowserWindow({
    icon: path.join(VITE_PUBLIC, "electron-vite.svg"),
    show: false,
    frame: false,
    webPreferences: {
      preload: __preloadpath,
      contextIsolation: true,
      nodeIntegration: false
    },
    minWidth: 800,
    minHeight: 600,
    height: 600,
    width: 800
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    win == null ? void 0 : win.show();
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_DEV_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "MainWindow/index.html"));
  }
}
function registerAppEvents() {
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
}
function WindowController() {
  let win2;
  ipcMain.on("window-minimize", () => {
    win2 = BrowserWindow.getFocusedWindow();
    if (win2) win2.minimize();
  });
  ipcMain.on("window-toggle-maximize", () => {
    win2 = BrowserWindow.getFocusedWindow();
    if (win2) {
      if (win2.isMaximized()) {
        win2.unmaximize();
      } else {
        win2.maximize();
      }
    }
  });
  ipcMain.on("window-close", () => {
    win2 = BrowserWindow.getFocusedWindow();
    if (win2) win2.close();
  });
}
function init() {
  registerAppEvents();
  WindowController();
  app.whenReady().then(() => {
    protocol.registerFileProtocol("save-file", (request, callback) => {
      const filePath = request.url.replace(`save-file://`, "");
      try {
        callback(decodeURIComponent(filePath));
      } catch (error) {
        console.error("Protocol error:", error);
        callback({ error: -6 });
      }
    });
    createMainWindow();
  }).catch((e) => {
    console.error("Failed to create window:", e);
  });
}
init();
