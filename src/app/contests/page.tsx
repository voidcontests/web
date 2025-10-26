import PublicContests from '@/modules/public-contests';
import ContentContainer from '@/containers/content';
import { Metadata } from 'next';

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
