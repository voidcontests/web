import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const messageBoxVariants = cva(
    "py-4 px-6 rounded-xl flex flex-col gap-1 border",
    {
        variants: {
            variant: {
                default: "bg-blue-400/15 border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400",
                warning: "bg-amber-400/15 dark:border-amber-400 dark:text-amber-400 border-amber-600 text-amber-600",
                error: "bg-scarlet-600/15 border-scarlet-600 text-scarlet-600 dark:bg-scarlet-500/15 dark:border-scarlet-500 dark:text-scarlet-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface MessageBoxProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof messageBoxVariants> {}

const MessageBox = React.forwardRef<HTMLDivElement, MessageBoxProps>(({ className, variant, ...props }, ref) => (
    <div
        className={cn(
            messageBoxVariants({ variant }),
            className,
        )}
        {...props}
        ref={ref}
    />
));
MessageBox.displayName = "MessageBox";

export { MessageBox };
