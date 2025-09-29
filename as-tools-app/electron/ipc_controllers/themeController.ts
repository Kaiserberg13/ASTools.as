import { app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store();

export default function themeController(){
    ipcMain.handle('get-theme', async () => {
        const saved = store.get('theme');
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
        return 'light';
    });
    
    ipcMain.handle('get-palette', async () => {
        const saved = store.get('palette');
        if (typeof saved === 'string') return saved;
        return 'default';
    });

    app.whenReady().then(() => {
        ipcMain.on('set-theme', (_, newTheme: 'light' | 'dark') => {
            store.set("theme", newTheme);
    
            BrowserWindow.getAllWindows().forEach(win => {
                win.webContents.send('update-theme', newTheme);
            });
        });
    
        ipcMain.on('set-palette', (_, newPalette: string) => {
            store.set('palette', newPalette);
            
            BrowserWindow.getAllWindows().forEach(win => {
                win.webContents.send('update-palette', newPalette);
            });
        })
    })
}