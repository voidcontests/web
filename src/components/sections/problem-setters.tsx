'use client';

import { ProblemDetailed } from "@/actions/models/response";
import { use } from "react";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
} from "@/components/ui/table";
import { Result } from "@/actions";

export default function Setters({ problem }: { problem: Promise<Result<ProblemDetailed>> }) {
    const result = use(problem);
    if (!result.ok) {
        throw new Error(`Fetch problem failed: ${result.error.message}`);
    }

    const pdetailed = result.data;

    return (
        <TableContainer>
            <TableTitle>
                SETTERS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>#</TableHead>
                        <TableHead>Writer</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        [pdetailed.writer.username].map((username, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index + 1}/`}</TableCell>
                                <TableCell>
                                    {`@${username}`}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
