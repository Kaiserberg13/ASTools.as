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

  app.whenReady().then(() => {
    protocol.registerFileProtocol('save-file', (request, callback) => {
      const filePath = request.url.replace(`save-file://`, '');
      try {
        callback(decodeURIComponent(filePath)); // Возвращаем путь к файлу
      } catch (error) {
        console.error('Protocol error:', error);
        callback({ error: -6 }); // FILE_NOT_FOUND
      }
    })
    createMainWindow();

    ipcMain.on('set-theme', (event, newTheme: 'light' | 'dark') => {
      store.set("theme", newTheme);

      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('update-theme', newTheme);
      });
    });

  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();