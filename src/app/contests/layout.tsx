import { Suspense } from 'react';
import ContentContainer from '@/containers/content';
import TableTemplate from '@/components/templates/table';

function ContestsLoading() {
    return (
        <ContentContainer>
            <TableTemplate title="PUBLIC CONTESTS" caption="Loading..." />
        </ContentContainer>
    );
}

export default function ContestsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<ContestsLoading />}>
            {children}
        </Suspense>
    );
}
