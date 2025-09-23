import { BrowserWindow, app, ipcMain, protocol } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __approot = path.join(__dirname, "..");
const __preloadpath = path.join(__dirname, "preload.mjs");
const MAIN_WINDOW_DEV_URL = "http://localhost:3000/";
const SETTINGS_WINDOW_DEV_URL = "http://localhost:3000/#/settings";
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(__approot, "dist");
const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(__approot, "public") : RENDERER_DIST;
let winMain = null;
function createMainWindow() {
  winMain = new BrowserWindow({
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
  winMain.webContents.on("did-finish-load", () => {
    winMain == null ? void 0 : winMain.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    winMain == null ? void 0 : winMain.show();
  });
  if (VITE_DEV_SERVER_URL) {
    winMain.loadURL(MAIN_WINDOW_DEV_URL);
  } else {
    winMain.loadFile(path.join(RENDERER_DIST, "MainWindow/index.html"));
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
  let win;
  ipcMain.on("window-minimize", () => {
    win = BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
  });
  ipcMain.on("window-toggle-maximize", () => {
    win = BrowserWindow.getFocusedWindow();
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });
  ipcMain.on("window-close", () => {
    win = BrowserWindow.getFocusedWindow();
    if (win) win.close();
  });
}
let winSettings = null;
function createSettingsWindow() {
  winSettings = new BrowserWindow({
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
  winSettings.webContents.on("did-finish-load", () => {
    winSettings == null ? void 0 : winSettings.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    winSettings == null ? void 0 : winSettings.show();
  });
  winSettings.on("closed", () => {
    winSettings = null;
  });
  if (VITE_DEV_SERVER_URL) {
    winSettings.loadURL(SETTINGS_WINDOW_DEV_URL);
  } else {
    winSettings.loadFile(path.join(RENDERER_DIST, "MainWindow/index.html#/settings"));
  }
}
function createWindowController() {
  ipcMain.on("open-settings-window", () => {
    if (winSettings == null ? void 0 : winSettings.isClosable) {
      winSettings.focus();
    } else {
      createSettingsWindow();
    }
  });
}
function init() {
  registerAppEvents();
  WindowController();
  createWindowController();
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
