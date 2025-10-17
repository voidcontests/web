'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface Props extends React.SVGProps<SVGSVGElement> {
    dynamic?: boolean;
    dashSize?: number;
    gapSize?: number;
}

function Asterisk({ className, dynamic = false, dashSize = 100, gapSize = 100, ...props }: Props) {
    const LENGTH = 1000;
    const MIN = 0;
    const MAX = 1000;
    const STEP = 3;
    const [size, setSize] = useState(MAX);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (!dynamic) return;

        const interval = setInterval(() => {
            setSize(prevSize => {
                const nextSize = prevSize + STEP * direction;

                if (nextSize >= MAX) {
                    setDirection(-1);
                    return MAX;
                } else if (nextSize <= MIN) {
                    setDirection(1);
                    return MIN;
                }

                return nextSize;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [dynamic, direction]);

    const currentDashSize = dynamic ? size : dashSize;
    const currentGapSize = dynamic ? LENGTH - size : gapSize;
    const dashOffset = dynamic ? 2 * LENGTH : LENGTH;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512" height="512" viewBox="0 0 512 512" fill="none"
            {...props} className={cn('stroke-zinc-900 fill-none dark:stroke-zinc-300 dark:fill-none', className)}
        >
            <rect width="512" height="512" fill="none" stroke="none" />
            <path id="shape"
                d="M197.159 394.146C195.581 396.303 192.586 396.837 190.359 395.36L140.427 362.237C138.02 360.641 137.462 357.343 139.21 355.044L195.747 280.666C197.813 277.947 196.606 274.002 193.372 272.905L108.735 244.202C106.12 243.315 104.719 240.476 105.606 237.861L124.24 182.925C125.141 180.267 128.054 178.871 130.69 179.834L212.874 209.849C216.136 211.04 219.589 208.625 219.589 205.152V118C219.589 115.239 221.827 113 224.589 113H286.411C289.173 113 291.411 115.239 291.411 118V205.152C291.411 208.625 294.864 211.04 298.126 209.849L380.31 179.834C382.946 178.871 385.859 180.267 386.76 182.925L405.394 237.861C406.281 240.476 404.88 243.315 402.265 244.202L317.628 272.905C314.394 274.002 313.187 277.947 315.253 280.666L371.79 355.044C373.538 357.343 372.98 360.641 370.573 362.237L320.64 395.36C318.414 396.837 315.419 396.303 313.841 394.146L259.535 319.923C257.538 317.193 253.462 317.193 251.465 319.923L197.159 394.146Z"
                strokeWidth="13" strokeLinejoin="round"
                strokeLinecap="butt"
                pathLength={LENGTH}
            />
            <style>
                {`
                #shape {
                    stroke-dasharray: ${currentDashSize} ${currentGapSize};
                    animation: dash-move 4s linear infinite;
                }
                @keyframes dash-move {
                    to { stroke-dashoffset: -${dashOffset}; }
                }
                `}
            </style>
        </svg>
    )
}

export { Asterisk };
