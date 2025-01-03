import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";


const badgeVariants = cva(
  "text-sm font-medium inline-flex items-center rounded-[8px] px-[10px] py-[5px] leading-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-button-background-primary text-button-text-primary",
        secondary:
          "bg-button-background-secondary text-button-text-secondary",
        outline: "border text-button-text-secondary",
        blue: "bg-badge-background-blue text-badge-text-blue",
        green: "bg-badge-background-green text-badge-text-green",
        orange: "bg-badge-background-orange text-badge-text-orange",
        red: "bg-badge-background-red text-badge-text-red",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
