import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, MAIN_WINDOW_DEV_URL } from "../constains";
import Store from 'electron-store';

const store = new Store();
export let winMain: BrowserWindow | null = null;

export function createMainWindow() {
    winMain = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'logoAST.png'),
        show: false,
        frame: false,
        webPreferences: {
          preload: __preloadpath,
          contextIsolation: true,
          nodeIntegration: false
        },
        minWidth: 985,
        minHeight: 700,
        height: 700,
        width: 985
    });

    const currentTheme = (store.get("theme") as 'light' | 'dark') || 'light';
    const currentPalette = (store.get("palette") as string) || "default";

    winMain.webContents.on('did-finish-load', () => {
        winMain?.webContents.send('update-theme', currentTheme);
        winMain?.webContents.send('update-palette', currentPalette);
        winMain?.show();
    });

    if (VITE_DEV_SERVER_URL) {
        winMain.loadURL(MAIN_WINDOW_DEV_URL);
    } else {
        winMain.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
}