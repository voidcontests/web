'use client';

import { Leaderboard } from "@/actions/dto/response";
import Address from "@/components/address";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle
} from "@/components/ui/table";
import { use } from "react";

export default function Problemset({ leaderboard }: { leaderboard: Promise<Leaderboard> }) {
    const lb = use(leaderboard);

    return (
        <TableContainer>
            <TableTitle>
                LEADERBOARD
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Points</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        lb.data.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {entry.user_id}
                                </TableCell>
                                <TableCell>
                                    <Address address={entry.user_address} notruncate />
                                </TableCell>
                                <TableCell>
                                    {entry.points}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    lb.data.length === 0 &&
                    <TableCaption>
                        No participants in this contest.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
