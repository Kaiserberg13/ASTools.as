import { useCallback, useEffect, useState } from "react";
import { PALETTES, type Theme } from "../models/ThemeContextModel";
import { ThemeServices } from "../services/ThemeServices";

export default function themeContextController() {
    const _service = new ThemeServices();

    const [theme, setTheme] = useState<Theme>('light');
    const [palette, setPaletteState] = useState<string>('default');

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (newTheme !== theme) {
            _service.setTheme(newTheme);
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    }, [theme, _service]);

    const setPalette = useCallback((id: string) => {
        if(id === palette) return;
        Object.keys(PALETTES).forEach(k => document.documentElement.classList.remove(k));
        document.documentElement.classList.add(id);
        setPaletteState(id);

        const supportsDark = !!PALETTES[id]?.hasDark;

        if(!supportsDark) {
            if(theme === 'dark') {
                document.documentElement.classList.remove('dark');
                setTheme('light');
                _service.setTheme('light');
            }
        } else {
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
        _service.setPalette(id);
    }, [theme, palette, _service])

    const chosenPaletteHasDark = useCallback((id: string) => {
        return PALETTES[id]?.hasDark;
    }, []);

    useEffect(() => {
        _service.getTheme()
        .then((saved: Theme) => {
            if (saved === 'dark' || saved === 'light') {
                setTheme(saved);
                document.documentElement.classList.toggle('dark', saved === 'dark');
            }
        })
        .catch(console.error);

        _service.getPalette()
        .then((saved: string) => {
            if(!(typeof saved === 'string')) return;
            setPaletteState(saved)
            document.documentElement.classList.add(saved);
            if (!PALETTES[saved]?.hasDark) {
                document.documentElement.classList.remove('dark');
            }
        })
        .catch(console.error);

        const handleUpdate = (_event: any, newTheme: Theme) => {
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

        _service.onUpdateTheme(handleUpdate);
        _service.onUpdatePalette(handleUpdatePalette);
        return () => {
            _service.offUpdateTheme(handleUpdate);
            _service.offUpdatePalette(handleUpdatePalette)
        };
    }, [palette, _service, setPalette]);

    return {
        theme,
        palette,
        chosenPaletteHasDark,
        toggleTheme,
        setPalette
    };
}