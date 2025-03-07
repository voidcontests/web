import OfficialContests from '@/components/sections/official-contests';
import { Loading } from '@/components/sections/public-contests';
import ContentContainer from '@/components/content-container';
import { Separator } from '@/components/ui/separator';
import { getContests } from '@/actions/actions';
import { Suspense } from 'react';
import { Metadata } from 'next';

// NOTE: dynamic import here for prevent rendering on the server (to not display server time)
import dynamic from 'next/dynamic';
const PublicContests = dynamic(() => import('@/components/sections/public-contests'), { ssr: false, loading: () => <Loading /> });

export const metadata: Metadata = {
    title: 'Contests :: THE VOID*',
};

export default async function ContestsPage() {
    const contests = getContests();

    return (
        <ContentContainer>
            <OfficialContests />
            <Separator />
            <Suspense fallback={<Loading />}>
                <PublicContests contests={contests} />
            </Suspense>
        </ContentContainer>
    );
}
