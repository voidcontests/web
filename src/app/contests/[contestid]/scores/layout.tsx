import { Suspense } from 'react';
import TableTemplate from '@/components/templates/table';
import ContentContainer from '@/containers/content';

function ScoresLoading() {
    return (
        <ContentContainer>
            <TableTemplate title="SCORES" caption='Loading...' />
        </ContentContainer>
    );
}

export default function ScoresLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<ScoresLoading />}>
            {children}
        </Suspense>
    );
}
