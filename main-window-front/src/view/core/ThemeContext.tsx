import React, {createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        if (newTheme !== theme) {
            window.ipcRenderer.send('set-theme', newTheme);
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
    };

    useEffect(() => {
        window.ipcRenderer.invoke('get-theme')
        .then((saved: Theme) => {
            if (saved === 'dark' || saved === 'light') {
                setTheme(saved);
                document.documentElement.classList.toggle('dark', saved === 'dark');
            }
        });

        const handleUpdate = (_event: any, newTheme: 'light' | 'dark') => {
            setTheme(newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        };

        window.ipcRenderer.on('update-theme', handleUpdate);
        return () => {
            window.ipcRenderer.off('update-theme', handleUpdate);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}