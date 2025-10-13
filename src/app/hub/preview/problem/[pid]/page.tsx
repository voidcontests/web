'use client';

import { ProblemView } from '@/components/sections/problem-view';
import ContentContainer from '@/components/content-container';
import Setters from '@/components/sections/problem-setters';
import { getProblemByID } from '@/lib/api';
import { MessageBox } from '@/components/sections/message-box';
import { useEffect, useState } from 'react';
import { Result, ProblemDetailed } from '@/lib/api';

export default function Page({ params }: { params: { pid: string } }) {
    const [problem, setProblem] = useState<Promise<Result<ProblemDetailed>> | null>(null);

    useEffect(() => {
        setProblem(getProblemByID(params.pid));
    }, [params.pid]);

    if (!problem) {
        return <ContentContainer>Loading...</ContentContainer>;
    }

    return (
        <ContentContainer>
            <MessageBox>
                This is a preview. Solution submission is not available in preview mode.
            </MessageBox>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 flex flex-col gap-5'>
                    <ProblemView problem={problem} />
                </div>
                <div className='col-span-3 flex flex-col gap-5'>
                    <Setters problem={problem} />
                </div>
            </div>
        </ContentContainer>
    );
}
