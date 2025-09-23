import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, SETTINGS_WINDOW_DEV_URL } from "../constains";
import Store from 'electron-store';

const store = new Store();
export let winSettings: BrowserWindow | null = null;

export function createSettingsWindow() {
    winSettings = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
        show: false,
        frame: false,
        title: "settings",
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

    const currentTheme = (store.get("theme") as 'light' | 'dark') || 'light';

    winSettings.webContents.on('did-finish-load', () => {
        winSettings?.webContents.send('update-theme', currentTheme);
        winSettings?.show();
    });

    winSettings.on('closed', () => {
        winSettings = null;
    });

    if (VITE_DEV_SERVER_URL) {
        winSettings.loadURL(SETTINGS_WINDOW_DEV_URL);
    } else {
        winSettings.loadFile(`file://${RENDERER_DIST}/MainWindow/index.html#/settings`);
    }
}