'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import { ProblemListItem } from '@/lib/models';
import Difficulty from '@/components/difficulty';
import { DateView } from "@/components/date";
import { Link } from "@/ui/link";
import { useEffect, useState } from 'react';
import { getCreatedProblems } from "@/lib/api";
import PaginationControls from "@/components/pagination-controls";
import { toast } from "@/components/toast";
import TableTemplate from "@/components/templates/table";
import TimeLimit from "@/modules/problem/time-limit";
import MemoryLimit from "@/modules/problem/memory-limit";

export default function CreatedProblems() {
    const [problems, setProblems] = useState<ProblemListItem[]>([]);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    useEffect(() => {
        const load = async () => {
            const result = await getCreatedProblems(offset, limit);
            if (result.ok) {
                setProblems(result.data.items);
                setTotal(result.data.meta.total);
            } else {
                toast({ title: 'Failed to load problems', description: result.error.message });
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
            <TableTemplate title='CONTESTS' caption='Loading...' />
        );
    }

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                {/* TODO: hide new button if banned or user already created maximum contests */}
                <span>PROBLEMS</span>
                <Link href='/hub/new/problem' size="large">NEW</Link>
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Time limit</TableHead>
                        <TableHead>Memory limit</TableHead>
                        <TableHead className='w-3xs'>Created at</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        problems.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center'>
                                    {index}/
                                </TableCell>
                                <TableCell>
                                    <Link href={`/hub/preview/problems/${problem.id}`}>
                                        {problem.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Difficulty difficulty={problem.difficulty} />
                                </TableCell>
                                <TableCell>
                                    <TimeLimit ms={problem.time_limit_ms}  />
                                </TableCell>
                                <TableCell>
                                    <MemoryLimit mb={problem.memory_limit_mb} />
                                </TableCell>
                                <TableCell className='w-3xs'>
                                    <DateView date={problem.created_at} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    problems.length === 0
                        ? <TableCaption>No created problems.</TableCaption>
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
