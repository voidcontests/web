'use client';

import { useIsConnectionRestored, useTonWallet } from "@tonconnect/ui-react";
import { ContestDetailed, ProblemDetailed } from "@/api/dto/response";
import { ProblemView } from "@/components/sections/problem-view";
import ContentContainer from "@/components/content-container";
import { SolvedTag } from "@/components/solved-tag";
import { truncate_address } from "@/lib/strings";
import { authorized } from "@/api/core/instance";
import { useState, useEffect } from "react";
import { Link } from "@/components/ui/link";
import { useParams } from "next/navigation";
import { itoc } from '@/lib/utils';
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

export default function ProblemPage() {
    const [problem, setProblem] = useState<ProblemDetailed>();
    const [contest, setContest] = useState<ContestDetailed>();
    const { cid, pid } = useParams<{ cid: string, pid: string }>();
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [notFound, setNotFound] = useState(false);

    async function fetchContest() {
        try {
            const result = await API.getContestByID(cid);
            setContest(result);
        } catch (error) {
            toast.error("Sometihng went wrong");
            setContest(undefined);
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
        const { data, status } = await authorized.get(`/contests/${cid}/problems/${pid}`);

        switch (status) {
            case 200:
                setProblem(data);
                break;
            case 403:
            case 404:
                setNotFound(true);
                break;
            default:
                toast.error('Something went wrong'); // TODO: Render 500 page instead
                setNotFound(true);
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

    if (notFound) {
        return (
            <ContentContainer>
                <div className="py-4 px-6 rounded-lg bg-critical-subdued border border-critical text-critical-text">
                    Problem doesn't exists
                </div>
            </ContentContainer>
        );
    }

    if (problem === undefined) return (
        <div>Loading</div>
    );

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex flex-col">
                <div className="grid grid-cols-12 gap-5 mx-4">
                    <div className="col-span-9">
                        <ProblemView problem={problem} />
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
                                                        className={pid === problem.id.toString() ? 'text-bright-text font-semibold' : ''}
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
