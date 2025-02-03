import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  state?: "error" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, state = "default", ...props }, ref) => {
    return (
      <input
        className={cn(
          "border h-8 flex w-full rounded-[10px] bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary-text placeholder:text-secondary-text focus-visible:outline-hidden focus-visible:border-active-border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          state === "error" ? "border-critical-border" : "",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
