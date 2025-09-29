import {app, BrowserWindow} from 'electron';
import { createMainWindow } from '../windows/MainWindow';


export function registerAppEvents() {
    app.on('window-all-closed', () => {
        if(process.platform !== 'darwin'){
            app.quit();
        }
    });

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        }
    });
}