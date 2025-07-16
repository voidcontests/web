'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/components/ui/table';
import { ContestList, ContestListItem, Pagination } from '@/actions/models/response';
import { format_duration } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { DateView } from '@/components/date';
import { use } from 'react';

export default function PublicContests({ contests }: { contests: Promise<Pagination<ContestListItem>> }) {
    const cs = use(contests);

    return (
        <TableContainer>
            <TableTitle>
                PUBLIC CONTESTS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        cs.items.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell>{contest.id}</TableCell>
                                <TableCell>
                                    <Link href={`/contest/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {`@${contest.creator.username}`}
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
                                            : '-'
                                    }
                                </TableCell>
                                <TableCell>
                                    {contest.participants}
                                </TableCell>
                                <TableCell>
                                    {
                                        contest.max_entries || 'Not limited'
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    cs.items.length === 0 && <TableCaption>No public contests</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
