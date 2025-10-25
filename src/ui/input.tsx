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
          "border h-8 flex w-full rounded-[10px] bg-surface px-3 py-1 text-sm file:border-0 file:text-sm file:font-medium placeholder:text-secondary-foreground focus-visible:outline-hidden focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:text-tertiary-foreground md:text-sm",
          state === "error" ? "border-scarlet-500" : "",
          className, // TODO: Use invalid instear error state
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
