'use client';

import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import { itoc } from '@/lib/utils';
import {
    TableContainer, TableHead, Table, TableBody,
    TableRow, TableCell, TableHeaderRow, TableHeaderCell,
} from "@/components/ui/table";
import { ContestDetailed, ProblemListItem } from "@/api/dto/response";
import { use } from "react";
import { Tag } from "../ui/tag";
import { capitalize } from "@/lib/strings";
import { useTonWallet } from "@tonconnect/ui-react";

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
}

export default function Problemset({ contest, difficulties }: { contest: Promise<ContestDetailed>, difficulties?: boolean }) {
    const cdetailed = use(contest);
    const problemset = cdetailed.problems;

    const wallet = useTonWallet();

    return (
        <TableContainer>
            <TableHead>
                PROBLEMSET
            </TableHead>
            <Table>
                <TableHeaderRow>
                    <TableRow>
                        <TableHeaderCell className='w-[41px]'>#</TableHeaderCell>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell className={!difficulties ? 'hidden' : ''}>Difficulty</TableHeaderCell>
                    </TableRow>
                </TableHeaderRow>
                <TableBody>
                    {
                        problemset.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {itoc(index)}
                                </TableCell>
                                <TableCell>
                                    {
                                        wallet || cdetailed.is_participant
                                            ? <Link
                                                href={`/contests/${problem.contest_id}/problems/${problem.id}`}
                                            /* className={pid === problem.id.toString() ? 'text-bright-text font-semibold' : ''} */
                                            >
                                                {problem.title}
                                            </Link>
                                            : <span>{problem.title}</span>
                                    }
                                    <SolvedTag className="ml-2" state={problem.status} />
                                </TableCell>
                                <TableCell className={!difficulties ? 'hidden' : ''}>
                                    <Tag variant={difficultyToBadgeType[problem.difficulty]}>{capitalize(problem.difficulty)}</Tag>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}