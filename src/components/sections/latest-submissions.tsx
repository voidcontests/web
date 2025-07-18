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
} from '@/components/ui/table';
import { DateView } from '@/components/date';
import { getProblemSubmissions } from '@/actions/problems';
import { ID } from '@/actions';
import { Submission } from '@/actions/models/response';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function LatestSubmissionsView({ contestID, charcode }: { contestID: ID, charcode: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialOffset = parseInt(searchParams.get('offset') || '0', 10);
    const initialLimit = parseInt(searchParams.get('limit') || '10', 10);

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [offset, setOffset] = useState(initialOffset);
    const [total, setTotal] = useState(0);
    const limit = initialLimit;

    useEffect(() => {
        const load = async () => {
            const result = await getProblemSubmissions(contestID, charcode, offset, limit);
            if (result.ok) {
                setSubmissions(result.data.items);
                setTotal(result.data.meta.total);
            } else {
                console.error(`Failed to fetch submissions: ${result.error.message}`);
            }
        };
        load();
    }, [contestID, charcode, offset, limit]);

    const updateQueryParams = (newOffset: number, newLimit: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('offset', String(newOffset));
        params.set('limit', String(newLimit));
        router.replace(`?${params.toString()}`);
    };

    const handlePrev = () => {
        const newOffset = Math.max(0, offset - limit);
        setOffset(newOffset);
        updateQueryParams(newOffset, limit);
    };

    const handleNext = () => {
        if (offset + limit < total) {
            const newOffset = offset + limit;
            setOffset(newOffset);
            updateQueryParams(newOffset, limit);
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
                            <div className="flex justify-between items-center px-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="min-w-0"
                                    onClick={handlePrev}
                                    disabled={offset === 0}
                                >
                                    <ArrowLeft /> Previous
                                </Button>
                                <span className="text-sm">
                                    Showing {offset + 1}–{Math.min(offset + limit, total)} of {total}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="min-w-0"
                                    onClick={handleNext}
                                    disabled={offset + limit >= total}
                                >
                                    Next <ArrowRight />
                                </Button>
                            </div>
                        </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
