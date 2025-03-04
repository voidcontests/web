'use client';

export function Copy({ data }: { data: string }) {
    return (
        <span
            className="text-tertiary-foreground hover:text-foreground transition-colors hover:cursor-pointer"
            onClick={() => { if (data) navigator.clipboard.writeText(data) }}
        >
            Copy
        </span>
    );
}
