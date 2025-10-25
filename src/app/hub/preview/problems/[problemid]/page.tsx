'use client';

import { SubmitView } from '@/modules/problem/submit-view';
import ContentContainer from '@/containers/content';
import SubmissionHistory from '@/modules/problem/submission-history';
import Setters from '@/modules/problem/setters';
import Problemset from '@/modules/contest/problemset-minimal';
import { ContestProblemDetailed, ContestDetailed, getProblemByID, ProblemDetailed } from '@/lib/api';
import { getContestByID, getContestProblem } from '@/lib/api';
import { useEffect, useState } from 'react';
import { capitalize } from '@/lib/strings';
import Statement from '@/modules/problem/statement';
import ProblemLoading from '@/components/loading/problem';

export default function Page({ params }: { params: { problemid: string } }) {
    const [problem, setProblem] = useState<ProblemDetailed | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const rproblem = await getProblemByID(params.problemid);

            if (!rproblem.ok) {
                setError(rproblem.error.message);
            } else {
                setProblem(rproblem.data);
            }

            setLoading(false);
        };

        load();
    }, [params.problemid]);

    if (loading) {
        return <ProblemLoading />;
    }

    if (!problem || error != null) {
        throw new Error(capitalize(error ?? 'Problem not found'));
    }

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <Statement problem={problem} />
                    <SubmitView problem={problem} />
                    <SubmissionHistory contestID={params.contestid} charcode={params.charcode} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <Problemset contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
