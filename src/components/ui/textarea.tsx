import * as React from "react"

import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-[10px] border bg-transparent px-3 py-2 text-sm placeholder:text-text-secondary focus-visible:outline-none focus-visible:border-blue-main disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TextArea.displayName = "TextArea"

export { TextArea }
