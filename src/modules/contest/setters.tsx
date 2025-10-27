'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle } from "@/ui/table";
import { ContestDetailed } from "@/lib/models";
import { Username } from "@/components/username";

export default function Setters({ contest }: { contest: ContestDetailed }) {
    const setters = Array.from(new Set(contest.problems.map(problem => problem.writer.username)));

    return (
        <TableContainer>
            <TableTitle>
                SETTERS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>#</TableHead>
                        <TableHead>Username</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        setters.map((username, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index + 1}/`}</TableCell>
                                <TableCell>
                                    <Username username={username} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer >
    );
}
