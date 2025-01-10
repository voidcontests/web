import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "text-base font-regular inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-background-primary-inverse text-text-primary-inverse",
        secondary: "bg-background-secondary text-text-primary",
        destructive: "bg-background-critical text-text-primary-on-color-text",
        link: "text-text-link bg-background-link-subdued font-medium",
        outline: "border bg-transparent hover:bg-background-secondary text-text-primary",
        dashed: "border border-dashed bg-transparent hover:bg-background-secondary text-text-primary",
        ghost: "bg-transparent text-text-primary hover:bg-background-secondary",
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
});
Button.displayName = "Button";

export { Button, buttonVariants };
