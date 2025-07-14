'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/components/ui/table';
import { ProblemDetailed, Submission, SubmissionsList } from "@/actions/dto/response";
import { SubmissionReport } from "@/components/sections/submission-report";
import { CodeEditor } from "@/components/sections/code-editor";
import Preview from "@/components/sections/preview";
import { authorized } from "@/api/core/instance";
import { Button } from "@/components/ui/button";
import { revalidate } from "@/actions";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { toast } from "@/components/toast";
import { TestCase } from "@/components/sections/test-case";
import { Separator } from "@/components/ui/separator";
import { getInitialCode } from "@/components/sections/editor/utils";
import { sleep } from "@/lib/utils";
import { DateView } from '../date';

export function LatestSubmissionsView({ submissions }: { submissions: Promise<SubmissionsList> }) {
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
                        subs.data.map((submission, index) => (
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
                    subs.data.length === 0 && <TableCaption>No recent submissions</TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
