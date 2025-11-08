'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle } from '@/ui/table';
import Difficulty from '@/components/difficulty';
import { ContestDetailed, Entry } from '@/lib/models';
import { Link } from '@/ui/link';
import { capitalize } from '@/lib/strings';
import TimeLimit from '@/modules/problem/time-limit';
import MemoryLimit from '@/modules/problem/memory-limit';

export default function Problemset({ contest }: { contest: ContestDetailed }) {
    const problemset = contest.problems;
    const started = new Date(contest.start_time) < new Date();
    const is_admitted = contest.entry?.is_admitted === true;

    return (
        <TableContainer>
            <TableTitle>
                PROBLEMSET
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>#</TableHead>
                        <TableHead className='min-w-40'>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time limit</TableHead>
                        <TableHead>Memory limit</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        problemset.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {problem.charcode?.toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    {
                                        started && is_admitted
                                            ? <Link
                                                href={`/contests/${contest.id}/problems/${problem.charcode}`}
                                                className='flex-1 truncate w-0 max-w-fit'
                                            >
                                                {problem.title}
                                            </Link>
                                            : <span>{problem.title}</span>
                                    }
                                </TableCell>
                                <TableCell>
                                    <Difficulty difficulty={problem.difficulty} />
                                </TableCell>
                                <TableCell>
                                    {
                                        problem.status === undefined
                                            ? 'None'
                                            : capitalize(problem.status)
                                    }
                                </TableCell>
                                <TableCell>
                                    <TimeLimit ms={problem.time_limit_ms}  />
                                </TableCell>
                                <TableCell>
                                    <MemoryLimit mb={problem.memory_limit_mb} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
