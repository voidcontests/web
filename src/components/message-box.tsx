import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const messageBoxVariants = cva(
    "py-4 px-6 rounded-xl flex flex-col gap-1",
    {
        variants: {
            variant: {
                default: "bg-blue-400/15 text-blue-500 dark:text-blue-400",
                warning: "bg-amber-400/15 dark:text-amber-400 text-amber-600",
                error: "bg-scarlet-600/15 text-scarlet-600 dark:bg-scarlet-500/15 dark:text-scarlet-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface MessageBoxProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof messageBoxVariants> {}

const MessageBox = forwardRef<HTMLDivElement, MessageBoxProps>(({ className, variant, ...props }, ref) => (
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
