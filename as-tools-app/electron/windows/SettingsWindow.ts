import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, SETTINGS_WINDOW_DEV_URL } from "../constains";

export let winSettings: BrowserWindow | null = null;

export function createSettingsWindow() {
    winSettings = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
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

    winSettings.webContents.on('did-finish-load', () => {
        winSettings?.webContents.send('main-process-message', (new Date).toLocaleString());
        winSettings?.show();
    });

    winSettings.on('closed', () => {
        winSettings = null;
    });

    if (VITE_DEV_SERVER_URL) {
        winSettings.loadURL(SETTINGS_WINDOW_DEV_URL);
    } else {
        winSettings.loadFile(path.join(RENDERER_DIST, "MainWindow/index.html#/settings"));
    }
}