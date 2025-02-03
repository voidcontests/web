import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

const buttonVariants = cva(
  "font-medium inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-inverse text-primary-inverse-text",
        secondary: "bg-secondary text-primary-text",
        destructive: "bg-critical text-primary-on-color-text",
        link: "text-link-text bg-link-subdued font-medium",
        outline: "border bg-transparent hover:bg-secondary text-primary-text",
        dashed: "border border-dashed bg-transparent hover:bg-secondary text-primary-text",
        ghost: "bg-transparent text-primary-text hover:bg-secondary",
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// TODO: simplify this: remove `asChild` and return just <button />
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
