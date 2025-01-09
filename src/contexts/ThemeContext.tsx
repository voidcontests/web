'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeFromCookies = Cookies.get('theme') as Theme | undefined;
    const [theme, setTheme] = useState<Theme>(themeFromCookies || 'dark');

    useEffect(() => {
        const bodyClass = document.body.classList;
        bodyClass.remove('light', 'dark');
        bodyClass.add(theme);
        Cookies.set('theme', theme, { expires: 365 });
    }, [theme]);

    const updateTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
