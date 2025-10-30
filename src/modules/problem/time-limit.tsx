import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    ms: number;
}

export default function TimeLimit({ ms, ...props }: Props ) {
    const seconds = ms / 1000;
    const integerPart = Math.floor(seconds);
    const decimalPart = Math.floor((seconds - integerPart) * 10);

    const formattedSeconds =
        decimalPart === 0 ? `${integerPart}` : `${integerPart}.${decimalPart}`;

    return <span {...props}>{formattedSeconds}s</span>;
}
