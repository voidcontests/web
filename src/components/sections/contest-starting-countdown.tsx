'use client';

import { ContestDetailed } from "@/actions/models/response";
import { use } from "react";
import Timer from "@/components/timer";
import { revalidate } from "@/actions/revalidate";
import { Result } from "@/actions";

export default function ContestStartingCountdown({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) return null;

    const cdetailed = result.data;
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
