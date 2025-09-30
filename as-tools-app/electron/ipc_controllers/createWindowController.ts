import { ipcMain } from "electron";
import { createSettingsWindow, winSettings } from "../windows/SettingsWindow";
import { createDevWindow, winDev } from "../windows/DevWindow";
import { createAddFoldersWindow, winAddFolder } from "../windows/AddFolderWindow";

export function createWindowController() {
    ipcMain.on('open-settings-window', () => {
        if(winSettings?.isClosable) {
            winSettings.focus()
        } else {
            createSettingsWindow();
        }
    })

    ipcMain.on('open-dev-window', () => {
        if(winDev?.isClosable) {
            winDev.focus();
        } else {
            createDevWindow();
        }
    })

    ipcMain.on('open-create-folder-window', () => {
        if(winAddFolder?.isClosable) {
            winAddFolder.focus();
        } else {
            createAddFoldersWindow();
        }
    })
}