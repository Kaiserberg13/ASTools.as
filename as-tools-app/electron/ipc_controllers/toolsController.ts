import { ipcMain } from 'electron';
import Store from 'electron-store';
import { ToolModel } from '../models/ToolModel';
import fs from 'fs/promises';
import path from 'path';
import { TOOL_DIR_DEV_PATH, VITE_DEV_SERVER_URL } from '../constains';
import { FolderModel } from '../models/FolderModel';
import { winMain } from '../windows/MainWindow';

const store = new Store();

export function toolsController() {
    let toolsDir = VITE_DEV_SERVER_URL? TOOL_DIR_DEV_PATH : store.get("tools-dir") as string;
    let tools: ToolModel[] = [];  

    ipcMain.handle('get-all-tools', async () => {
        try {
            tools = []
            const folders = await fs.readdir(toolsDir, { withFileTypes: true});
            for(const entry of folders) {
                if(entry.isDirectory()) {
                    const ToolDirPath = path.join(toolsDir, entry.name);
                    const ToolInfoPath = path.join(ToolDirPath, "info.json");

                    if(await fs.access(ToolInfoPath).then(() => true).catch(() => false)){
                        const infoData = await fs.readFile(ToolInfoPath, "utf-8");
                        const info = JSON.parse(infoData);

                        tools.push({
                            Id: entry.name,
                            Name: info.name || entry.name || "undefiend",
                            Tags: info.tags || [],
                            Description: info.description || '',
                            Autor: info.author || "unknown",
                            IconUrl: path.join(ToolDirPath, "icon.png"),
                            CoverUrl: path.join(ToolDirPath, "cover.png")
                        });
                    }
                }
            }
        } catch (err) {
            console.log("Error to load tools:", err);
        }
        return tools;
    });

    ipcMain.on("move-tool-to-folder", (_event: any, idTool: string, folderName: string) => {
        const folders: FolderModel[] = store.get("folders") as FolderModel[] || [];
        if (!folders || folders.length === 0) return;

        const folder = folders.find(f => f.Label === folderName);
        const tool = tools.find(t => t.Id === idTool);
        if (!tool || !folder) return;

        folder.Tools = folder.Tools || [];
        if (!folder.Tools.some(t => t.Id === idTool)) {
            folder.Tools.push(tool);
        }

        const all_tags = folder.Tools.flatMap(t => t.Tags || []);
        folder.Filters = Array.from(new Set(all_tags));

        store.set("folders", folders);

        winMain?.webContents.send("update-folders", store.get("folders") as FolderModel[])
    })
}