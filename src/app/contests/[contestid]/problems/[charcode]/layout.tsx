import { Suspense } from 'react';
import ProblemLoading from '@/components/loading/problem';

export default function ProblemLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<ProblemLoading />}>
            {children}
        </Suspense>
    );
}
