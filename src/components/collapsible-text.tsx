"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleTextProps {
    children: React.ReactNode;
    maxLines?: number;
    className?: string;
    expandText?: string;
    collapseText?: string;
    buttonClassName?: string;
}

export default function CollapsibleText({
    children,
    maxLines = 10,
    className,
    expandText = "show more...",
    collapseText = "show less",
    buttonClassName
}: CollapsibleTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldTruncate, setShouldTruncate] = useState(false);
    const [isMeasured, setIsMeasured] = useState(false);

    useEffect(() => {
        if (!contentRef.current) return;

        requestAnimationFrame(() => {
            if (!contentRef.current) return;

            const element = contentRef.current;
            const style = getComputedStyle(element);
            const lineHeight = parseFloat(style.lineHeight);

            const fullHeight = element.scrollHeight;
            const lines = Math.round(fullHeight / lineHeight);

            setShouldTruncate(lines > maxLines);
            setIsMeasured(true);
        });
    }, [children, maxLines]);

    return (
        <div className="flex flex-col gap-2">
            <div
                ref={contentRef}
                className={cn(
                    className,
                    isMeasured && !isExpanded && shouldTruncate && `line-clamp-${maxLines}`
                )}
                style={
                    isMeasured && !isExpanded && shouldTruncate
                        ? {
                            display: '-webkit-box',
                            WebkitLineClamp: maxLines,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }
                        : undefined
                }
            >
                {children}
            </div>
            {isMeasured && shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "text-sm transition-colors text-left w-fit text-muted-foreground hover:text-foreground hover:cursor-pointer",
                        buttonClassName
                    )}
                >
                    {isExpanded ? collapseText : expandText}
                </button>
            )}
        </div>
    );
}
