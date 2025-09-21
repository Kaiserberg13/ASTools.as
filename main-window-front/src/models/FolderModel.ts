import type { ToolModel } from "./ToolViewModel";

export interface FolderModel {
    Label: string;
    Filters: string[];
    CurrentFilter: number;
    Tools: ToolModel[];
}