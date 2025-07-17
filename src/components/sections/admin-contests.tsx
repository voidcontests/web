'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/components/ui/table";
import { Account, ContestList, ContestListItem, Pagination } from '@/actions/models/response';
import ContestStatus from '@/components/contest-status';
import { format_duration } from '@/lib/utils';
import { DateView } from "@/components/date";
import { Link } from "@/components/ui/link";
import { use } from 'react';
import { Result } from "@/actions";

export default function AdminContests({ account, contests }: { account: Promise<Result<Account>>, contests: Promise<Result<Pagination<ContestListItem>>> }) {
    const accountResult = use(account);
    const contestsResult = use(contests);

    if (!accountResult.ok) {
        throw new Error('unauthorized');
    }

    if (!contestsResult.ok) {
        return TableWithError(contestsResult.error.message);
    }

    const acc = accountResult.data;
    const cs = contestsResult.data;

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                {/* TODO: hide new button, if user already created maximum contests */}
                <span>CONTESTS</span>
                {
                    acc.role.name !== 'banned' &&
                    <Link href='/hub/new/contest' size="large">NEW</Link>
                }
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Starting at</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                        <TableHead>Leaderboard</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        cs.items.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center pr-5'>
                                    {contest.id}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/hub/contests/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.start_time} />
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.end_time} />
                                </TableCell>
                                <TableCell>
                                    {
                                        contest.duration_mins !== 0
                                            ? format_duration(contest.duration_mins)
                                            : 'Not limited'
                                    }
                                </TableCell>
                                <TableCell>
                                    {contest.participants}
                                </TableCell>
                                <TableCell>
                                    {contest.max_entries || 'Not limited'}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contest/${contest.id}/leaderboard`}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.created_at} />
                                </TableCell>
                                <TableCell>
                                    <ContestStatus contest={contest} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    cs.items.length === 0 &&
                    <TableCaption>
                        No created contests.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}

export function TableWithError(message: string) {
    return (
        <TableContainer>
            <TableTitle>CONTESTS</TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Starting at</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                        <TableHead>Leaderboard</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableCaption>
                    {
                        `Failed to get problems: ${message}`
                    }
                </TableCaption>
            </Table>
        </TableContainer>
    );
}
