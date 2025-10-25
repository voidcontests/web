'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle } from "@/ui/table";
import { ProblemDetailed } from "@/lib/models";

export default function Setters({ problem }: { problem: ProblemDetailed }) {
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
                        // this is a costil :)
                        [problem.writer.username].map((username, index) => (
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
