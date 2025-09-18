import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, MAIN_WINDOW_DEV_URL } from "../constains";

export let win: BrowserWindow | null = null;

export function createMainWindow() {
    win = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
        show: false,
        webPreferences: {
          preload: __preloadpath,
          contextIsolation: true,
          nodeIntegration: false
        },
    });

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString());
        win?.show();
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(MAIN_WINDOW_DEV_URL);
    } else {
        win.loadFile(path.join(RENDERER_DIST, "MainWindow/index.html"));
    }
}