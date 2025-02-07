import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
    cn(
        "font-medium inline-flex items-center justify-center gap-[10px] rounded-[10px]",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:cursor-pointer",
    ),
    {
        variants: {
        variant: {
            default: "bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 hover:opacity-90",
            secondary: "bg-zinc-950/4 dark:bg-zinc-50/7 hover:bg-zinc-950/7 hover:dark:bg-zinc-50/9",
            destructive: "bg-scarlet-500 text-zinc-50 hover:bg-scarlet-500/90",
            link: "font-medium bg-blue-400/15 text-blue-400 hover:bg-blue-400/20",
            outline: "border bg-transparent hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5",
            dashed: "border border-dashed bg-transparent hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5",
            ghost: "bg-transparent hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5",
        },
        size: {
            sm: "h-7 px-3 min-w-32 text-xs",
            default: "h-8 px-4 min-w-36 text-sm",
            lg: "h-9 px-5 min-w-40 text-base",
            icon: "h-8 w-8",
        },
        },
        defaultVariants: {
        variant: "default",
        size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        />
    )
});
Button.displayName = "Button";

export { Button, buttonVariants };
