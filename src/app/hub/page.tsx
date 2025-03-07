import { getAccount, getAdminContests, getAdminProblems } from '@/actions/actions';
import ContentContainer from '@/components/content-container';
import HubMessage from '@/components/sections/hub-message';
import { Separator } from '@/components/ui/separator';
import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';
import { Suspense } from 'react';

import dynamic from 'next/dynamic';
const AdminContests = dynamic(() => import('@/components/sections/admin-contests'), { ssr: false, loading: () => <Loading title='CONTESTS' /> });
const AdminProblems = dynamic(() => import('@/components/sections/admin-problems'), { ssr: false, loading: () => <Loading title='PROBLEMS' /> });

export default async function Page() {
    const account = getAccount();
    const contests = getAdminContests();
    const problems = getAdminProblems();

    return (
        <ContentContainer>
            <HubMessage />
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Welcome to creator's hub
                </h1>
                <p className='text-base text-foreground/80'>
                    Here you can control all of your created competitions, create new problems and contests.
                </p>
            </div>
            <Separator />
            <Suspense fallback={<Loading title='CONTESTS' />}>
                <AdminContests account={account} contests={contests} />
            </Suspense>
            <Suspense fallback={<Loading title='PROBLEMS' />}>
                <AdminProblems account={account} problems={problems} />
            </Suspense>
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
