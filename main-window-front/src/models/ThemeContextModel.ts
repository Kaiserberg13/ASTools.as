export type Theme = 'light' | 'dark';
export interface ThemeContextType {
    theme: Theme;
    palette: string;
    chosenPaletteHasDark: (id: string) => boolean;
    toggleTheme: () => void;
    setPalette: (id: string) => void;
}
export const PALETTES: Record<string, {hasDark: boolean}> ={
    'default': { hasDark: true },
    'a-launcher': { hasDark: true },
    'omori': { hasDark: true },
    'columbina': { hasDark: false },
}