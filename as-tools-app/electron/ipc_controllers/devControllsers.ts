import { ipcMain } from "electron";
import { 
    __preloadpath, 
    __filename, 
    __dirname, 
    tool_dir,
    theme_dir,
    VITE_PUBLIC, 
    RENDERER_DIST, 
    VITE_DEV_SERVER_URL, 
    DEV_WINDOW_DEV_URL,
    __approot, 
    MAIN_WINDOW_DEV_URL,
    SETTINGS_WINDOW_DEV_URL,
    TOOL_WINDOW_DEV_URL,
    CREATE_FOLDER_WINDOW_DEV_URL,
    TOOL_DIR_DEV_PATH,
    THEME_DIR_DEV_PATH
} from "../constains";
import Store from 'electron-store';

const store = new Store();

export function devControllers() {
    ipcMain.handle('get-constains', () => {
        const devView = {
            __filename: __filename,
            __dirname: __dirname,
            __approot: __approot,
            __preloadpath: __preloadpath,
        
            tool_dir: tool_dir,
            theme_dir: theme_dir,
            
            MAIN_WINDOW_DEV_URL: MAIN_WINDOW_DEV_URL,
            SETTINGS_WINDOW_DEV_URL: SETTINGS_WINDOW_DEV_URL,
            TOOL_WINDOW_DEV_URL: TOOL_WINDOW_DEV_URL,
            DEV_WINDOW_DEV_URL: DEV_WINDOW_DEV_URL,
            CREATE_FOLDER_WINDOW_DEV_URL: CREATE_FOLDER_WINDOW_DEV_URL,
            
            VITE_DEV_SERVER_URL: VITE_DEV_SERVER_URL,
            RENDERER_DIST: RENDERER_DIST,
            VITE_PUBLIC: VITE_PUBLIC,
            
            TOOL_DIR_DEV_PATH: TOOL_DIR_DEV_PATH,
            THEME_DIR_DEV_PATH: THEME_DIR_DEV_PATH
        };
        return devView;
    })

    ipcMain.handle('get-store', () => {
        return store.store;
    })
}