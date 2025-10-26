'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/ui/table';
import PaginationControls from '@/components/pagination-controls';
import TableTemplate from "@/components/templates/table";
import { ContestListItem } from '@/lib/models';
import { DateView } from '@/components/date';
import { useEffect, useState } from 'react';
import { toast } from '@/components/toast';
import { getAllContests } from '@/lib/api';
import { Link } from '@/ui/link';
import Duration from '@/components/duration';

const TITLE = 'PUBLIC CONTESTS';

export default function PublicContests() {
    const [contests, setContests] = useState<ContestListItem[]>([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    useEffect(() => {
        const load = async () => {
            const result = await getAllContests(offset, limit);
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
        <TableTemplate title={TITLE} caption='Loading...' />
    }

    return (
        <TableContainer>
            <TableTitle>
                {TITLE}
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
                                <Link href={`/contests/${contest.id}`}>
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
                                <Duration value={contest.duration_mins} as='minutes' full />
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
