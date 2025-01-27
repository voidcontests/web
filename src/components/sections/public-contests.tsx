import { ContestListItem } from "@/api/dto/response";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";
import {
    TableContainer, TableHead, Table, TableBody, TableRow, TableCell,
    TableHeaderRow, TableHeaderCell, TableCaption
} from "@/components/ui/table";
import { format_date, format_duration } from '@/lib/utils';
import { truncate_address } from '@/lib/strings';
import { use } from "react";

export function PublicContests({ contests }: { contests: Promise<ContestListItem[]> }) {
    const publicContests = use(contests);

    return (
        <TableContainer>
            <TableHead>
                PUBLIC COMPETITIONS
            </TableHead>
            <Table>
                <TableHeaderRow>
                    <TableRow>
                        <TableHeaderCell className='w-[2%]'>#</TableHeaderCell>
                        <TableHeaderCell className='w-[40%]'>Title</TableHeaderCell>
                        <TableHeaderCell>Host address</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Start</TableHeaderCell>
                        <TableHeaderCell>Duration</TableHeaderCell>
                    </TableRow>
                </TableHeaderRow>
                <TableBody>
                    {
                        publicContests.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index}/`}</TableCell>
                                <TableCell>
                                    <Link href={`/contests/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`https://tonscan.org/address/${contest.creator.address}`}>
                                        {truncate_address(contest.creator.address)}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Tag variant="secondary">Training</Tag>
                                </TableCell>
                                <TableCell>{format_date(new Date(contest.starting_at))}</TableCell>
                                <TableCell>{format_duration(contest.duration_mins)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    publicContests.length === 0 && <TableCaption>No public contests</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}

export function Loading() {
    return (
        <TableContainer>
            <TableHead>
                PUBLIC COMPETITIONS
            </TableHead>
            <Table>
                <TableCaption>Loading...</TableCaption>
            </Table>
        </TableContainer>
    );
}