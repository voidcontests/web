import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import NextLink from "next/link";
import * as React from "react";

const linkVariants = cva(
    "text-blue-400 hover:underline underline-2 underline-offset-2",
    {
        variants: {
            size: {
                default: "font-normal",
                large: "font-medium",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
    href: string;
}

function Link({ className, size, href, ...props }: LinkProps) {
    return (
        <NextLink href={href} className={cn(linkVariants({ size }), className)} {...props} />
    );
}

export { Link, linkVariants };
