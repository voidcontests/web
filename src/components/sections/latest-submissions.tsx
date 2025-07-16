'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/components/ui/table';
import { Pagination, Submission } from "@/actions/models/response";
import { use } from "react";
import { DateView } from '@/components/date';

export function LatestSubmissionsView({ submissions }: { submissions: Promise<Pagination<Submission>> }) {
    const subs = use(submissions) || [];

    return (
        <TableContainer>
            <TableTitle>
                LATEST SUBMISSIONS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Verdict</TableHead>
                        <TableHead>Submitted at</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        subs.items.map((submission, index) => (
                            <TableRow key={index}>
                                <TableCell>{submission.id}</TableCell>
                                <TableCell>{submission.verdict}</TableCell>
                                <TableCell>
                                    <DateView date={submission.created_at} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    subs.items.length === 0 && <TableCaption>No recent submissions</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
