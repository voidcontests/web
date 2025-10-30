import { parse } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

import './theme.css';

interface PreviewProps extends ComponentProps<"div"> {
    markdown: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ markdown, className, ...props }, ref) => {
    const parsed = parse(markdown);

    return (
        <div
            ref={ref}
            className={cn(
                'prose dark:prose-invert',
                'prose-headings:font-normal',
                'prose-h1:pb-2.5 prose-h1:mb-4 prose-h1:text-xl prose-h1:border-b',
                'prose-h2:pb-1.5 prose-h2:mb-4 prose-h2:text-lg prose-h2:border-b',
                'prose-h3:text-base prose-h3:mt-6 prose-h3:mb-4',
                'prose-h4:text-sm prose-h4:mt-6 prose-h4:mb-4',
                'prose-h5:text-sm prose-h5:mt-6 prose-h5:mb-4',
                'prose-h6:text-sm prose-h6:text-secondary-foreground prose-h6:mt-6 prose-h6:mb-4',
                'prose-code:bg-zinc-50 dark:prose-code:bg-surface prose-code:border prose-code:p-1 prose-code:rounded-lg',
                'prose-a:text-blue-400 prose-a:no-underline prose-a:hover:underline underline-offset-2 prose-a:font-normal',
                'prose-hr:border-border prose-hr:w-full',
                'prose-strong:font-medium',
                'prose-img:rounded',
                'codeblock',
                'w-full max-w-none',
                'text-sm mt-1',
                className,
            )} dangerouslySetInnerHTML={{ __html: parsed }}
            {...props}
        />
    );
});

export default Preview;
