import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
}

const Code = forwardRef<HTMLSpanElement, CodeProps>(({ className, ...props }, ref) => (
    <span
        className={cn(
            'font-mono whitespace-pre-wrap break-words overflow-wrap-anywhere',
            className,
        )}
        {...props}
        ref={ref}
    />
));
Code.displayName = 'Code';

export default Code;
