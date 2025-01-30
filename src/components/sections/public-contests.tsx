'use client';

import { ContestList, ContestListItem } from "@/api/dto/response";
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle,
} from "@/components/ui/table";
import { format_date, format_duration } from '@/lib/utils';
import { truncate_address } from '@/lib/strings';
import { use } from "react";

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
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Host address</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Duration</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        publicContests.data.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index}/`}</TableCell>
                                <TableCell>
                                    <Link href={`/contest/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`https://tonscan.org/address/${contest.creator.address}`}>
                                        {truncate_address(contest.creator.address)}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    Training
                                </TableCell>
                                <TableCell>{format_date(new Date(contest.starting_at))}</TableCell>
                                <TableCell>{format_duration(contest.duration_mins)}</TableCell>
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