import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const tagVariants = cva(
  "text-xs font-medium inline-flex items-center rounded-lg px-3 py-1",
  {
    variants: {
      variant: {
        default: "bg-primary-inverse text-primary-inverse-text",
        secondary: "bg-secondary text-primary-text",
        outline: "border text-primary-text",
        blue: "bg-link-subdued text-link-text",
        green: "bg-success-subdued text-success-text",
        orange: "bg-caution-subdued text-caution-text",
        red: "bg-critical-subdued text-critical-text",
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
