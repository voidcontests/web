'use client';

import { ContestDetailed } from "@/api/dto/response";
import { use } from "react";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
} from "@/components/ui/table";
import Address from "@/components/address";

export default function Setters({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    const setters = Array.from(new Set(cdetailed.problems.map(problem => problem.writer.address)));

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
                        setters.map((setter, index) => (
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
        </TableContainer >
    );
}
