import PublicContests from '@/modules/public-contests';
import ContentContainer from '@/containers/content';
import { Metadata } from 'next';
import { fetchAllContests } from '@/actions/contests';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Contests \\ Void',
};

const LIMIT = 10;

type ContestsPageProps = {
    searchParams: Promise<{ page?: string }>;
};

export default async function ContestsPage({ searchParams }: ContestsPageProps) {
    const params = await searchParams;
    const page = parseInt(params.page || '1', 10);

    if (page < 1 || isNaN(page)) {
        redirect('/contests?page=1');
    }

    const offset = (page - 1) * LIMIT;
    const result = await fetchAllContests(offset, LIMIT);

    if (!result.ok) {
        return (
            <ContentContainer>
                <div>Error loading contests: {result.error.message}</div>
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <PublicContests
                contests={result.data.items}
                total={result.data.meta.total}
                offset={offset}
            />
        </ContentContainer>
    );
}
