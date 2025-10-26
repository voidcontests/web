'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import { ContestListItem } from '@/lib/models';
import Status from '@/modules/contest/status';
import { DateView } from "@/components/date";
import { Link } from "@/ui/link";
import { useEffect, useState } from 'react';
import { getCreatedContests } from "@/lib/api";
import PaginationControls from "@/components/pagination-controls";
import { toast } from "@/components/toast";
import TableTemplate from "@/components/templates/table";
import Duration from "@/components/duration";

export default function CreatedContests() {
    const [contests, setContests] = useState<ContestListItem[]>([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    useEffect(() => {
        const load = async () => {
            const result = await getCreatedContests(offset, limit);
            if (result.ok) {
                setContests(result.data.items);
                setTotal(result.data.meta.total);
            } else {
                toast({ title: 'Failed to load contests', description: result.error.message });
            }
            setLoading(false);
        };
        load();
    }, [offset, limit]);

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

    if (loading) {
        return (
            <TableTemplate title='CONTESTS' caption='Loading...'/>
        );
    }

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                {/* TODO: hide new button if banned or user already created maximum contests */}
                <span>CONTESTS</span>
                <Link href='/hub/new/contest' size="large">NEW</Link>
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Starting at</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Total slots</TableHead>
                        <TableHead>Leaderboard</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        contests.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center pr-5'>
                                    {index}/
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contests/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.start_time} />
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.end_time} />
                                </TableCell>
                                <TableCell>
                                    <Duration value={contest.duration_mins} as='minutes' full />
                                </TableCell>
                                <TableCell>
                                    {contest.participants}
                                </TableCell>
                                <TableCell>
                                    {contest.max_entries || 'Not limited'}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contests/${contest.id}/leaderboard`}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.created_at} />
                                </TableCell>
                                <TableCell>
                                    <Status contest={contest} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    contests.length === 0
                        ? <TableCaption>No created contests</TableCaption>
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
