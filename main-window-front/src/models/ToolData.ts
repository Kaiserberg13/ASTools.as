export interface ToolData {
    name: string;
    type?: string;
    category_text?: string;
    text?: string;
    file_path?: boolean;
    default?: string | boolean;
    icon?: string;
    condition?: string;
    language: string;
    entry_file: string;
}