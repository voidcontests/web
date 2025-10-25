'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle } from '@/ui/table';
import Difficulty from '@/components/difficulty';
import { Account, ContestDetailed } from '@/lib/models';
import { Link } from '@/ui/link';
import { capitalize } from '@/lib/strings';

export default function Problemset({ contest, account }: { contest: ContestDetailed, account: Account | null }) {
    const problemset = contest.problems;
    const started = new Date(contest.start_time) < new Date();

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
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Status</TableHead>
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
                                        started && (contest.is_participant || (account && contest.is_participant))
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
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
