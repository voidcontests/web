import { cn } from "@/lib/utils";
import React from "react";

interface PreviewProps extends React.ComponentProps<"div"> {
    markdown: string;
}

const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(({ markdown, className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'prose prose-invert',
            'prose-headings:font-normal',
            'prose-code:bg-background-muted prose-code:p-1 prose-code:rounded-lg',
            'prose-a:text-text-link',
            'prose-hr:border-border prose-hr:w-full',
            'prose-strong:font-bold',
            className,
        )} dangerouslySetInnerHTML={{ __html: markdown }}
        {...props}
    />
));
Preview.displayName = "Preview";

export default Preview;