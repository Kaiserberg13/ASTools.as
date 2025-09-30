import { ipcMain } from 'electron';
import Store from 'electron-store';
import { FolderModel } from '../models/FolderModel';
import { winMain } from '../windows/MainWindow';

const store = new Store();

export function foldersController() {
    ipcMain.handle("get-all-folders", async () => {
        if(!store.has("folders")) return null;
        return store.get("folders") as FolderModel[];
    });

    ipcMain.handle("get-folder", async (_, name: string) => {
        if(!store.has("folders")) return null;
        const folders = store.get("folders") as FolderModel[];
        const currentFolder = folders.find(folder => folder.Label === name);

        if(!currentFolder) return null;
        return currentFolder;
    });

    ipcMain.on("create-folder", (_, folder: FolderModel) => {
        if(!store.has("folders")) {
            store.set("folders", [folder])
        } else {
            const folders = store.get("folders") as FolderModel[];
            store.set("folders", [...folders, folder]);
        }
        winMain?.webContents.send("update-folders", store.get("folders") as FolderModel[])
    })

    ipcMain.on("delete-folder", (_, label: string) => {
        if (!store.has("folders")) return;
        const folders = store.get("folders") as FolderModel[];
        const remaining = folders.filter(f => f.Label !== label);

        if(folders.length === 0) {
            store.delete("folders");
        } else {
            store.set("folders", remaining);
        }
        winMain?.webContents.send("update-folders", store.get("folders") as FolderModel[])
    })
}