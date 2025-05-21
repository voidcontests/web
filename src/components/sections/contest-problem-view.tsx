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
import { use, useEffect, useState } from "react";
import { toast } from "@/components/toast";
import { TestCase } from "@/components/sections/test-case";
import { Separator } from "@/components/ui/separator";
import { getInitialCode } from "@/components/sections/editor/utils";

const PREFERRED_LANGUAGE_KEY = "preferred-language";
const DEFAULT_LANGUAGE = "c";

export function ContestProblemView({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);

    const [answer, setAnswer] = useState('');

    const [language, setLanguage] = useState(() => {
        if (typeof window !== "undefined") {
            const preferred = localStorage.getItem(PREFERRED_LANGUAGE_KEY);
            return preferred ?? DEFAULT_LANGUAGE;
        }

        return DEFAULT_LANGUAGE;
    });
    const [code, setCode] = useState(getInitialCode(language));

    const [waiting, setWaiting] = useState(false);
    const [submission, setSubmission] = useState<SubmissionListItem>();

    useEffect(() => {
        localStorage.setItem(PREFERRED_LANGUAGE_KEY, language);
    }, [language]);

    async function submitAnswer() {
        if (answer.trim().length === 0) return;

        if (pdetailed.status === 'accepted') {
            toast({ title: "Solution for this problem already accepted" });
            return;
        }

        const { data, status } = await authorized.post(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`, { problem_kind: 'text_answer_problem', answer: answer });

        switch (status) {
            case 201:
                const verdict = data.verdict;
                if (verdict === 'ok') {
                    toast({ title: 'Correct! Answer accepted' });
                } else if (verdict === 'wrong_answer') {
                    toast({ title: 'Your answer is incorrect' });
                } else {
                    toast({ title: `Unknown verdict: ${verdict}` });
                }

                revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);

                break;
            case 429:
                toast({ title: `You are submitting too frequently. Wait for ${data.timeout}` });
                break;
            default:
                toast({ title: 'Something went wrong. Try again later' });
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

        const { data } = await authorized.post(`/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`, { problem_kind: 'coding_problem', code: code, language: language });

        revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);

        setSubmission(data);
        setWaiting(false);
    }

    return (
        <div className="flex flex-col gap-7">
            <div className="flex justify-center items-center">
                <h1 className="text-foreground text-xl font-medium text-center">
                    {`${pdetailed.charcode}. ${pdetailed.title}`}
                </h1>
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
                    {
                        (pdetailed.examples && pdetailed.examples.length !== 0) &&
                        <div className="flex flex-col gap-0">
                            <h3 className="font-medium text-lg">
                                Examples
                            </h3>
                            <div className="flex flex-col gap-3">
                                {
                                    pdetailed.examples.map((example) => (
                                        <TestCase tc={example} />
                                    ))
                                }
                            </div>
                        </div>
                    }
                    <Separator />
                    <CodeEditor code={code} setCode={setCode} language={language} setLanguage={(value) => setLanguage(value)} />
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
