import type { Theme } from "../models/ThemeContextModel";

export class ThemeServices {
    setTheme(newTheme: Theme): void {
        window.ipcRenderer.send('set-theme', newTheme)
    }

    setPalette(pallete: string): void {
        window.ipcRenderer.send('set-palette', pallete);
    }

    async getTheme(): Promise<Theme> {
        const result = await window.ipcRenderer.invoke('get-theme');
        return result;
    }

    async getPalette(): Promise<string> {
        const result = await window.ipcRenderer.invoke("get-palette");
        return result;
    }

    onUpdateTheme(listener: (_event: any, newTheme: Theme) => void): void {
        window.ipcRenderer.on("update-theme", (_event, newTheme: Theme) => listener(_event, newTheme))
    }

    offUpdateTheme(listener: (_event: any, newTheme: Theme) => void): void {
        window.ipcRenderer.off("update-theme", (_event, newTheme: Theme) => listener(_event, newTheme))
    }

    onUpdatePalette(listener: (_event: any, newPalette: string) => void): void {
        window.ipcRenderer.on("update-palette", (_event, newPalette: string) => listener(_event, newPalette))
    }

    offUpdatePalette(listener: (_event: any, newPalette: string) => void): void {
        window.ipcRenderer.off("update-palette", (_event, newPalette: string) => listener(_event, newPalette))
    }
}