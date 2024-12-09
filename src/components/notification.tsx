import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const notificationVariants = cva(
    "h-[35px] w-full flex justify-center items-center gap-2 font-medium text-md text-notification-foreground",
    {
        variants: {
            variant: {
                default:
                    "bg-notification-default",
                warning:
                    "bg-notification-warning",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof notificationVariants> {
    href?: string;
}

function Notification({ className, variant, href, ...props }: NotificationProps) {
    if (href === undefined) {
        return (
            <div className={cn(notificationVariants({ variant }), className)} {...props} />
        )
    }

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
            <div className={cn(notificationVariants({ variant }), className)} {...props} />
        </Link>
    )
}

export { Notification, notificationVariants }