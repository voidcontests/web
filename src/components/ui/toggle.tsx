import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-[10px] text-base font-regular transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "text-text-secondary hover:bg-background-secondary data-[state=on]:bg-background-secondary data-[state=on]:text-text-primary"
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border bg-transparent",
      },
      size: {
        sm: "h-7 px-3 min-w-20 text-xs",
        default: "h-8 px-4 min-w-24 text-sm",
        lg: "h-9 px-5 min-w-28 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
