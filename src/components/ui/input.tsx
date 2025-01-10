import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  status?: "error" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, status = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          type === "file" ? "border border-dashed" : "border border-border",
          "flex w-full rounded-[10px] bg-transparent px-3 py-1 text-base file:border-0 file:bg-transparent file:text-base file:font-medium file:text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:border-blue-main disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
          status === "error" ? "border-input-border-destructive" : "border-border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
