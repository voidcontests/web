'use client';

import { ProblemDetailed, Submission } from "@/actions/models/response";
import { SubmissionReport } from "@/components/sections/submission-report";
import { CodeEditor } from "@/components/sections/code-editor";
import Preview from "@/components/sections/preview";
import { authorized } from "@/api/core/instance";
import { Button } from "@/components/ui/button";
import { revalidate } from "@/actions/revalidate";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { toast } from "@/components/toast";
import { TestCase } from "@/components/sections/test-case";
import { Separator } from "@/components/ui/separator";
import { getInitialCode } from "@/components/sections/editor/utils";
import { sleep } from "@/lib/utils";

const DEFAULT_LANGUAGE = "c";

export function ContestProblemView({ problem }: { problem: Promise<ProblemDetailed> }) {
    const pdetailed = use(problem);

    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const [code, setCode] = useState(getInitialCode(DEFAULT_LANGUAGE));
    const [submission, setSubmission] = useState<Submission>();
    const [answer, setAnswer] = useState('');

    async function submitAnswer() {
        if (answer.trim().length === 0) return;

        if (pdetailed.status === 'accepted') {
            toast({ title: "Solution for this problem already accepted" });
            return;
        }

        const { data, status } = await authorized.post(
            `/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`,
            {
                problem_kind: 'text_answer_problem',
                answer,
            }
        );

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

        setSubmission(undefined);

        const { data } = await authorized.post(
            `/contests/${pdetailed.contest_id}/problems/${pdetailed.charcode}/submissions`,
            {
                problem_kind: "coding_problem",
                code,
                language,
            }
        );

        const submissionID = data.id;
        let currentSubmission = data;

        setSubmission(currentSubmission);

        while (
            currentSubmission.verdict === "pending" ||
            currentSubmission.verdict === "running"
        ) {
            await sleep(1000);
            const { data: updated } = await authorized.get(`/submissions/${submissionID}`);
            currentSubmission = updated;
            setSubmission(currentSubmission);
        }

        revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);
    }

    return (
        <div className="flex flex-col gap-7">
            <div className="flex justify-center items-center">
                <h1 className="text-foreground text-xl font-medium text-center">
                    {`${pdetailed.charcode}. ${pdetailed.title}`}
                </h1>
            </div>

            <Preview markdown={pdetailed.statement} />

            {pdetailed.kind === 'text_answer_problem' && (
                <div className="flex items-center gap-4">
                    <span className="shrink-0 text-sm font-semibold">Answer:</span>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submitAnswer();
                        }}
                    />
                    <Button onClick={submitAnswer} disabled={answer.trim().length === 0}>SUBMIT</Button>
                </div>
            )}

            {pdetailed.kind === 'coding_problem' && (
                <div className="flex flex-col gap-4">
                    {pdetailed.examples && pdetailed.examples.length > 0 && (
                        <div className="flex flex-col gap-0">
                            <h3 className="font-medium text-lg">Examples</h3>
                            <div className="flex flex-col gap-3">
                                {pdetailed.examples.map((example) => (
                                    <TestCase key={example.input + example.output} tc={example} />
                                ))}
                            </div>
                        </div>
                    )}
                    <Separator />
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={(value) => {
                            setLanguage(value);
                            setCode(getInitialCode(value));
                        }}
                    />
                    <Button onClick={submitProgram} disabled={code.trim().length === 0}>
                        SUBMIT
                    </Button>
                    <SubmissionReport submission={submission} />
                </div>
            )}
        </div>
    );
}
