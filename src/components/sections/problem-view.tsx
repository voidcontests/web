'use client';

import { ProblemDetailed, SubmissionListItem } from "@/actions/dto/response";
import { authorized } from "@/api/core/instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import Preview from "@/components/sections/preview";
import { use, useState } from "react";
import { toast } from "sonner";
import { execute, ExecutionResult, revalidate } from "@/actions/actions";
import Editor from "./editor";
import { Widget, WidgetContent, WidgetTitle } from "../ui/widget";
import { Skeleton } from "../ui/skeleton";
import ExecutionReport from "./execution-report";
import {
    Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell
} from "@/components/ui/table-inline";
import DateView from "../date";
import { Verdict } from "../verdict";

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello world\\n");
    return 0;
}`;

export default function ProblemView({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);
    const [answer, setAnswer] = useState('');

    const [code, setCode] = useState(DEFAULT_CODE);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState<ExecutionResult>();
    const [submission, setSubmission] = useState<SubmissionListItem>();

    const [data, setData] = useState('');

    async function submitAnswer() {
        if (answer.trim().length === 0) return;

        if (pdetailed.status === 'accepted') {
            toast.info("Solution for this problem already accepted");
            return;
        }

        const { data, status } = await authorized.post(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`, { problem_kind: 'text_answer_problem', answer: answer });

        switch (status) {
            case 201:
                const verdict = data.verdict;
                if (verdict === 'ok') {
                    toast.success('Correct! Answer accepted');
                } else if (verdict === 'wrong_answer') {
                    toast.warning('Your answer is incorrect');
                } else {
                    toast.error(`Unknown verdict: ${verdict}`);
                }
                revalidate(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}`);
                break;
            case 429:
                toast.warning(`You are submitting too frequently. Wait for ${data.timeout}`);
                break;
            default:
                toast.error('Something went wrong. Try again later');
        }
    }

    async function submitProgram() {
        if (code.trim().length === 0) return;

        // if (pdetailed.status === 'accepted') {
        //     toast.info("Solution for this problem already accepted");
        //     return;
        // }

        setWaiting(true);
        setSubmission(undefined);

        const { data, status } = await authorized.post(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`, { problem_kind: 'coding_problem', code: code });

        setSubmission(data);
        setWaiting(false);
    }

    return (
        <div className="flex flex-col gap-7">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <Link href={`/contest/${pdetailed.contest_id}`} size="large">
                        BACK TO CONTEST
                    </Link>
                </div>
                <h1 className="text-foreground text-xl font-medium text-center">
                    {`${pdetailed.charcode} :: ${pdetailed.title}`}
                </h1>
                <div className="flex-1"></div>
            </div>
            <Preview markdown={pdetailed.statement} />
            {
                pdetailed.kind === 'text_answer_problem' &&
                <div className="flex items-center gap-4">
                    <span className="shrink-0 text-sm font-semibold">
                        Answer:
                    </span>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submitAnswer();
                        }}
                    />
                    <Button onClick={submitAnswer} disabled={answer.trim().length === 0}>SUBMIT</Button>
                </div>
            }
            {
                pdetailed.kind === 'coding_problem' &&
                <div>
                    <Editor markdown={code}  setMarkdown={setCode} required className="font-mono">
                        Write C program
                    </Editor>
                    <Button onClick={submitProgram} disabled={code.trim().length === 0}>SUBMIT</Button>
                </div>
            }
            {
                pdetailed.kind === 'coding_problem' && waiting
                    ? <Loading />
                    : <Report submission={submission} />
            }
        </div>
    );
}
function Loading() {
    return (
        <Widget className="min-w-196 w-fit">
            <WidgetContent className="gap-3">
                <WidgetTitle>
                    <Skeleton className="h-4 w-24" />
                </WidgetTitle>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-96" />
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-80" />
                </div>
            </WidgetContent>
        </Widget>
    );
}

function Report({ submission }: { submission?: SubmissionListItem }) {
    if (!submission) return;

    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
            <h1 className="text-foreground text-sm font-medium">
                SUBMISSION DETAILS
            </h1>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Verdict</TableHead>
                        <TableHead>Tests passed</TableHead>
                        <TableHead>Total tests</TableHead>
                        <TableHead>Submitted at</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {submission.id}
                        </TableCell>
                        <TableCell>
                            {submission.verdict}
                        </TableCell>
                        <TableCell>
                            {submission.testing_report?.passed}
                        </TableCell>
                        <TableCell>
                            {submission.testing_report?.total}
                        </TableCell>
                        <TableCell>
                            <DateView date={submission.created_at} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
