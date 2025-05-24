'use client';

import { ProblemDetailed } from "@/actions/dto/response";
import { use } from "react";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
} from "@/components/ui/table";

export default function Setters({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);

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
