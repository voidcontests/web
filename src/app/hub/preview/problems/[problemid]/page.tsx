'use client';

import { getProblemByID, ProblemDetailed } from '@/lib/api';
import ContentContainer from '@/containers/content';
import Setters from '@/modules/problem/setters';
import { useEffect, useState } from 'react';
import { capitalize } from '@/lib/strings';
import Statement from '@/modules/problem/statement';
import ProblemLoading from '@/components/loading/problem';
import { MessageBox } from '@/components/message-box';
import { ResultError } from '@/lib/client';

export default function Page({ params }: { params: { problemid: string } }) {
    const [problem, setProblem] = useState<ProblemDetailed | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ResultError | null>(null);

    useEffect(() => {
        const load = async () => {
            const rproblem = await getProblemByID(params.problemid);

            if (!rproblem.ok) {
                setError(rproblem);
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

    if (error != null) {
        throw new Error(error.status >= 500 ? 'Something went wrong, try again later...' : 'Problem not found');
    }

    if (!problem) {
        throw new Error('Something went wrong, try again later...');
    }

    return (
        <ContentContainer>
            <MessageBox>
                <span className='font-medium'>
                    PREVIEW
                </span>
                <span>
                    You are inspecting the problem in a preview mode: only you
                    as a creator can see the problem, no one can submit solutions.
                </span>
            </MessageBox>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <Statement problem={problem} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
