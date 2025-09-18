import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const __approot = path.join(__dirname, '..');
export const __preloadpath = path.join(__dirname, "preload.mjs");

export const MAIN_WINDOW_DEV_URL = "http://localhost:3000/";
export const SETTINGS_WINDOW_DEV_URL = "http://localhost:3001/";
export const TOOL_WINDOW_DEV_URL = "http://localhost:3002/";
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const RENDERER_DIST = path.join(__approot, 'dist')
export const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(__approot, 'public') : RENDERER_DIST;