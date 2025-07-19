'use client';

import { ContestProblemDetailed, Submission } from "@/actions/models/response";
import { SubmissionReport } from "@/components/sections/submission-report";
import { CodeEditor } from "@/components/sections/code-editor";
import Preview from "@/components/sections/preview";
import { Button } from "@/components/ui/button";
import { revalidate } from "@/actions/revalidate";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { toast } from "@/components/toast";
import { TestCase } from "@/components/sections/test-case";
import { Separator } from "@/components/ui/separator";
import { getInitialCode } from "@/components/sections/editor/utils";
import { sleep } from "@/lib/utils";
import { Result } from "@/actions";
import { getSubmissionByID, submitCodeSolution, submitTextAnswer } from "@/actions/problems";

const DEFAULT_LANGUAGE = "c";

export function ContestProblemView({ problem }: { problem: Promise<Result<ContestProblemDetailed>> }) {
    const result = use(problem);
    if (!result.ok) {
        throw new Error(`Fetch problem failed: ${result.error.message}`);
    }

    const pdetailed = result.data;

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

        const result = await submitTextAnswer(pdetailed.contest_id, pdetailed.charcode, answer);

        if (!result.ok) {
            if (result.status === 429) {
                if (!result.error.timeout) {
                    toast({ title: `You are submitting too frequently` });
                } else {
                    toast({ title: `You are submitting too frequently. Wait for ${result.error.timeout}` });
                }
            } else {
                toast({ title: 'Something went wrong. Try again later' });
            }
            return;
        }

        const verdict = result.data.verdict;
        switch (verdict) {
            case 'ok':
                toast({ title: 'Correct! Answer accepted' });
                break;
            case 'wrong_answer':
                toast({ title: 'Your answer is incorrect' });
                break;
            default:
                toast({ title: `Unknown verdict: ${verdict}` });
        }
        revalidate(`/contest/${pdetailed.contest_id}/problem/${pdetailed.charcode}`);
    }

    async function submitProgram() {
        console.log('sssss');
        if (code.trim().length === 0) return;

        setSubmission(undefined);

        const result = await submitCodeSolution(pdetailed.contest_id, pdetailed.charcode, code, language);

        if (!result.ok) {
            if (result.status === 429) {
                if (!result.error.timeout) {
                    toast({ title: `You are submitting too frequently` });
                } else {
                    toast({ title: `You are submitting too frequently. Wait for ${result.error.timeout}` });
                }
            } else {
                toast({ title: 'Something went wrong. Try again later' });
            }
            return;
        }

        let submission = result.data;
        setSubmission(submission);

        while (submission.verdict === "pending" || submission.verdict === "running") {
            await sleep(1000);
            const updated = await getSubmissionByID(submission.id);
            if (!updated.ok) {
                toast({ title: 'Something went wrong while pulling submission. Try again later' });
                break;
            }
            submission = updated.data;
            setSubmission(submission);
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
