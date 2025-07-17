'use client';

import { useState } from "react";

export function Copy({ data }: { data: string }) {
    const [copied, setCopied] = useState(false);

    const onClick = () => {
        if (copied) return;

        navigator.clipboard.writeText(data);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <span
            className='text-tertiary-foreground hover:text-foreground transition-colors hover:cursor-pointer'
            onClick={onClick}
        >
            {
                copied ? 'Copied!' : 'Copy'
            }
        </span>
    );
}
