import { useState } from "react";
import { useTheme } from "../view/core/ThemeContext";

export function themeController() {
    const { theme, toggleTheme, setPalette, palette, chosenPaletteHasDark} = useTheme();
    const [isApply, setIsApply] = useState<boolean>(true);
    const [themeSwitch, setThemeSwitch] = useState<'light' | 'dark'>(theme);
    const [themeColors, setThemeColors] = useState<string>('default');

    const chahged = (theme: 'light' | 'dark', colors: string) => {
        setIsApply(false);
        setThemeSwitch(theme);
        setThemeColors(colors)
    };

    const submit = () => {
        if(theme !== themeSwitch) toggleTheme();
        setPalette(themeColors);
        setIsApply(true);
    };

    const fastSubmit = (idpal: string) => {
        setPalette(idpal);
        setThemeColors(idpal);
    };

    const cancel = () => {
        setIsApply(true);
        setThemeSwitch(theme);
        setThemeColors(palette);
    };

    return {
        isApply,
        themeColors,
        themeSwitch,
        chahged,
        submit,
        fastSubmit,
        cancel,
        chosenPaletteHasDark
    };
}