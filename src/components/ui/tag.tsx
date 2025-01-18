import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const tagVariants = cva(
  "text-xs font-medium inline-flex items-center rounded-lg px-3 py-1",
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

export interface TagProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> { }

function Tag({ className, variant, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props} />
  )
}

export { Tag, tagVariants }
