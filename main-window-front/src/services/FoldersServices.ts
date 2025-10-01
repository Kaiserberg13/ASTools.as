import type { FolderModel } from "../models/FolderModel";


export class FolderService {
    async getAllFolders(): Promise<FolderModel[] | null> {
        const result = await window.ipcRenderer.invoke("get-all-folders");
        return result;
    }

    async getFolderByName(label: string): Promise<FolderModel | null> {
        const result = await window.ipcRenderer.invoke("get-folder", label);
        return result;
    }

    moveToolToFolder(toolId: string, folderLabel: string): void {
        window.ipcRenderer.send("move-tool-to-folder", toolId, folderLabel);
    }

    createFolder(folder: FolderModel): void {
        window.ipcRenderer.send("create-folder", folder);
    }

    deleteFolder(label: string): void {
        window.ipcRenderer.send("delete-folder", label);
    }

    onFolderUpdate(listener: (event: any, newFolders: FolderModel[]) => void): void {
        window.ipcRenderer.on("update-folders", listener);
    }

    offFolderUpdate(listener: (event: any, newFolders: FolderModel[]) => void): void {
        window.ipcRenderer.off("update-folders", listener);
    }
}