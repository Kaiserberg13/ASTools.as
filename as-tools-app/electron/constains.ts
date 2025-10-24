import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const __approot = path.join(__dirname, '..');
export const __appdir = path.join(__dirname, '../../..');
export const __preloadpath = path.join(__dirname, "preload.mjs");

export const tool_dir = path.join(__appdir, "Tools");
export const theme_dir = path.join(__appdir, "Themes");

export const MAIN_WINDOW_DEV_URL = "http://localhost:3000/";
export const SETTINGS_WINDOW_DEV_URL = "http://localhost:3000/#/settings";
export const TOOL_WINDOW_DEV_URL = "http://localhost:3000/#/tool";
export const DEV_WINDOW_DEV_URL = "http://localhost:3000/#/dev";
export const CREATE_FOLDER_WINDOW_DEV_URL = "http://localhost:3000/#/add-folder";

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const RENDERER_DIST = path.join(__approot, 'dist')
export const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(__approot, 'public') : RENDERER_DIST;

export const TOOL_DIR_DEV_PATH = path.join(__approot, "import", "Tools");
export const THEME_DIR_DEV_PATH = path.join(__approot, "import", "Theme");

export const __emulator = path.join(VITE_PUBLIC, "astools_emulator.py");

export class DevView {
    __filename: string = __filename;
    __dirname: string = __dirname;
    __approot: string = __approot;
    __preloadpath: string = __preloadpath;

    tool_dir: string = tool_dir;
    theme_dir: string = theme_dir;
    
    MAIN_WINDOW_DEV_URL: string = MAIN_WINDOW_DEV_URL;
    SETTINGS_WINDOW_DEV_URL: string = SETTINGS_WINDOW_DEV_URL;
    TOOL_WINDOW_DEV_URL: string = TOOL_WINDOW_DEV_URL;
    DEV_WINDOW_DEV_URL: string = DEV_WINDOW_DEV_URL;
    CREATE_FOLDER_WINDOW_DEV_URL: string = CREATE_FOLDER_WINDOW_DEV_URL;
    
    VITE_DEV_SERVER_URL: string | undefined = VITE_DEV_SERVER_URL;
    RENDERER_DIST: string = RENDERER_DIST;
    VITE_PUBLIC: string = VITE_PUBLIC;
    
    TOOL_DIR_DEV_PATH: string = TOOL_DIR_DEV_PATH;
    THEME_DIR_DEV_PATH: string = THEME_DIR_DEV_PATH;
}