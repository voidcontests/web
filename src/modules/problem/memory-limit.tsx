import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    mb: number;
}

export default function MemoryLimit({ mb, ...props }: Props ) {
    return (
        <span {...props}>
            {mb} MB
        </span>
    );
}
