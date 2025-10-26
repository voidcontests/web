import React, { useEffect, useState, HTMLAttributes } from "react";
import Duration from "@/components/duration";

interface CountdownProps extends HTMLAttributes<HTMLSpanElement> {
    target: Date;
    onComplete?: () => void;
}

export default function Countdown({ target, onComplete, className, ...props }: CountdownProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const diffSeconds = Math.floor((target.getTime() - now.getTime()) / 1000);

    useEffect(() => {
        if (diffSeconds <= 0 && onComplete) {
            onComplete();
        }
    }, [diffSeconds, onComplete]);

    if (diffSeconds <= 0) {
        return (
            <span {...props} className={className}>
                passed
            </span>
        );
    }

    return (
        <Duration
            value={diffSeconds}
            as="seconds"
            className={className}
            {...props}
        />
    );
}
