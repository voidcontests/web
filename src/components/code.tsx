import { cn } from "@/lib/utils";
import React from "react";

interface CodeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
}

export const Code = React.forwardRef<HTMLSpanElement, CodeProps>(({ className, ...props }, ref) => (
    <span
        className={cn(
            'font-mono whitespace-pre-wrap',
            className,
        )}
        {...props}
        ref={ref}
    />
));
