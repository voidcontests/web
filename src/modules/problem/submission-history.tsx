'use client';

import { useEffect, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHeader,
    TableHeaderRow,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCaption,
    TableTitle,
} from '@/ui/table';
import { DateView } from '@/components/date';
import { getProblemSubmissions, ID } from '@/lib/api';
import { Submission } from '@/lib/models';
import { toast } from '@/components/toast';
import PaginationControls from '@/components/pagination-controls';

export default function SubmissionHistory({ contestID, charcode }: { contestID: ID, charcode: string }) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        const load = async () => {
            const result = await getProblemSubmissions(contestID, charcode, offset, limit);
            if (result.ok) {
                setSubmissions(result.data.items);
                setTotal(result.data.meta.total);
            } else {
                toast({ title: 'Failed to fetch submissions', description: result.error.message });
            }
        };
        load();
    }, [contestID, charcode, offset, limit]);

    const handlePrev = () => {
        const newOffset = Math.max(0, offset - limit);
        setOffset(newOffset);
    };

    const handleNext = () => {
        if (offset + limit < total) {
            const newOffset = offset + limit;
            setOffset(newOffset);
        }
    };

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
                    {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell>{submission.id}</TableCell>
                            <TableCell>{submission.verdict}</TableCell>
                            <TableCell>
                                <DateView date={submission.created_at} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {
                    submissions.length === 0
                        ? <TableCaption>No recent submissions</TableCaption>
                        : <TableCaption>
                            <PaginationControls
                                total={total}
                                limit={limit}
                                offset={offset}
                                onNext={handleNext}
                                onPrev={handlePrev}
                            />
                        </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
