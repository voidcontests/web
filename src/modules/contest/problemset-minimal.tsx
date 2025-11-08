'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from '@/ui/table';
import SolvedStatus from '@/components/solved-status';
import { ContestDetailed, Entry } from '@/lib/models';
import { Link } from '@/ui/link';

export default function ProblemsetMinimal({ contest }: { contest: ContestDetailed }) {
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
                        <TableHead>Title</TableHead>
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
                                    <div className='flex flex-nowrap items-center pr-5'>
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
                                        <SolvedStatus className='ml-2' status={problem.status} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableCaption>
                    Return to <Link href={`/contests/${contest.id}`}>contest</Link>.
                </TableCaption>
            </Table>
        </TableContainer>
    );
}
