import { registerAppEvents } from "./events/appEvents";
import { app, protocol } from 'electron';
import { createMainWindow } from "./windows/MainWindow";
import { WindowController } from "./ipc_controllers/windowController";
import { createWindowController } from "./ipc_controllers/createWindowController";
import themeController from "./ipc_controllers/themeController";
import { programmDirsController } from "./ipc_controllers/dirsController";
import { devControllers } from "./ipc_controllers/devControllsers";
import { initProgrammDirs } from "./data/intilizationProgrammDirs";
import { toolsController } from "./ipc_controllers/toolsController";


function init(){
  registerAppEvents();

  //#region ipc controllers
  WindowController();
  createWindowController();
  themeController();
  programmDirsController();
  devControllers();
  toolsController();
  //#endregion

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

    //#region data
    initProgrammDirs();
    //#endregion

    createMainWindow();

  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();