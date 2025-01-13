'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { format_date } from '@/lib/utils';

const GIT_COMMIT = process.env.NEXT_PUBLIC_BUILD_COMMIT;
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME;

export const Footer = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer className='flex justify-center mt-[40px]'>
            <div className='h-[90px] w-[1200px] flex justify-between items-center text-base text-text-muted'>
                <span>
                    Built by <Link href="https://github.com/jus1d" className='hover:text-text-primary transition-colors'>@ndbtea</Link>
                </span>
                <div className='flex gap-4'>
                    <span>
                        Built from <Link
                            href={`https://github.com/voidcontests/frontend/commit/${GIT_COMMIT}`}
                            className='hover:text-text-primary transition-colors hover:cursor-pointer'
                        >

                            {GIT_COMMIT}
                        </Link> on {format_date(new Date(BUILD_TIME ?? ''))}
                    </span>
                    <div>
                        <Separator vertical />
                    </div>
                    <span
                        className='hover:text-text-primary transition-colors hover:cursor-pointer'
                        onClick={() => toggleTheme()}
                    >
                        {theme ? theme === 'dark' ? 'Light mode' : 'Dark mode' : 'Toggle color mode'}
                    </span>
                    <div>
                        <Separator vertical />
                    </div>
                    <Link href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=" className='hover:text-text-primary transition-colors'>Bug Report</Link>
                    <Link href="https://github.com/voidcontests" className='hover:text-text-primary transition-colors'>GitHub</Link>
                    <Link href="mailto:artfa63@gmail.com" className='hover:text-text-primary transition-colors'>Email</Link>
                </div>
            </div>
        </footer >
    );
}
