'use client';

import ContestStartingCountdown from "@/components/sections/contest-starting-countdown";
import { ContestAbout } from "@/components/sections/contest-about";
import AppliedStatus from "@/components/sections/applied-status";
import ContentContainer from "@/components/content-container";
import { Loading } from "@/components/sections/contest-about";
import { Problemset } from "@/components/sections/problemset";
import ContestInfo from "@/components/sections/contest-info";
import Setters from "@/components/sections/contest-setters";
import { getContestByID } from "@/lib/api";
import ContestMessage from "@/components/sections/contest-message";
import { Suspense, useEffect, useState } from "react";
import { Result, ContestDetailed } from "@/lib/api";

export default function Page({ params }: { params: { cid: string } }) {
    const [contest, setContest] = useState<Promise<Result<ContestDetailed>> | null>(null);

    useEffect(() => {
        setContest(getContestByID(params.cid));
    }, [params.cid]);

    if (!contest) {
        return <ContentContainer>Loading...</ContentContainer>;
    }

    return (
        <ContentContainer suppressHydrationWarning>
            <ContestMessage contest={contest} />
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-5">
                    <ContestInfo contest={contest} />
                    <Problemset contest={contest} />
                    <ContestStartingCountdown contest={contest} />
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-5">
                        <Suspense
                            fallback={
                                <Loading />
                            }
                        >
                            <ContestAbout contest={contest} />
                        </Suspense>
                        <Setters contest={contest} />
                        <AppliedStatus contest={contest} />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
