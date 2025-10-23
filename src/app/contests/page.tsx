import PublicContests from '@/components/sections/public-contests';
import ContentContainer from '@/components/content-container';
import { TableTemplate } from '@/components/sections/loading';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contests :: THE VOID*',
};

export default async function ContestsPage() {
    return (
        <ContentContainer>
            <Suspense
                fallback={
                    <TableTemplate title='PUBLIC CONTESTS' />
                }
            >
                <PublicContests />
            </Suspense>
        </ContentContainer>
    );
}
