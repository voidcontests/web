'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/components/ui/table';
import { ContestList } from '@/actions/dto/response';
import { format_duration } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import Address from '@/components/address';
import DateView from '@/components/date';
import { use } from 'react';

export default function PublicContests({ contests }: { contests: Promise<ContestList> }) {
    const cs = use(contests);

    return (
        <TableContainer>
            <TableTitle>
                PUBLIC COMPETITIONS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Host address</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        cs.data.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell>{contest.id}</TableCell>
                                <TableCell>
                                    <Link href={`/contest/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Address address={contest.creator.address} />
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
                    cs.data.length === 0 && <TableCaption>No public contests</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
