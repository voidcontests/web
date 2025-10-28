'use client';

import { useEffect } from 'react';
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
import { ID } from '@/lib/api';
import PaginationControls from '@/components/pagination-controls';
import { useSubmissionsStore } from '@/stores/submissions';

export default function SubmissionHistory({ contestID, charcode }: { contestID: ID, charcode: string }) {
    const { submissions, offset, total, limit, setContext, setOffset, refetchHistory } = useSubmissionsStore();

    useEffect(() => {
        setContext(contestID, charcode);
        refetchHistory();
    }, [contestID, charcode, setContext, refetchHistory]);

    useEffect(() => {
        refetchHistory();
    }, [offset, refetchHistory]);

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
