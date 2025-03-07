import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';
import ArchivedProblems from '@/components/sections/archived-problems';
import ContentContainer from '@/components/content-container';
import { getProblemArchive } from '@/actions/actions';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Problems :: THE VOID*',
};

export default async function ContestsPage() {
    const problems = getProblemArchive();

    return (
        <ContentContainer>
            <Suspense fallback={<Loading />}>
                <ArchivedProblems problems={problems} />
            </Suspense>
        </ContentContainer>
    );
}

function Loading() {
    return (
        <TableContainer>
            <TableTitle>
                PROBLEMS
            </TableTitle>
            <Table>
                <TableCaption>Loading...</TableCaption>
            </Table>
        </TableContainer>
    );
}
