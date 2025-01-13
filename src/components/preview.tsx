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
                'prose dark:prose-invert',
                'prose-headings:font-normal',
                'prose-code:bg-background-secondary prose-code:border prose-code:p-1 prose-code:rounded-lg',
                'prose-a:text-text-link prose-a:no-underline hover:prose-a:underline underline-offset-2 prose-a:font-normal',
                'prose-hr:border-border-primary prose-hr:w-full',
                'prose-strong:font-medium',
                'prose-img:rounded',
                'codeblock',
                className,
                'w-[1200px]',
            )} dangerouslySetInnerHTML={{ __html: parsed }}
            {...props}
        />
    );
});

export default Preview;