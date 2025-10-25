'use client';

import { ContestProblemDetailed, Submission } from "@/lib/models";
import SubmissionReport from "@/modules/submission/report";
import CodeEditor from "@/modules/code-editor";
import { Button } from "@/ui/button";
import { useState } from "react";
import { toast } from "@/components/toast";
import TestCase from "@/modules/problem/test-case";
import { getInitialCode } from "@/modules/editor/utils";
import { sleep } from "@/lib/utils";
import { getSubmissionByID, submitSolution } from "@/lib/api";

const DEFAULT_LANGUAGE = "cpp";

export function SubmitView({ problem }: { problem: ContestProblemDetailed }) {
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const [code, setCode] = useState(getInitialCode(DEFAULT_LANGUAGE));
    const [submission, setSubmission] = useState<Submission>();

    async function submit() {
        if (code.trim().length === 0) return;

        setSubmission(undefined);

        const result = await submitSolution(problem.contest_id, problem.charcode, code, language);

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

        while (submission.status !== "success" && submission.status !== "failed") {
            await sleep(1000);
            const updated = await getSubmissionByID(submission.id);
            console.log(JSON.stringify(updated));
            if (!updated.ok) {
                toast({ title: 'Something went wrong while pulling submission. Try again later' });
                break;
            }
            submission = updated.data;
            setSubmission(submission);
        }
    }

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
                {problem.examples && problem.examples.length > 0 && (
                    <div className="flex flex-col gap-0">
                        <h3 className="font-medium text-lg">Examples</h3>
                        <div className="flex flex-col gap-3">
                            {problem.examples.map((example) => (
                                <TestCase key={example.input + example.output} tc={example} />
                            ))}
                        </div>
                    </div>
                )}
                <CodeEditor
                    code={code}
                    setCode={setCode}
                    language={language}
                    setLanguage={(value) => {
                        setLanguage(value);
                        setCode(getInitialCode(value));
                    }}
                />
                <Button onClick={submit} disabled={code.trim().length === 0}>
                    SUBMIT
                </Button>
                <SubmissionReport submission={submission} />
            </div>
        </div>
    );
}
