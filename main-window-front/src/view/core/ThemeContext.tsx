import React, {createContext, useContext } from "react";
import type { ReactNode } from "react";
import themeContextController from "../../controllers/themeContextController";
import type { ThemeContextType } from "../../models/ThemeContextModel";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const value = themeContextController();

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}