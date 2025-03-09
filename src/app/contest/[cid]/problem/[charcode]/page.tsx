import { ContestProblemView } from '@/components/sections/contest-problem-view';
import { ProblemTemplate, TableTemplate } from '@/components/sections/loading';
import { ProblemsetMinimal } from '@/components/sections/problemset';
import { getContest, getContestProblem } from '@/actions/actions';
import ContentContainer from '@/components/content-container';
import Setters from '@/components/sections/problem-setters';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { cid: string, charcode: string } }) {
    const problem = getContestProblem(params.cid, params.charcode);
    const contest = getContest(params.cid);

    return (
        <ContentContainer>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9'>
                    <Suspense fallback={<ProblemTemplate />}>
                        <ContestProblemView problem={problem} />
                    </Suspense>
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <Suspense fallback={<TableTemplate title='PROBLEMSET' />}>
                        <ProblemsetMinimal contest={contest} />
                    </Suspense>
                    <Suspense fallback={<TableTemplate title='SETTERS' />}>
                        <Setters problem={problem} />
                    </Suspense>
                </div>
            </div>
        </ContentContainer>
    );
}
