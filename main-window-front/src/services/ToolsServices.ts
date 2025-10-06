import type { ToolModel } from "../models/ToolViewModel";

export class ToolsService {
    async getTools(): Promise<ToolModel[]>  {
        const result = await window.ipcRenderer.invoke("get-all-tools");
        return result;
    }

    async getToolTemplate(toolID: string): Promise<JSON | null> {
        const result = await window.ipcRenderer.invoke("get-tool-template", toolID);
        return result;
    }

    async runExeTool(toolID: string, toolData: Record<string, any>): Promise<{succed: boolean, message: string}> {
        const result = await window.ipcRenderer.invoke("run-tool-process", toolID, toolData);
        return result;
    }

    runTool(toolID: string) {
        window.ipcRenderer.send("run-tool", toolID);
    }

    onToolAnswer(listener: (_event: any, answer: {succed: boolean, message: string}) => void): void {
        window.ipcRenderer.on("run-tool-answer", listener)
    }

    offToolAnswer(listener: (_event: any, answer: {succed: boolean, message: string}) => void): void {
        window.ipcRenderer.off("run-tool-answer", listener)
    }
}