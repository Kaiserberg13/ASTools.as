import { BrowserWindow } from "electron";
import path from "node:path";

import { 
    __preloadpath, 
    __filename, 
    __dirname, 
    VITE_PUBLIC, 
    RENDERER_DIST, 
    VITE_DEV_SERVER_URL, 
    DEV_WINDOW_DEV_URL,
    __approot,
} from "../constains";

import Store from 'electron-store';

const store = new Store();
export let winDev: BrowserWindow | null = null;

export function createDevWindow() {
    winDev = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'logoAST.png'),
        show: false,
        frame: false,
        title: "dev",
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
    const currentPalette = (store.get("palette") as string) || "default";

    winDev.webContents.on('did-finish-load', () => {
        winDev?.webContents.send('update-theme', currentTheme);
        winDev?.webContents.send('update-palette', currentPalette);
        winDev?.show();
    });

    winDev.on('closed', () => {
        winDev = null;
    });

    if (VITE_DEV_SERVER_URL) {
        winDev.loadURL(DEV_WINDOW_DEV_URL);
    } else {
        winDev.loadURL(`file://${RENDERER_DIST}/index.html#/dev`);
    }
}