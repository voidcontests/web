'use client';

import { LeaderboardItem } from "@/lib/models";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle
} from "@/ui/table";
import { Username } from "@/components/username";

export default function Problemset({ leaderboard }: { leaderboard: LeaderboardItem[] }) {
    return (
        <TableContainer>
            <TableTitle>
                LEADERBOARD
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Points</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        leaderboard.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {entry.user_id}
                                </TableCell>
                                <TableCell>
                                    <Username username={entry.username} />
                                </TableCell>
                                <TableCell>
                                    {entry.points}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    leaderboard.length === 0 &&
                    <TableCaption>
                        No participants in this contest.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
