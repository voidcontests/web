import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CodeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
}

export const Code = forwardRef<HTMLSpanElement, CodeProps>(({ className, ...props }, ref) => (
    <span
        className={cn(
            'font-mono whitespace-pre-wrap',
            className,
        )}
        {...props}
        ref={ref}
    />
));
