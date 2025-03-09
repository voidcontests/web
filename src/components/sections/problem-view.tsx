'use client';

import { TestCase } from '@/components/sections/test-case';
import { ProblemDetailed } from '@/actions/dto/response';
import Preview from '@/components/sections/preview';
import { use } from 'react';

export function ProblemView({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);

    return (
        <div className='flex flex-col gap-7'>
            <div className='flex justify-center items-center'>
                <h1 className='text-foreground text-xl font-medium text-center'>
                    {pdetailed.title}
                </h1>
            </div>
            <Preview markdown={pdetailed.statement} />
            {
                pdetailed.kind === 'coding_problem' &&
                <div className='flex flex-col gap-4'>
                    {
                        (pdetailed.examples && pdetailed.examples.length !== 0) &&
                        <div className='flex flex-col gap-0'>
                            <h3 className='font-medium text-lg'>
                                Examples
                            </h3>
                            <div className='flex flex-col gap-3'>
                                {
                                    pdetailed.examples.map((example) => (
                                        <TestCase tc={example} />
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
