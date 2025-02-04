'use client';

import { ProblemDetailed } from "@/api/dto/response";
import { use } from "react";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
} from "@/components/ui/table";
import Address from "@/components/address";

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
                        <TableHead>Writer address</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        [pdetailed.writer.address].map((setter, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index + 1}/`}</TableCell>
                                <TableCell>
                                    <Address address={setter} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
