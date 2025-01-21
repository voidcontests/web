'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export const Footer = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer className='h-24 mt-10 w-full flex-none'>
            <div className='h-full max-w-7xl mx-auto flex justify-center'>
                <div className='w-full flex items-center justify-between sm:justify-center md:justify-center mx-4 text-sm text-muted-text'>
                    <span className='mr-auto sm:hidden md:hidden'>
                        Built by <Link href="https://github.com/jus1d" className='hover:text-primary-text transition-colors'>@ndbtea</Link>
                    </span>
                    <div className='flex gap-8'>
                        <span
                            className='hover:text-primary-text transition-colors hover:cursor-pointer'
                            onClick={() => toggleTheme()}
                        >
                            {theme ? theme === 'dark' ? 'Light mode' : 'Dark mode' : 'Toggle color mode'}
                        </span>
                        <Link href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=" className='hover:text-primary-text transition-colors'>Bug Report</Link>
                        <Link href="https://github.com/voidcontests" className='hover:text-primary-text transition-colors'>GitHub</Link>
                        <Link href="mailto:artfa63@gmail.com" className='hover:text-primary-text transition-colors'>Email</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
