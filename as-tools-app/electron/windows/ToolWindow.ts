import { BrowserWindow } from "electron";
import path from "node:path";
import { __preloadpath, VITE_PUBLIC, RENDERER_DIST, VITE_DEV_SERVER_URL, TOOL_WINDOW_DEV_URL } from "../constains";
import Store from 'electron-store';

const store = new Store();
export let winTool: BrowserWindow | null = null;

export function createToolWindow(toolId: string) {
    winTool = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'logoAST.png'),
        show: false,
        frame: false,
        title: toolId,
        webPreferences: {
          preload: __preloadpath,
          contextIsolation: true,
          nodeIntegration: false
        },
        minWidth: 400,
        minHeight: 550,
        height: 550,
        width: 400
    });

    const currentTheme = (store.get("theme") as 'light' | 'dark') || 'light';
    const currentPalette = (store.get("palette") as string) || "default";

    winTool.webContents.on('did-finish-load', () => {
        winTool?.webContents.send('update-theme', currentTheme);
        winTool?.webContents.send('update-palette', currentPalette);
        winTool?.show();
    });

    winTool.on('closed', () => {
        winTool = null;
    });

    if (VITE_DEV_SERVER_URL) {
        winTool.loadURL(`${TOOL_WINDOW_DEV_URL}/${toolId}`);
    } else {
        winTool.loadURL(`file://${RENDERER_DIST}/index.html#/tool/${toolId}`);
    }
}