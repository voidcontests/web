'use client';

import { getAccount, getCreatedContests, getCreatedProblems } from '@/lib/api';
import ContentContainer from '@/components/content-container';
import { TableTemplate } from '@/components/sections/loading';
import HubMessage from '@/components/sections/hub-message';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Account, Pagination, ContestListItem, ProblemListItem } from '@/lib/api';
import AdminContests from '@/components/sections/admin-contests';
import AdminProblems from '@/components/sections/admin-problems';

export default function Page() {
    const [account, setAccount] = useState<Account | null>(null);
    const [contests, setContests] = useState<Pagination<ContestListItem> | null>(null);
    const [problems, setProblems] = useState<Pagination<ProblemListItem> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);

            const [raccount, rcontests, rproblems] = await Promise.all([
                getAccount(),
                getCreatedContests(0, 10),
                getCreatedProblems(0, 10)
            ]);

            if (!raccount.ok) {
                setError('Failed to load account');
                return;
            }

            setAccount(raccount.data);

            if (rcontests.ok) {
                setContests(rcontests.data);
            } else {
                setError('Failed to load contests');
                console.error('Failed to load contests:', rcontests.error.message);
            }

            if (rproblems.ok) {
                setProblems(rproblems.data);
            } else {
                setError('Failed to load problems');
                console.error('Failed to load problems:', rproblems.error.message);
            }

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <ContentContainer>
                <TableTemplate title='PROBLEMS' />
                <TableTemplate title='CONTESTS' />
            </ContentContainer>
        );
    }

    if (error || !account || !problems || !contests) {
        return (
            <ContentContainer>
                <div className="text-center py-8">
                    <p className="text-red-500">{error || 'We broke something, try again later'}</p>
                </div>
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <HubMessage account={account} />
            <div className='flex flex-col gap-1'>
                <h1 className='text-xl font-medium'>
                    Welcome to creator's hub
                </h1>
                <p className='text-base text-foreground/80'>
                    Here you can control all of your created competitions, create new problems and contests.
                </p>
            </div>
            <Separator />
            <AdminContests account={account} contests={contests} />
            <AdminProblems account={account} problems={problems} />
        </ContentContainer>
    );
}
