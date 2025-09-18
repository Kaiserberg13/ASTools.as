import { registerAppEvents } from "./events/appEvents";
import { app } from 'electron';
import { createMainWindow } from "./windows/MainWindow";

function init(){
  registerAppEvents();

  app.whenReady().then(() => {
    createMainWindow();
  }).catch((e) => {
    console.error('Failed to create window:', e);
  })
}

init();