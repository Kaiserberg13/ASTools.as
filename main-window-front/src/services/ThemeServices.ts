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
        window.ipcRenderer.on("update-theme", listener)
    }

    offUpdateTheme(listener: (_event: any, newTheme: Theme) => void): void {
        window.ipcRenderer.off("update-theme", listener)
    }

    onUpdatePalette(listener: (_event: any, newPalette: string) => void): void {
        window.ipcRenderer.on("update-palette", listener)
    }

    offUpdatePalette(listener: (_event: any, newPalette: string) => void): void {
        window.ipcRenderer.off("update-palette", listener)
    }
}