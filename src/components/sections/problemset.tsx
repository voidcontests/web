'use client';

import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import { itoc } from '@/lib/utils';
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle
} from "@/components/ui/table";
import { ContestDetailed, ProblemListItem } from "@/api/dto/response";
import { use } from "react";
import { Tag } from "@/components/ui/tag";
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

export default function Problemset({ contest, difficulties, currentProblemID }: { contest: Promise<ContestDetailed>, difficulties?: boolean, currentProblemID?: string | number }) {
    const cdetailed = use(contest);
    const problemset = cdetailed.problems;
    const started = new Date(cdetailed.start_time) < new Date();

    const wallet = useTonWallet();

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
                        <TableHead className={!difficulties ? 'hidden' : ''}>
                            Difficulty
                        </TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        problemset.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {itoc(index)}
                                </TableCell>
                                <TableCell>
                                    {
                                        started && (cdetailed.is_participant || (wallet && cdetailed.is_participant))
                                            ? <Link
                                                href={`/contest/${problem.contest_id}/problem/${problem.id}`}
                                                className={currentProblemID?.toString() === problem.id.toString() ? 'text-foreground' : ''}
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
                {/* <TableCaption>
                    Hello
                </TableCaption> */}
            </Table>
        </TableContainer>
    );
}
