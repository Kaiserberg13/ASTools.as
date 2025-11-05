import { ToolModel } from "./ToolModel";

export interface FolderModel {
    Label: string;
    Filters?: string[];
    Tools?: ToolModel[];
    Icon?: string;
}