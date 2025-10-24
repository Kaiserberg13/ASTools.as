import { ipcMain } from 'electron';
import Store from 'electron-store';
import { ToolModel } from '../models/ToolModel';
import fs from 'fs/promises';
import path from 'path';
import { TOOL_DIR_DEV_PATH, VITE_DEV_SERVER_URL } from '../constains';
import { FolderModel } from '../models/FolderModel';
import { winMain } from '../windows/MainWindow';
import { createToolWindow } from '../windows/ToolWindow';

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
                            CoverUrl: path.join(ToolDirPath, "cover.png"),
                            language: info.language,
                            entry_file: info.entry_file
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
        if (!tool || !folder || !folder.Tools) return;

        if (!folder.Tools.some(t => t.Id === idTool)) {
            folder.Tools.push(tool);
        }

        const all_tags = folder.Tools.flatMap(t => t.Tags || []);
        folder.Filters = Array.from(new Set(all_tags));

        store.set("folders", folders);

        winMain?.webContents.send("update-folders", store.get("folders") as FolderModel[])
    })

    ipcMain.on("remove-tool-from-folder", (_event: any, idTool: string, folderName: string) => {
        console.log("remove tool");
        const folders: FolderModel[] = store.get("folders") as FolderModel[] || [];
        if (!folders || folders.length === 0) return;

        const folder = folders.find(f => f.Label === folderName);

        console.log("folder found:", folder);

        if ( !folder || !folder.Tools) return;

        console.log("folder.Tools before:", folder.Tools);
        const newTools = folder.Tools.filter(t => t.Id !== idTool);
        console.log("folder.Tools after filter:", newTools);
        folder.Tools = newTools;

        const all_tags = folder.Tools.flatMap(t => t.Tags || []);
        folder.Filters = Array.from(new Set(all_tags));

        store.set("folders", folders);
        console.log("update folder");

        winMain?.webContents.send("update-folders", store.get("folders") as FolderModel[]);
    });

    ipcMain.on("run-tool", async (_event: any, toolID: string) => {
        createToolWindow(toolID);
    })

    ipcMain.handle("get-tool-template", async (_event: any, toolID: string) => {
        const toolTemplatePath = path.join(toolsDir, toolID, "template.json");
        if(await fs.access(toolTemplatePath).then(() => true).catch(() => false)){
            const templateData = await fs.readFile(toolTemplatePath, "utf-8");
            return templateData;
        }
        return null;
    })

    ipcMain.handle("run-tool-process", async (_event: any, toolID: string, toolData: Record<string, any>) => {
        const templateFile = path.join(toolsDir, toolID, "timed.json");
        const toolExe = path.join(toolsDir, toolID, `${toolID}.exe`);

        const jsonData = JSON.stringify(toolData, null, 2);
        await fs.writeFile(templateFile, jsonData, "utf-8");

        const { execFile } = await import('child_process');
        execFile(toolExe, [], (error, stdout, stderr) => {
            if(error) {
                console.error(`Error executing tool: ${error.message}`);
                _event.sender.send("run-tool-answer", { succed: false, message: `Error executing tool: ${error.message}` });
            } else {
                console.log(`Tool output: ${stdout}`);
                console.error(`Tool stderr: ${stderr}`);
                _event.sender.send("run-tool-answer", { succed: true, message: stdout });
            }
        });

        await fs.rm(templateFile);
    })
}