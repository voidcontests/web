import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "text-base font-regular inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-button-background-muted disabled:text-button-text-muted [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-button-background-primary text-button-text-primary hover:bg-button-background-primary/90",
        secondary:
          "bg-button-background-secondary text-button-text-secondary hover:bg-button-background-secondary/90",
        destructive:
          "bg-button-background-destructive text-button-text-destructive hover:bg-button-background-destructive/90",
        link: "bg-button-background-link text-button-text-link font-medium hover:bg-button-background-link/90",
        outline:
          "border border-border bg-transparent hover:bg-border",
        dashed:
          "border border-border border-dashed bg-transparent hover:bg-border",
        ghost: "hover:bg-border disabled:bg-transparent",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-8 px-[14px] py-[6px]",
        lg: "h-10 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
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
}
)
Button.displayName = "Button";

export { Button, buttonVariants };
