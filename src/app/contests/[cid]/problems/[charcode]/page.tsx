'use client';

import { ContestProblemView } from '@/components/sections/contest-problem-view';
import { ProblemsetMinimal } from '@/components/sections/problemset';
import { getContestByID, getContestProblem } from '@/lib/api';
import ContentContainer from '@/components/content-container';
import Setters from '@/components/sections/problem-setters';
import { LatestSubmissionsView } from '@/components/sections/latest-submissions';
import { useEffect, useState } from 'react';
import { Result, ContestProblemDetailed, ContestDetailed } from '@/lib/api';

export default function Page({ params }: { params: { cid: string, charcode: string } }) {
    const [problem, setProblem] = useState<Promise<Result<ContestProblemDetailed>> | null>(null);
    const [contest, setContest] = useState<Promise<Result<ContestDetailed>> | null>(null);

    useEffect(() => {
        setProblem(getContestProblem(params.cid, params.charcode));
        setContest(getContestByID(params.cid));
    }, [params.cid, params.charcode]);

    if (!problem || !contest) {
        return <ContentContainer>Loading...</ContentContainer>;
    }

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <ContestProblemView problem={problem} />
                    <LatestSubmissionsView contestID={params.cid} charcode={params.charcode} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <ProblemsetMinimal contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
