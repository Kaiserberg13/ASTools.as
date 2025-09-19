import { registerAppEvents } from "./events/appEvents";
import { app } from 'electron';
import { createMainWindow } from "./windows/MainWindow";
import { WindowController } from "./ipc_controllers/windowController";

function init(){
  registerAppEvents();

  WindowController();

  app.whenReady().then(() => {
    createMainWindow();
  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();