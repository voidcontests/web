import { ContestProblemView } from '@/components/sections/problem-view';
import { ProblemTemplate } from '@/components/sections/loading';
import ContentContainer from '@/components/content-container';
import { getProblem } from '@/actions/actions';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { pid: string } }) {
    const problem = getProblem(params.pid);

    return (
        <ContentContainer>
            <Suspense fallback={<ProblemTemplate />}>
                <ContestProblemView problem={problem} />
            </Suspense>
        </ContentContainer>
    );
}
