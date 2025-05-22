'use client';

import { ContestDetailed } from "@/actions/dto/response";
import { use } from "react";
import Timer from "@/components/timer";
import { revalidate } from "@/actions";

export default function ContestStartingCountdown({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);
    const start_time = new Date(cdetailed.start_time);

    if ((new Date()) > start_time) return null;

    return (
        <div className="flex flex-col items-center mt-12">
            <div className='flex flex-col items-center'>
                <div className="text-secondary-foreground text-lg">
                    STARTING IN
                </div>
                <Timer target={start_time} onComplete={() => revalidate(`/contest/${cdetailed.id}`) } />
            </div>
        </div>
    );
}
