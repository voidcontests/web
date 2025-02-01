'use client'

import { format_date } from "@/lib/utils";

export default function Datetime({ timestamp }: { timestamp: string | Date }) {
    const s = new Date(timestamp);

    return (
        <span>{format_date(s)}</span>
    );
}
