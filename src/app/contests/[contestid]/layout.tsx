import { Metadata } from 'next';
import { Suspense } from 'react';
import ContestLoading from '@/components/loading/contest';

export const metadata: Metadata = {
    title: 'Contest \\ Void',
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<ContestLoading />}>
            {children}
        </Suspense>
    );
}
