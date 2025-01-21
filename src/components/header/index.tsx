'use client';

import { TonConnectButton } from '../ton-connect/button';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { useTonProof } from '@/hooks/useTonProof';

const Header = () => {
    const pathname = usePathname();
    useTonProof();

    return (
        <header className={cn(
            'h-14 w-full flex-none',
            pathname === '/'
                ? 'sticky top-0 bg-background-primary border-t border-t-transparent border-b border-b-transparent'
                : 'bg-background-secondary border-t border-t-transparent border-b border-b-border',
        )}>
            <div className='h-full max-w-7xl mx-auto flex justify-center'>
                <div className='w-full flex items-center mx-4'>
                    <div className='h-full flex items-center gap-8 mr-auto'>
                        <Link href="/" className={cn(
                            'text-sm sm:text-base text-text-muted hover:text-text-primary font-semibold transition-colors',
                            pathname === '/' ? 'text-text-primary' : 'text-text-muted',
                        )}>
                            VOID
                        </Link>
                        <NavItem href='/contests' className='sm:hidden'>
                            CONTESTS
                        </NavItem>
                        <NavItem href='/problems' className='sm:hidden'>
                            PROBLEMS
                        </NavItem>
                    </div>
                    <TonConnectButton />
                </div>
            </div>
        </header>
    );
};

export default Header;