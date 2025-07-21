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
import { getAllContests } from '@/actions/contests';
import { ContestListItem } from '@/actions/models/response';
import { format_duration } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { DateView } from '@/components/date';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '../toast';

export default function PublicContests() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialOffset = parseInt(searchParams.get('offset') || '0', 10);
    const initialLimit = parseInt(searchParams.get('limit') || '10', 10);

    const [contests, setContests] = useState<ContestListItem[]>([]);
    const [offset, setOffset] = useState(initialOffset);
    const [total, setTotal] = useState(0);
    const limit = initialLimit;

    useEffect(() => {
        const load = async () => {
            const result = await getAllContests(offset, limit);
            if (result.ok) {
                setContests(result.data.items);
                setTotal(result.data.meta.total);
            } else {
                toast({ title: 'Failed to load contests', description: result.error.message });
            }
        };
        load();
    }, [offset, limit]);

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
                PUBLIC CONTESTS
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Host</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {contests.map((contest, index) => (
                        <TableRow key={index}>
                            <TableCell>{contest.id}</TableCell>
                            <TableCell>
                                <Link href={`/contest/${contest.id}`}>
                                    {contest.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                @{contest.creator.username}
                            </TableCell>
                            <TableCell>
                                <DateView date={contest.start_time} />
                            </TableCell>
                            <TableCell>
                                <DateView date={contest.end_time} />
                            </TableCell>
                            <TableCell>
                                {contest.duration_mins !== 0
                                    ? format_duration(contest.duration_mins)
                                    : '-'}
                            </TableCell>
                            <TableCell>{contest.participants}</TableCell>
                            <TableCell>{contest.max_entries || 'Not limited'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {
                    contests.length === 0
                        ? <TableCaption>No public contests</TableCaption>
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
