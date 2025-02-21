'use client';

import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import { itoc } from '@/lib/utils';
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle
} from "@/components/ui/table";
import { ContestDetailed, Leaderboard, ProblemListItem } from "@/actions/dto/response";
import { use } from "react";
import { Tag } from "@/components/ui/tag";
import { capitalize } from "@/lib/strings";
import { useTonWallet } from "@tonconnect/ui-react";
import Difficulty from "../difficulty";
import Address from "../address";

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
