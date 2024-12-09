'use client';

import { TonConnectButton } from '@/components/ton-connect/button';
import { Icons } from '@/components/icons';

import Link from 'next/link';

export const Header = () => {
    return (
        <header className='flex justify-center bg-background sticky top-0'>
            <div className='h-[56px] w-[1200px] px-4 flex justify-between items-center'>
                <div className='flex gap-4 items-center text-sm text-muted-foreground font-medium'>
                    <Link href="/" className='text-foreground hover:text-logo transform scale-150 mr-2 transition duration-300'>
                        <Icons.logo />
                    </Link>
                    <Link href="/" className='hover:text-foreground transition duration-300'>HOME</Link>
                    <Link href="/contests" className='hover:text-foreground transition duration-300'>CONTESTS</Link>
                </div>
                <TonConnectButton />
            </div>
        </header>
    );
}