import { Suspense } from 'react';
import TableTemplate from '@/components/templates/table';
import ContentContainer from '@/containers/content';

function ProblemsLoading() {
    return (
        <ContentContainer>
            <TableTemplate title="PROBLEMS" caption='Loading...' />
        </ContentContainer>
    );
}

export default function ProblemsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<ProblemsLoading />}>
            {children}
        </Suspense>
    );
}
