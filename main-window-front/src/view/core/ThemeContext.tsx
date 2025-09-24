import React, {createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = 'light' | 'dark';
const PALETTES: Record<string, {hasDark: boolean}> ={
    'default': { hasDark: true },
    'a-launcher': { hasDark: true },
    'omori': { hasDark: true },
    'columbina': { hasDark: false },
}

interface ThemeContextType {
    theme: Theme;
    palette: string;
    chosenPaletteHasDark: (id: string) => boolean;
    toggleTheme: () => void;
    setPalette: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [palette, setPaletteState] = useState<string>('default');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (newTheme !== theme) {
            window.ipcRenderer.send('set-theme', newTheme);
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    };

    const chosenPaletteHasDark = (id: string) => {
        return PALETTES[id]?.hasDark;
    }

    const setPalette = (id: string) => {
        if(id === palette) return;
        Object.keys(PALETTES).forEach(k => document.documentElement.classList.remove(k));
        document.documentElement.classList.add(id);
        setPaletteState(id);

        const supportsDark = !!PALETTES[id]?.hasDark;

        if(!supportsDark) {
            if(theme === 'dark') {
                document.documentElement.classList.remove('dark');
                setTheme('light');
                window.ipcRenderer.send('set-theme', 'light');
            }
        } else {
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        window.ipcRenderer.send('set-palette', id);
    }

    useEffect(() => {
        window.ipcRenderer.invoke('get-theme')
        .then((saved: Theme) => {
            if (saved === 'dark' || saved === 'light') {
                setTheme(saved);
                document.documentElement.classList.toggle('dark', saved === 'dark');
            }
        });

        window.ipcRenderer.invoke('get-palette')
        .then((saved: string) => {
            if(!(typeof saved === 'string')) return;
            setPaletteState(saved)
            document.documentElement.classList.add(saved);
            if (!PALETTES[saved]?.hasDark) {
                document.documentElement.classList.remove('dark');
            }
        })

        const handleUpdate = (_event: any, newTheme: 'light' | 'dark') => {
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        };

        const handleUpdatePalette = (_event: any, newPalette: string) => {
            document.documentElement.classList.remove(palette);
            Object.keys(PALETTES).forEach(k => document.documentElement.classList.remove(k));
            document.documentElement.classList.add(newPalette);
            setPaletteState(newPalette);

            const supportsDark = !!PALETTES[newPalette]?.hasDark;

            if (!supportsDark) {
                document.documentElement.classList.remove('dark');
                setTheme('light');
            };
        };

        window.ipcRenderer.on('update-palette', handleUpdatePalette);
        window.ipcRenderer.on('update-theme', handleUpdate);
        return () => {
            window.ipcRenderer.off('update-theme', handleUpdate);
            window.ipcRenderer.off('update-palette', handleUpdatePalette);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, palette, setPalette, chosenPaletteHasDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}