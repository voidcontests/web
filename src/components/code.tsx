import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
}

const Code = forwardRef<HTMLSpanElement, CodeProps>(({ className, ...props }, ref) => (
    <span
        className={cn(
            'font-mono whitespace-pre-wrap',
            className,
        )}
        {...props}
        ref={ref}
    />
));

export default Code;
