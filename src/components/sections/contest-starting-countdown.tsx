'use client';

import { ContestDetailed } from "@/api/dto/response";
import { use } from "react";
import Timer from "../timer";
import { revalidate } from "@/actions/actions";

export default function ContestStartingCountdown({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    if ((new Date()) > new Date(cdetailed.starting_at)) return null;

    return (
        <div className="flex flex-col items-center mt-12">
            <div className='flex flex-col items-center'>
                <div className="text-secondary-text text-lg">
                    STARTING IN
                </div>
                <Timer target={new Date(cdetailed.starting_at)} onComplete={() => revalidate(`/contest/${cdetailed.id}`) } />
            </div>
        </div>
    );
}
