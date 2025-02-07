import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const tagVariants = cva(
  "text-xs font-medium inline-flex items-center rounded-lg px-3 py-1",
  {
    variants: {
      variant: {
        default: "bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950",
        secondary: "bg-zinc-950/4 dark:bg-zinc-50/7",
        outline: "border",
        blue: "bg-blue-400/15 bg-blue-400",
        green: "bg-green-500/15 text-green-500",
        orange: "bg-amber-500/15 text-amber-500",
        red: "bg-scarlet-500/15 text-scarlet-500",
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
