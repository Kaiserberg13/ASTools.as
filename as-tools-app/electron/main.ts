import { registerAppEvents } from "./events/appEvents";
import { app, protocol } from 'electron';
import { createMainWindow } from "./windows/MainWindow";
import { WindowController } from "./ipc_controllers/windowController";
import { createWindowController } from "./ipc_controllers/createWindowController";
import themeController from "./ipc_controllers/themeController";
import { programmDirsController } from "./ipc_controllers/dirsController";
import { devControllers } from "./ipc_controllers/devControllsers";
import { initProgrammDirs } from "./data/intilizationProgrammDirs";


function init(){
  registerAppEvents();

  WindowController();
  createWindowController();
  themeController();
  programmDirsController();
  devControllers();

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

    initProgrammDirs();

    createMainWindow();

  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();