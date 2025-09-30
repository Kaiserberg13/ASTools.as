import type { ToolModel } from "../models/ToolViewModel";

export class ToolsService {
    async getTools(): Promise<ToolModel[]>  {
        const result = await window.ipcRenderer.invoke("get-all-tools");
        return result;
    }
}