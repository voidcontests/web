'use client';

import { capitalize, truncate_address } from "@/lib/strings";
import { ContestDetailed, ProblemDetailed } from "@/api/dto/response";
import { format_duration, itoc } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";
import { useParams } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import Preview from "@/components/preview";
import { format_date } from '@/lib/utils';
import Timer from '@/components/timer';
import { toast } from "sonner";
import * as API from '@/api';
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
} from "@/components/ui/table";
import {
    Widget,
    WidgetContent,
    WidgetTitle,
} from "@/components/ui/widget";
import { SolvedTag } from "@/components/solved-tag";
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red' | 'secondary';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
    'beginner': 'secondary',
}

export default function ProblemPage() {
    const [problem, setProblem] = useState<ProblemDetailed>();
    const [contest, setContest] = useState<ContestDetailed>();
    const { cid, pid } = useParams();
    const isConnectionRestored = useIsConnectionRestored();
    const [tonConnectUI] = useTonConnectUI();
    const [answer, setAnswer] = useState('');
    const wallet = useTonWallet();

    async function fetchContest() {
        try {
            const result = await API.contests.fetchByID(cid.toString());
            setContest(result);
        } catch (error) {
            toast.error("Sometihng went wrong");
            setContest(undefined);
        }
    }

    async function submitAnswer() {
        try {
            const result = await API.problems.submit(cid.toString(), pid.toString(), answer);

            if (!result) {
                toast.error("Something went wrong. Try later");
                return;
            }

            if (result.verdict === 'OK') {
                toast.success('Correct! Answer accepted');
                return;
            } else {
                toast.warning('Your answer is incorrect');
            }
        } catch (e) {
            toast.error("Something went wrong. Try later");
        }
    }

    // TODO: This guy dont reloading on wallet connect
    useEffect(() => {
        if (isConnectionRestored) {
            setTimeout(() => {
                fetchContest();
            }, 1);
        }
    }, [wallet, isConnectionRestored]);

    async function fetchProblem() {
        try {
            const result = await API.problems.getByID(cid.toString(), pid.toString());
            setProblem(result);
        } catch (error) {
            toast.error("Sometihng went wrong");
            setProblem(undefined);
        }
    }

    // TODO: This guy dont reloading on wallet connect
    useEffect(() => {
        if (isConnectionRestored) {
            setTimeout(() => {
                fetchProblem();
            }, 1);
        }
    }, [wallet, isConnectionRestored]);

    useEffect(() => {
        if (problem) {
            document.title = problem.title + ' :: VOID*';
        } else {
            document.title = 'Problem :: VOID*';
        }
    }, [problem]);

    if (problem === undefined) return (
        <div>Loading data</div>
    );

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex flex-col">
                <div className="flex justify-center items-end mx-4 mb-8">
                    <Link href={`/contests/${cid}`} size="large" className="flex-1">
                        BACK TO CONTEST
                    </Link>
                    <h1 className="text-bright-text text-xl font-medium">
                        {problem.title}
                    </h1>
                    <div className="flex-1"></div>
                </div>
                <div className="grid grid-cols-12 gap-5 mx-4">
                    <div className="col-span-9 flex flex-col gap-7">
                        <Preview markdown={problem.statement} />
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold">
                                Commit yout answer:
                            </span>
                            <Input
                                className="w-2/5"
                                placeholder="It's gonna be a correct one"
                                value={answer}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                            />
                            <Button onClick={submitAnswer}>SUBMIT</Button>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-5">
                        <TableContainer>
                            <TableHead>
                                PROBLEMSET
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                                        <TableHeaderCell className='w-[70%]'>Title</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        contest &&
                                        contest.problems.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {itoc(index)}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        href={`/contests/${contest.id}/problems/${problem.id}`}
                                                        className={pid.toString() === problem.id.toString() ? 'text-bright-text font-semibold' : ''}
                                                    >
                                                        {problem.title}
                                                    </Link>
                                                    {
                                                        <SolvedTag className="ml-2" state={problem.status} />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer>
                            <TableHead>
                                SETTERS
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className='w-[15%]'>#</TableHeaderCell>
                                        <TableHeaderCell>Writer address</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        [problem.writer.address].map((setter, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{`${index + 1}/`}</TableCell>
                                                <TableCell>
                                                    <Link href={`https://tonscan.org/address/${setter}`}>
                                                        {truncate_address(setter)}
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
