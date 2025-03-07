import { getAccount, getAdminContests, getAdminProblems } from '@/actions/actions';
import ContentContainer from '@/components/content-container';
import { TableTemplate } from '@/components/sections/loading';
import HubMessage from '@/components/sections/hub-message';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

import dynamic from 'next/dynamic';
const AdminContests = dynamic(() => import('@/components/sections/admin-contests'), { ssr: false, loading: () => <TableTemplate title='CONTESTS' /> });
const AdminProblems = dynamic(() => import('@/components/sections/admin-problems'), { ssr: false, loading: () => <TableTemplate title='PROBLEMS' /> });

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
            <Suspense fallback={<TableTemplate title='CONTESTS' />}>
                <AdminContests account={account} contests={contests} />
            </Suspense>
            <Suspense fallback={<TableTemplate title='PROBLEMS' />}>
                <AdminProblems account={account} problems={problems} />
            </Suspense>
        </ContentContainer>
    );
}
