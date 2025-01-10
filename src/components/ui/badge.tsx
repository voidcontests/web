import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const badgeVariants = cva(
  "text-sm font-medium inline-flex items-center rounded-[8px] px-[10px] py-[5px] leading-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-background-primary-inverse text-text-primary-inverse",
        secondary: "bg-background-secondary text-text-primary",
        outline: "border text-text-primary",
        blue: "bg-background-link-subdued text-text-link",
        green: "bg-background-success-subdued text-text-success",
        orange: "bg-background-caution-subdued text-text-caution",
        red: "bg-background-critical-subdued text-text-critical",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
