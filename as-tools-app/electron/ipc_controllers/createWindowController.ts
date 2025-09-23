import { ipcMain } from "electron";
import { createSettingsWindow, winSettings } from "../windows/SettingsWindow";

export function createWindowController() {
    ipcMain.on('open-settings-window', () => {
        if(winSettings?.isClosable) {
            winSettings.focus()
        } else {
            createSettingsWindow();
        }
    })
}