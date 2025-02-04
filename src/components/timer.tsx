'use client';

import React, { useState, useEffect } from 'react';

interface TimerProps {
    target: Date;
    onComplete?: () => void;
}

const get_distance = (target: Date): number => {
    const now = new Date();
    const distance = target.getTime() - now.getTime();

    return distance;
}

const get_countdown_label = (distance: number): string => {
    if (distance < 0) {
        return '0s';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const parts: string[] = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.length > 0 ? parts.join(' ') : '0s';
}

// TODO: Extract move starting in out from this component
const Timer: React.FC<TimerProps> = ({ target, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState<string>(get_countdown_label(get_distance(target)));
    let docomplete = false;

    useEffect(() => {
        const interval = setInterval(() => {
            const distance = get_distance(target);
            if (distance > 0 && !docomplete) docomplete = true;

            if (distance < 0) {
                clearInterval(interval);
                if (onComplete && docomplete) onComplete();
                return;
            }

            const label = get_countdown_label(distance);
            setTimeLeft(label);
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    return (
        <div className="text-4xl font-medium" suppressHydrationWarning>
            {timeLeft}
        </div>
    );
};

export default Timer;
