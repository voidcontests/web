import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    value: number;
    as: "seconds" | "minutes" | "hours";
    strict?: boolean;
}

export default function Duration({ value, as, strict = false, className, ...props }: Props) {
    let totalSeconds = 0;
    switch (as) {
        case "hours":
            totalSeconds = value * 3600;
            break;
        case "minutes":
            totalSeconds = value * 60;
            break;
        case "seconds":
            totalSeconds = value;
            break;
        default:
            totalSeconds = value;
    }

    if (totalSeconds <= 0) {
        return (
            <span {...props} className={className}>
                -
            </span>
        );
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];

    if (strict) {
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
    } else {
        if (totalSeconds >= 86400) {
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0) parts.push(`${hours}h`);
        } else if (totalSeconds >= 3600) {
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
        } else {
            if (minutes > 0) parts.push(`${minutes}m`);
            if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
        }
    }

    return (
        <span {...props} className={className}>
            {parts.join(" ")}
        </span>
    );
}
