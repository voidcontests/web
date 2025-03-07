import ContentContainer from '@/components/content-container';
import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';
import dynamic from 'next/dynamic';

const ArchivedProblems = dynamic(() => import('@/components/sections/archived-problems'), { ssr: false, loading: () => <Loading title='PROBLEMSET' /> });

export default async function Page() {
    return (
        <ContentContainer>
            <ArchivedProblems />
        </ContentContainer>
    );
}

function Loading({ title }: { title: string }) {
    return (
        <TableContainer>
            <TableTitle>
                {title}
            </TableTitle>
            <Table>
                <TableCaption>Loading...</TableCaption>
            </Table>
        </TableContainer>
    );
}
