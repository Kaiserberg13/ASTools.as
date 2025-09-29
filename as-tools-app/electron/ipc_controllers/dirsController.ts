import { app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import { theme_dir, THEME_DIR_DEV_PATH, tool_dir, TOOL_DIR_DEV_PATH, VITE_DEV_SERVER_URL } from '../constains';

const store = new Store();

export function programmDirsController() {
    registerDirInStore("tools", TOOL_DIR_DEV_PATH, tool_dir);
    registerDirInStore("theme", THEME_DIR_DEV_PATH, theme_dir);
}

function registerDirInStore(name: string, DEV_PATH: string, production_path: string) {
    if(!store.has(`${name}-dir`)) {
        if(VITE_DEV_SERVER_URL) {
            store.set(`${name}-dir`, DEV_PATH);
        } else {
            store.set(`${name}-dir`, production_path);
        }
    }

    ipcMain.handle(`get-${name}-dir`, async () => {
        return store.get(`${name}-dir`)
    });

    app.whenReady().then(() => {
        ipcMain.on(`set-${name}-dir`, (_, newDir: string) => {
            store.set(`${name}-dir`, newDir);
    
            BrowserWindow.getAllWindows().forEach(win => {
                win.webContents.send(`update-${name}-dir`, newDir);
            });
        });
    })
}