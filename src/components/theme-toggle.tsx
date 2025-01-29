'use client';

import { useTheme } from "next-themes";

const transitions: TransitionMap = {
    'system': 'dark',
    'dark': 'light',
    'light': 'system'
};

type TransitionMap = {
    [key: string]: 'system' | 'dark' | 'light';
};

const label = (theme: string | undefined) => {
    switch (theme) {
        case 'dark': return 'Dark';
        case 'light': return 'Light';
        case 'system': return 'System';
        default: return 'Theme';
    }
}

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <span onClick={() => setTheme(prev => transitions[prev])} className='hover:text-primary-text transition-colors hover:cursor-pointer select-none' suppressHydrationWarning>
            {label(theme)}
        </span>
    );
}