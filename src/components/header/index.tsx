"use client";

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

import { TonConnectButton } from '../ton-connect/button';
import { Icons } from '@/components/icons';
import { NavItem } from './nav-item';

const Header = () => {
    const pathname = usePathname();

    const navitems: string[] = ['/contests', '/problems'];

    return (
        <header className={cn(
            'h-[56px] flex justify-center',
            pathname === '/' ? 'sticky top-0' : '',
            navitems.includes(pathname) ?
                'bg-background border-t border-t-transparent border-b border-b-border' :
                'bg-background-dark border-t border-t-transparent border-b border-b-transparent',
        )}>
            <div className='flex-1 flex items-center pl-4 text-text transition-colors'>
                <Link href="/">
                    <Icons.logo className='h-7 w-7' />
                </Link>
            </div>
            <div className='w-[1200px] flex gap-[30px] items-center'>
                <NavItem href='/contests'>
                    CONTESTS
                </NavItem>
                <NavItem href='/problems'>
                    PROBLEMS
                </NavItem>
                <div className='flex gap-4 items-center text-sm text-muted-foreground font-medium'>
                </div>
            </div>
            <div className='flex-1 flex justify-end items-center pr-4'>
                <TonConnectButton />
            </div>
        </header>
    );
};

export default Header;