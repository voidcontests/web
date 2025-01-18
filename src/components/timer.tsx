import React, { useState, useEffect } from 'react';

interface TimerProps {
    target: Date;
}

const get_countdown = (target: Date): string => {
    const now = new Date();
    const distance = target.getTime() - now.getTime();

    if (distance < 0) {
        return '0d 0h 0m 0s';
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

    return parts.length > 0 ? parts.join(' ') : '0s'; // Return '0s' if all values are zero
}

const Timer: React.FC<TimerProps> = ({ target }) => {
    const [timeLeft, setTimeLeft] = useState<string>(get_countdown(target));

    useEffect(() => {
        const interval = setInterval(() => {
            const countdown = get_countdown(target);
            setTimeLeft(countdown);

            if (countdown === '0d 0h 0m 0s') {
                clearInterval(interval);
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    return (
        <div className='flex flex-col items-center'>
            <div className="text-text-secondary text-lg">
                STARTING IN
            </div>
            <div className="text-text-primary text-4xl font-medium">
                {timeLeft}
            </div>
        </div>
    );
};

export default Timer;
