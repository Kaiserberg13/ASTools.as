import type { ToolModel } from "./ToolViewModel";

export interface FolderModel {
    Label: string;
    Filters?: string[];
    Tools?: ToolModel[];
    Icon?: string;
}