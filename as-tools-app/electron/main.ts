import { registerAppEvents } from "./events/appEvents";
import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { createMainWindow } from "./windows/MainWindow";
import { WindowController } from "./ipc_controllers/windowController";
import { createWindowController } from "./ipc_controllers/createWindowController";
import Store from 'electron-store';

const store = new Store();

function init(){
  registerAppEvents();

  WindowController();
  createWindowController();
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
    protocol.registerFileProtocol('save-file', (request, callback) => {
      const filePath = request.url.replace(`save-file://`, '');
      try {
        callback(decodeURIComponent(filePath));
      } catch (error) {
        console.error('Protocol error:', error);
        callback({ error: -6 });
      }
    })
    createMainWindow();

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
  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();