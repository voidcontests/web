'use client';

import { ProblemDetailed, SubmissionListItem } from "@/actions/dto/response";
import { SubmissionReport } from "@/components/sections/submission-report";
import { Widget, WidgetContent, WidgetTitle } from "@/components/ui/widget";
import { CodeEditor } from "@/components/sections/code-editor";
import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/components/sections/preview";
import { authorized } from "@/api/core/instance";
import { Button } from "@/components/ui/button";
import { revalidate } from "@/actions/actions";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { use, useState } from "react";
import { toast } from "sonner";

const DEFAULT_CODE = `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
}`;

export default function ProblemView({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);
    const [answer, setAnswer] = useState('');

    const [code, setCode] = useState(DEFAULT_CODE);
    const [waiting, setWaiting] = useState(false);
    const [submission, setSubmission] = useState<SubmissionListItem>();

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

                revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);

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

        const { data } = await authorized.post(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`, { problem_kind: 'coding_problem', code: code });

        revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);

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
                    {`${pdetailed.charcode}. ${pdetailed.title}`}
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
                <div className="flex flex-col gap-4">
                    <CodeEditor code={code} setCode={setCode} />
                    <Button onClick={submitProgram} disabled={code.trim().length === 0}>
                        SUBMIT
                    </Button>
                    {
                        waiting
                            ? <Loading />
                            : <SubmissionReport submission={submission} />
                    }
                </div>
            }
        </div>
    );
}

function Loading() {
    return (
        <Widget>
            <WidgetContent className="gap-4">
                <WidgetTitle>
                    <Skeleton className="h-4 w-24" />
                </WidgetTitle>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-96" />
                    <Skeleton className="h-4 w-72" />
                </div>
            </WidgetContent>
        </Widget>
    );
}
