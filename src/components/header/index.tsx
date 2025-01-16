"use client";

import { TonConnectButton } from '../ton-connect/button';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className={cn(
            'h-[56px] flex justify-center mb-[20px]',
            pathname === '/'
                ? 'sticky top-0 bg-background-primary border-t border-t-transparent border-b border-b-transparent'
                : 'bg-background-secondary border-t border-t-transparent border-b border-b-border',
        )}>
            <div className='flex-1 flex items-center pl-4'>
                <Link href="/" className={cn(
                    'text-base text-text-muted hover:text-text-primary font-semibold transition-colors',
                    pathname === '/' ? 'text-text-primary' : 'text-text-muted',
                )} >
                    VOID
                </Link>
            </div>
            <div className='w-[1200px] flex gap-[30px] items-center'>
                <NavItem href='/contests'>
                    CONTESTS
                </NavItem>
                <NavItem href='/problems'>
                    PROBLEMS
                </NavItem>
            </div>
            <div className='flex-1 flex justify-end items-center pr-4'>
                <TonConnectButton />
            </div>
        </header>
    );
};

export default Header;