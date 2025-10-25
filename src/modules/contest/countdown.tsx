'use client';

import { ContestDetailed } from "@/lib/models";
import Timer from "@/components/timer";

export default function Countdown({ contest }: { contest: ContestDetailed }) {
    const start_time = new Date(contest.start_time);

    if ((new Date()) > start_time) return null;

    return (
        <div className="flex flex-col items-center mt-12">
            <div className='flex flex-col items-center'>
                <div className="text-secondary-foreground text-lg">
                    STARTING IN
                </div>
                <Timer target={start_time} onComplete={() => window.location.reload()} />
            </div>
        </div>
    );
}
