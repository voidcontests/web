'use client';

import { ContestDetailed, ProblemDetailed } from "@/api/dto/response";
import { truncate_address } from "@/lib/strings";
import { use } from "react";
import { Link } from "@/components/ui/link";
import {
    TableContainer, TableHead, Table, TableBody,
    TableRow, TableCell, TableHeaderRow, TableHeaderCell,
} from "@/components/ui/table";

export default function Setters({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    const setters = Array.from(new Set(cdetailed.problems.map(problem => problem.writer.address)));

    return (
        <TableContainer>
            <TableHead>
                SETTERS
            </TableHead>
            <Table>
                <TableHeaderRow>
                    <TableRow>
                        <TableHeaderCell className='w-[15%]'>#</TableHeaderCell>
                        <TableHeaderCell>Writer address</TableHeaderCell>
                    </TableRow>
                </TableHeaderRow>
                <TableBody>
                    {
                        setters.map((setter, index) => (
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