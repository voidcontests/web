'use client';

import { ContestProblemDetailed, Submission } from "@/lib/models";
import { SubmissionReport } from "@/components/sections/submission-report";
import { CodeEditor } from "@/components/sections/code-editor";
import Preview from "@/components/sections/preview";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";
import { toast } from "@/components/toast";
import { TestCase } from "@/components/sections/test-case";
import { Separator } from "@/components/ui/separator";
import { getInitialCode } from "@/components/sections/editor/utils";
import { sleep } from "@/lib/utils";
import { Result, getSubmissionByID, submitSolution } from "@/lib/api";

const DEFAULT_LANGUAGE = "cpp";

export function ContestProblemView({ problem }: { problem: Promise<Result<ContestProblemDetailed>> }) {
    const result = use(problem);
    if (!result.ok) {
        throw new Error(`Fetch problem failed: ${result.error.message}`);
    }

    const pdetailed = result.data;

    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
    const [code, setCode] = useState(getInitialCode(DEFAULT_LANGUAGE));
    const [submission, setSubmission] = useState<Submission>();

    async function submit() {
        if (code.trim().length === 0) return;

        setSubmission(undefined);

        const result = await submitSolution(pdetailed.contest_id, pdetailed.charcode, code, language);

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
            <div className="flex justify-center items-center">
                <h1 className="text-foreground text-xl font-medium text-center">
                    {`${pdetailed.charcode}. ${pdetailed.title}`}
                </h1>
            </div>

            <Preview markdown={pdetailed.statement} />


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
                <Button onClick={submit} disabled={code.trim().length === 0}>
                    SUBMIT
                </Button>
                <SubmissionReport submission={submission} />
            </div>
        </div>
    );
}
