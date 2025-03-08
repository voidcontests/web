'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/components/ui/table";
import { DifficultyTag } from "@/components/difficulty-tag";
import { ContestDetailed } from "@/actions/dto/response";
import { useTonWallet } from "@tonconnect/ui-react";
import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import { use } from "react";

export default function Problemset({ contest, difficulties, contestLink }: { contest: Promise<ContestDetailed>, difficulties?: boolean, contestLink?: boolean }) {
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
                                    {problem.charcode?.toUpperCase()}
                                </TableCell>
                                <TableCell className="flex flex-nowrap items-center pr-5">
                                    {
                                        started && (cdetailed.is_participant || (wallet && cdetailed.is_participant))
                                            ? <Link
                                                href={`/contest/${cdetailed.id}/problem/${problem.charcode}`}
                                                className="flex-1 truncate w-0 max-w-fit"
                                            >
                                                {problem.title}
                                            </Link>
                                            : <span>{problem.title}</span>
                                    }
                                    <SolvedTag className="ml-2" state={problem.status} />
                                </TableCell>
                                <TableCell className={!difficulties ? 'hidden' : ''}>
                                    <DifficultyTag difficulty={problem.difficulty} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    contestLink &&
                    <TableCaption>
                        Return to <Link href={`/contest/${cdetailed.id}`}>contest</Link>.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
