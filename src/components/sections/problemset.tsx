'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from '@/components/ui/table';
import { DifficultyTag } from '@/components/difficulty-tag';
import { ContestDetailed } from '@/actions/models/response';
import { SolvedTag } from '@/components/solved-tag';
import { Link } from '@/components/ui/link';
import { capitalize } from '@/lib/strings';
import { use } from 'react';
import { useAccount } from '@/hooks/use-account';
import { Result } from '@/actions';

export function Problemset({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        throw new Error(`Fetch contest failed: ${result.error}`);
    }

    const cdetailed = result.data;
    const problemset = cdetailed.problems;
    const started = new Date(cdetailed.start_time) < new Date();

    const { account } = useAccount();

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
                                        started && (cdetailed.is_participant || (account && cdetailed.is_participant))
                                            ? <Link
                                                href={`/contest/${cdetailed.id}/problem/${problem.charcode}`}
                                                className='flex-1 truncate w-0 max-w-fit'
                                            >
                                                {problem.title}
                                            </Link>
                                            : <span>{problem.title}</span>
                                    }
                                </TableCell>
                                <TableCell>
                                    <DifficultyTag difficulty={problem.difficulty} />
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

export function ProblemsetMinimal({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        throw new Error(`Fetch contest failed: ${result.error}`);
    }

    const cdetailed = result.data;
    const problemset = cdetailed.problems;
    const started = new Date(cdetailed.start_time) < new Date();

    const { account } = useAccount();

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
                                            started && (cdetailed.is_participant || (account && cdetailed.is_participant))
                                                ? <Link
                                                    href={`/contest/${cdetailed.id}/problem/${problem.charcode}`}
                                                    className='flex-1 truncate w-0 max-w-fit'
                                                >
                                                    {problem.title}
                                                </Link>
                                                : <span>{problem.title}</span>
                                        }
                                        <SolvedTag className='ml-2' status={problem.status} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableCaption>
                    Return to <Link href={`/contest/${cdetailed.id}`}>contest</Link>.
                </TableCaption>
            </Table>
        </TableContainer>
    );
}
