import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, CREATE_FOLDER_WINDOW_DEV_URL } from "../constains";
import Store from 'electron-store';

const store = new Store();
export let winAddFolder: BrowserWindow | null = null;

export function createAddFoldersWindow() {
    winAddFolder = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
        show: false,
        frame: false,
        title: "Add folder",
        webPreferences: {
          preload: __preloadpath,
          contextIsolation: true,
          nodeIntegration: false
        },
        minWidth: 550,
        minHeight: 400,
        height: 400,
        width: 550
    });

    const currentTheme = (store.get("theme") as 'light' | 'dark') || 'light';
    const currentPalette = (store.get("palette") as string) || "default";

    winAddFolder.webContents.on('did-finish-load', () => {
        winAddFolder?.webContents.send('update-theme', currentTheme);
        winAddFolder?.webContents.send('update-palette', currentPalette);
        winAddFolder?.show();
    });

    winAddFolder.on('closed', () => {
        winAddFolder = null;
    });

    if (VITE_DEV_SERVER_URL) {
        winAddFolder.loadURL(CREATE_FOLDER_WINDOW_DEV_URL);
    } else {
        winAddFolder.loadURL(`file://${RENDERER_DIST}/index.html#/settings`);
    }
}