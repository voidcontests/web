'use client';

import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import { format_duration } from '@/lib/utils';
import ContestStatus from '@/components/contest-status';
import dynamic from 'next/dynamic';
import { Account, ContestList } from '@/actions/dto/response';
import { use } from 'react';
const DateView = dynamic(() => import("@/components/date"), { ssr: false });

export default async function AdminContests({ account, contests }: { account: Promise<Account>, contests: Promise<ContestList> }) {
    const acc = use(account);
    const cs = use(contests);

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
                        cs.data.map((contest, index) => (
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
                    cs.data.length === 0 &&
                    <TableCaption>
                        No created contests.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
