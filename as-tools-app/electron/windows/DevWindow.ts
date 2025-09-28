import { BrowserWindow, ipcMain } from "electron";
import path from "node:path";

import { 
    __preloadpath, 
    __filename, 
    __dirname, 
    tool_dir,
    theme_dir,
    VITE_PUBLIC, 
    RENDERER_DIST, 
    VITE_DEV_SERVER_URL, 
    DEV_WINDOW_DEV_URL,
    __approot, 
    MAIN_WINDOW_DEV_URL,
    SETTINGS_WINDOW_DEV_URL,
    TOOL_WINDOW_DEV_URL,
    CREATE_FOLDER_WINDOW_DEV_URL,
    TOOL_DIR_DEV_PATH,
    THEME_DIR_DEV_PATH
} from "../constains";

import Store from 'electron-store';

const store = new Store();
export let winDev: BrowserWindow | null = null;

export function createDevWindow() {
    winDev = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
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

    ipcMain.handle('get-constains', () => {
        const devView = {
            __filename: __filename,
            __dirname: __dirname,
            __approot: __approot,
            __preloadpath: __preloadpath,
        
            tool_dir: tool_dir,
            theme_dir: theme_dir,
            
            MAIN_WINDOW_DEV_URL: MAIN_WINDOW_DEV_URL,
            SETTINGS_WINDOW_DEV_URL: SETTINGS_WINDOW_DEV_URL,
            TOOL_WINDOW_DEV_URL: TOOL_WINDOW_DEV_URL,
            DEV_WINDOW_DEV_URL: DEV_WINDOW_DEV_URL,
            CREATE_FOLDER_WINDOW_DEV_URL: CREATE_FOLDER_WINDOW_DEV_URL,
            
            VITE_DEV_SERVER_URL: VITE_DEV_SERVER_URL,
            RENDERER_DIST: RENDERER_DIST,
            VITE_PUBLIC: VITE_PUBLIC,
            
            TOOL_DIR_DEV_PATH: TOOL_DIR_DEV_PATH,
            THEME_DIR_DEV_PATH: THEME_DIR_DEV_PATH
        };
        return devView;
    })

    if (VITE_DEV_SERVER_URL) {
        winDev.loadURL(DEV_WINDOW_DEV_URL);
    } else {
        winDev.loadURL(`file://${RENDERER_DIST}/index.html#/dev`);
    }
}