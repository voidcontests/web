'use client';

import { ContestDetailed } from "@/actions/models/response";
import { use } from "react";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
} from "@/components/ui/table";
import { Result } from "@/actions";

export default function Setters({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        throw new Error(`Fetch contest information failed: ${result.error}`);
    }

    const cdetailed = result.data;

    const setters = Array.from(new Set(cdetailed.problems.map(problem => problem.writer.username)));

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
                        setters.map((username, index) => (
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
        </TableContainer >
    );
}
