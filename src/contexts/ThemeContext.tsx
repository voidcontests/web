'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type Theme = "light" | "dark" | undefined;

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (v: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme | undefined>();

    useEffect(() => {
        const bodyClass = document.body.classList;

        if (!theme) {
            setTheme(bodyClass.contains('light') ? 'light' : 'dark');
        };

        if (!theme) return;

        bodyClass.remove('light', 'dark');
        bodyClass.add(theme);

        Cookies.set('theme', theme, { expires: 365 });
    }, [theme]);

    const updateTheme = (v: 'light' | 'dark') => {
        setTheme(v);
    }

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
