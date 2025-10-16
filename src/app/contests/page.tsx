import OfficialContests from '@/components/sections/official-contests';
import ContentContainer from '@/components/content-container';
import { TableTemplate } from '@/components/sections/loading';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

// NOTE: dynamic import here for prevent rendering on the server (to not display server time)
import dynamic from 'next/dynamic';
const PublicContests = dynamic(() => import('@/components/sections/public-contests'), { ssr: false, loading: () => <TableTemplate title='PUBLIC CONTESTS' /> });

export const metadata: Metadata = {
    title: 'Contests :: THE VOID*',
};

export default async function ContestsPage() {
    return (
        <ContentContainer>
            <PublicContests />
        </ContentContainer>
    );
}
