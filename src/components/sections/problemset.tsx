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
import Difficulty from "../difficulty";

export default function Problemset({ contest, difficulties, currentProblem }: { contest: Promise<ContestDetailed>, difficulties?: boolean, currentProblem?: string | number }) {
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
                        <TableHead className={!difficulties ? 'hidden': ''}>
                            Difficulty
                        </TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        problemset.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {problem.charcode.toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    {
                                        started && (cdetailed.is_participant || (wallet && cdetailed.is_participant))
                                            ? <Link
                                                href={`/contest/${cdetailed.id}/problem/${problem.charcode}`}
                                                className={currentProblem?.toString() === problem.charcode ? 'text-foreground font-medium' : ''}
                                            >
                                                {problem.title}
                                            </Link>
                                            : <span>{problem.title}</span>
                                    }
                                    <SolvedTag className="ml-2" state={problem.status} />
                                </TableCell>
                                <TableCell className={!difficulties ? 'hidden' : ''}>
                                    <Difficulty difficulty={problem.difficulty} />
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
