'use client';

import { SubmitView } from '@/modules/problem/submit-view';
import ContentContainer from '@/containers/content';
import SubmissionHistory from '@/modules/problem/submission-history';
import Setters from '@/modules/problem/setters';
import Problemset from '@/modules/contest/problemset-minimal';
import { ContestProblemDetailed, ContestDetailed } from '@/lib/api';
import { getContestByID, getContestProblem } from '@/lib/api';
import { useEffect, useState } from 'react';
import { capitalize } from '@/lib/strings';
import Statement from '@/modules/problem/statement';
import ProblemLoading from '@/components/loading/problem';

export default function Page({ params }: { params: { contestid: string, charcode: string } }) {
    const [problem, setProblem] = useState<ContestProblemDetailed | null>(null);
    const [contest, setContest] = useState<ContestDetailed | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            const [rproblem, rcontest] = await Promise.all([
                getContestProblem(params.contestid, params.charcode),
                getContestByID(params.contestid)
            ]);

            if (!rproblem.ok) {
                setError(rproblem.error.message);
                setLoading(false);
                return;
            }

            if (!rcontest.ok) {
                setError(rcontest.error.message);
                setLoading(false);
                return;
            }

            setProblem(rproblem.data);
            setContest(rcontest.data);
            setLoading(false);
        };

        load();
    }, [params.contestid, params.charcode]);

    if (loading) {
        return <ProblemLoading />;
    }

    if (!problem || !contest || error != null) {
        throw new Error(capitalize(error ?? 'Contest or problem not found'));
    }

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <Statement problem={problem} />
                    <SubmitView problem={problem} />
                    <SubmissionHistory contestID={params.contestid} charcode={params.charcode} />
                </div>
                <div className='col-span-3 flex flex-col gap-5  sticky top-5 self-start'>
                    <Problemset contest={contest} />
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
