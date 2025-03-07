import ArchivedProblems from '@/components/sections/archived-problems';
import ContentContainer from '@/components/content-container';
import { TableTemplate } from '@/components/sections/loading';
import { getProblemArchive } from '@/actions/actions';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Problems :: THE VOID*',
};

export default async function ContestsPage() {
    const problems = getProblemArchive();

    return (
        <ContentContainer>
            <Suspense fallback={<TableTemplate title='PROBLEMS' />}>
                <ArchivedProblems problems={problems} />
            </Suspense>
        </ContentContainer>
    );
}
