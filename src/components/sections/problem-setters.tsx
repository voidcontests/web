'use client';

import { ProblemDetailed } from "@/api/dto/response";
import { truncate_address } from "@/lib/strings";
import { use } from "react";
import { Link } from "@/components/ui/link";
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
                        <TableHead>Writer address</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        [pdetailed.writer.address].map((setter, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${index + 1}/`}</TableCell>
                                <TableCell>
                                    <Link href={`https://tonscan.org/address/${setter}`}>
                                        {truncate_address(setter, 8)}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}