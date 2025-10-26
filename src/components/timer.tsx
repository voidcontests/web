'use client';

import { useState, useEffect, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    target: Date;
    onComplete?: () => void;
    full?: boolean;
    expiredLabel?: string;
}

const getDistance = (target: Date): number => {
    const now = new Date();
    const distance = target.getTime() - now.getTime();

    return distance;
}

const getLabel = ( distance: number, full: boolean, expiredLabel: string ): string => {
    if (distance < 0) {
        return expiredLabel;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (full) {
        const parts: string[] = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0) parts.push(`${seconds}s`);
        return parts.length > 0 ? parts.join(' ') : '0s';
    } else {
        if (distance >= 1000 * 60 * 60 * 24) {
            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0) parts.push(`${hours}h`);
            return parts.join(' ') || '0s';
        }
        if (distance >= 1000 * 60 * 60) {
            const parts = [];
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
            return parts.join(' ') || '0s';
        }
        const parts = [];
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0) parts.push(`${seconds}s`);
        return parts.join(' ') || '0s';
    }
};


export default function Timer({ target, onComplete, full = false, expiredLabel = '0s', ...props }: Props) {
    const d = getDistance(target);
    const initialLabel = getLabel(d, full, expiredLabel)
    const [label, setLabel] = useState<string>(initialLabel);
    let doCallback = false;

    useEffect(() => {
        const interval = setInterval(() => {
            const distance = getDistance(target);
            if (distance > 0 && !doCallback) doCallback = true;

            if (distance < 0) {
                clearInterval(interval);
                if (onComplete && doCallback) onComplete();
                return;
            }

            const label = getLabel(distance, full, expiredLabel);
            setLabel(label);
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    return (
        <span {...props}>{label}</span>
    );
}
