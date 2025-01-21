'use client';

import { cva, type VariantProps } from "class-variance-authority";
import { TonConnectButton } from './ton-connect/button';
import { useTonProof } from '@/hooks/useTonProof';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const pathname = usePathname();
    useTonProof();

    return (
        <header className={cn(
            'h-14 w-full mb-6',
            pathname === '/'
                ? 'sticky top-0 bg-primary border-t border-t-transparent border-b border-b-transparent'
                : 'bg-secondary border-t border-t-transparent border-b border-b-border',
        )}>
            <div className='h-full max-w-7xl mx-auto flex justify-center'>
                <div className='w-full flex items-center mx-4'>
                    <div className='h-full flex items-center gap-8 mr-auto'>
                        <NavItem href='/' underlineActive={false} className="sm:text-base">
                            VOID
                        </NavItem>
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

const navItemVariants = cva(
    "text-sm font-semibold hover:text-primary-text transition-colors",
    {
        variants: {
            state: {
                default: "text-muted-text",
                active: "text-primary-text",
            },
        },
        defaultVariants: {
            state: "default",
        },
    }
);

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navItemVariants> {
    href: string;
    underlineActive?: boolean;
}

function NavItem({ className, state, href, underlineActive = true, children, ...props }: NavItemProps) {
    const pathname = usePathname();
    const want = new URL(href, 'http://e.com');
    const isActive = want.pathname === '/'
        ? pathname === want.pathname
        : pathname.startsWith(want.pathname);

    return (
        <Link href={href} className={cn(navItemVariants({ state: isActive ? 'active' : 'default' }), className, 'relative flex flex-col justify-center h-full')} {...props}>
            <span className="flex-grow flex items-center justify-center font-medium">
                {children}
            </span>
            <div className={cn(
                "absolute bottom-0 left-0 h-[3px] rounded-t-[3px] transition-all duration-300 ease-in-out",
                isActive && underlineActive ? 'w-full bg-blue-main' : 'w-0 bg-transparent'
            )} />
        </Link>
    );
}

export default Header;