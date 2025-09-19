import { BrowserWindow, ipcMain } from "electron";

export function WindowController() {
    let win: BrowserWindow | null;

    ipcMain.on('window-minimize', () => {
        win = BrowserWindow.getFocusedWindow();
        if (win) win.minimize()
    })

    ipcMain.on('window-toggle-maximize', () => {
        win = BrowserWindow.getFocusedWindow();
        if (win) {
            if (win.isMaximized()) {
            win.unmaximize()
            } else {
            win.maximize()
            }
        }
    })
    
    ipcMain.on('window-close', () => {
        win = BrowserWindow.getFocusedWindow();
        if (win) win.close()
    })
}