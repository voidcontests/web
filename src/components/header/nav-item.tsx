'use client';

import { cva, type VariantProps } from "class-variance-authority";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

const navItemVariants = cva(
    "text-sm font-semibold hover:text-text-primary transition-colors",
    {
        variants: {
            state: {
                default: "text-text-muted",
                active: "text-text-primary",
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
}

function NavItem({ className, state, href, children, ...props }: NavItemProps) {
    const pathname = usePathname();
    const current = new URL(href, 'http://example.com');
    const isActive = pathname.startsWith(current.pathname);

    return (
        <Link href={href} className={cn(navItemVariants({ state: isActive ? 'active' : 'default' }), className, 'relative flex flex-col justify-center h-full')} {...props}>
            <span className="flex-grow flex items-center justify-center">
                {children}
            </span>
            <div className={cn(
                "absolute bottom-0 left-0 h-[3px] rounded-t-[3px] transition-all duration-300 ease-in-out",
                isActive ? 'w-full bg-blue-main' : 'w-0 bg-transparent'
            )} />
        </Link>
    );
}

export { NavItem, navItemVariants };
