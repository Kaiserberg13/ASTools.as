import { registerAppEvents } from "./events/appEvents";
import { app, protocol } from 'electron';
import { createMainWindow } from "./windows/MainWindow";
import { WindowController } from "./ipc_controllers/windowController";
import { createWindowController } from "./ipc_controllers/createWindowController";

function init(){
  registerAppEvents();

  WindowController();
  createWindowController();

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
  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();