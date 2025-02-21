'use client';

import { ContestList } from "@/actions/dto/response";
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle,
} from "@/components/ui/table";
import { format_date, format_duration } from '@/lib/utils';
import { use } from "react";
import Address from "@/components/address";

export function PublicContests({ contests }: { contests: Promise<ContestList> }) {
    const publicContests = use(contests);

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
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        publicContests.data.map((contest, index) => (
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
                                    {format_date(new Date(contest.start_time))}
                                </TableCell>
                                <TableCell>
                                    {format_date(new Date(contest.end_time))}
                                </TableCell>
                                <TableCell>
                                    {
                                        contest.duration_mins !== 0
                                            ? format_duration(contest.duration_mins)
                                            : '-'
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    publicContests.data.length === 0 && <TableCaption>No public contests</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}

export function Loading() {
    return (
        <TableContainer>
            <TableTitle>
                PUBLIC COMPETITIONS
            </TableTitle>
            <Table>
                <TableCaption>Loading...</TableCaption>
            </Table>
        </TableContainer>
    );
}
