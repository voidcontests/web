import { forwardRef  } from "react";
import { cn } from "@/lib/utils";

export const Container = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("rounded-xl border bg-surface text-sm not-dark:shadow-md", className)}
        {...props}
    />
));
