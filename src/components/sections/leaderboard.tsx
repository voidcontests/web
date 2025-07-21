'use client';

import { toast } from "@/components/toast";
import { LeaderboardItem, Pagination } from "@/actions/models/response";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle
} from "@/components/ui/table";
import { use } from "react";
import { Result } from "@/actions";
import { capitalize } from "@/lib/strings";

export default function Problemset({ leaderboard }: { leaderboard: Promise<Result<Pagination<LeaderboardItem>>> }) {
    const result = use(leaderboard);
    if (!result.ok) {
        console.error(result.error.message);
        toast({ title: 'Leaderboard fetch failed', description: capitalize(result.error.message) });
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
                    <TableCaption>
                        Failed to fetch leaderboard.
                    </TableCaption>
                </Table>
            </TableContainer>
        );
    }

    const lb = result.data;

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
                        lb.items.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {entry.user_id}
                                </TableCell>
                                <TableCell>
                                    {`@${entry.username}`}
                                </TableCell>
                                <TableCell>
                                    {entry.points}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    lb.items.length === 0 &&
                    <TableCaption>
                        No participants in this contest.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
