"use client";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
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
import Timer from '@/components/timer';
import { ContestDetailedResponse } from "@/api/dto/dto";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as Api from '@/api';
import { toast } from "sonner";
import { format_duration, itoc } from "@/lib/utils";
import { capitalize } from "@/lib/strings";
import { format_date } from '@/lib/utils';
import {
    Widget,
    WidgetContent,
    WidgetTitle,
    WidgetFooter,
} from "@/components/ui/widget";
import Preview from "@/components/preview";

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red' | 'secondary';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
    'beginner': 'secondary',
}

export default function ContestPage() {
    const { id } = useParams();

    const [contest, setContest] = useState<ContestDetailedResponse>();

    useEffect(() => {
        async function fetchContests() {
            try {
                const result = await Api.contests.getByID(id?.toString() ?? '');
                setContest(result);
            } catch (error) {
                console.error("Error fetching contests:", error);
                toast.error("Sometihng went wrong");
                setContest(undefined);
            }
        }

        fetchContests();
    }, []);

    if (contest === undefined) return (
        <div>Loading data</div>
    );

    const setters = Array.from(new Set(contest.problemset.map(problem => problem.writer_address)));

    return (
        <div className="flex justify-center">
            <div className="w-[1200px] flex flex-col">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-9 flex flex-col gap-[20px]">
                        <div className="flex flex-col">
                            <h1 className="text-text-bright text-[32px] font-medium">
                                {contest.title}
                            </h1>
                            <Preview markdown={contest.description} />
                        </div>
                        <TableContainer>
                            <TableHead>
                                PROBLEMSET
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                                        <TableHeaderCell className='w-[70%]'>Title</TableHeaderCell>
                                        <TableHeaderCell className='w-[25%]'>Difficulty</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        contest.problemset.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{itoc(index)}</TableCell>
                                                <TableCell>
                                                    <Link href={`/contests/${contest.id}/problem/${itoc(index)}`}>
                                                        {problem.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={difficultyToBadgeType[problem.difficulty]}>{capitalize(problem.difficulty)}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-[20px]">
                            <Widget className="flex-1">
                                <WidgetContent>
                                    <WidgetTitle className="text-text-bright">
                                        ABOUT
                                    </WidgetTitle>
                                    <div className="flex">
                                        <div className="flex-1 text-text-secondary">
                                            Start
                                        </div>
                                        <div className="flex-1">
                                            {format_date(new Date(contest.starting_at))}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 text-text-secondary">
                                            Duration
                                        </div>
                                        <div className="flex-1">
                                            {format_duration(contest.duration_mins)}
                                        </div>
                                    </div>
                                </WidgetContent>
                            </Widget>
                            <TableContainer>
                                <TableHead>
                                    SETTERS
                                </TableHead>
                                <Table>
                                    <TableHeaderRow>
                                        <TableRow>
                                            <TableHeaderCell className='w-[15%]'>#</TableHeaderCell>
                                            <TableHeaderCell>Writer</TableHeaderCell>
                                        </TableRow>
                                    </TableHeaderRow>
                                    <TableBody>
                                        {
                                            setters.map((setter, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{`${index + 1}/`}</TableCell>
                                                    <TableCell>
                                                        <Link href={`https://tonscan.org/address/${setter}`}>
                                                            address
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
                <div className="flex flex-col items-center mt-[50px]">
                    <Timer target={new Date(contest.starting_at)} />
                </div>
            </div>
        </div>
    );
}