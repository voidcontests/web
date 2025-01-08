import { parse } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import React from "react";

// import 'highlight.js/styles/github.min.css'; // LIGHT THEME
import 'highlight.js/styles/github-dark.min.css'; // DARK THEME

interface PreviewProps extends React.ComponentProps<"div"> {
    markdown: string;
}

const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(({ markdown, className, ...props }, ref) => {
    const parsed = parse(markdown);

    return (
        <div
            ref={ref}
            className={cn(
                'prose prose-invert',
                'prose-headings:font-normal',
                'prose-code:bg-background-muted prose-code:p-1 prose-code:rounded-lg',
                'prose-a:text-text-link',
                'prose-hr:border-border prose-hr:w-full',
                'prose-strong:font-bold',
                'prose-img:rounded',
                'codeblock',
                className,
            )} dangerouslySetInnerHTML={{ __html: parsed }}
            {...props}
        />
    )
});

export default Preview;