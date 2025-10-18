import { CodeBlock } from "@/components/sections/code-block";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Submission } from "@/lib/models";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Code } from "@/components/code";

const titles = {
    'running': 'Running...',
    'pending': 'In queue...',
    'wrong_answer': 'Wrong answer',
    'ok': 'Accepted',
    'runtime_error': 'Runtime error',
    'compilation_error': 'Compilation error',
    'time_limit_exceeded': 'Time limit exceeded',
};

export function SubmissionReport({ submission }: { submission?: Submission }) {
    if (!submission) return;

    if (submission.verdict === 'running' || submission.verdict === 'pending') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin size-5 text-tertiary-foreground" />
                    <span className="text-lg text-tertiary-foreground">
                        {titles[submission.verdict]}
                    </span>
                </div>
                <Separator />
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-96" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                </div>
            </div>
        );
    }

    if (submission.verdict === 'ok') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <Title text={titles[submission.verdict]} />
                    <TestStats passed={submission.testing_report?.passed} total={submission.testing_report?.total} />
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">
                        Submitted solution
                    </span>
                    <CodeBlock code={submission.code ?? ''} language={submission.language ?? 'plaintext'} />
                </div>
            </div>
        );
    }

    if (submission.verdict === 'wrong_answer' || submission.verdict === 'time_limit_exceeded' || submission.verdict === 'compilation_error' || submission.verdict === 'runtime_error') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <Title text={titles[submission.verdict]} variant="error" />
                    <TestStats passed={submission.testing_report?.passed} total={submission.testing_report?.total} />
                </div>
                <Separator />
                <div className="flex flex-col gap-5">
                    {
                        submission.verdict === 'runtime_error' &&
                        <Field content='Exited with non-zero exit code' error />
                    }
                    {
                        submission.verdict === 'compilation_error'
                        ? <Field content={submission.testing_report?.stderr} error />
                        : <TestCaseOutputs
                            input={submission.testing_report?.failed_test?.input}
                            actual={submission.testing_report?.failed_test?.actual_output}
                            expected={submission.testing_report?.failed_test?.expected_output}
                        />
                    }
                </div>
            </div>
        );
    }
}

function Title({ text, variant = 'success' }: { text: string, variant?: 'success' | 'error' }) {
    return (
        <span className={cn(
            "text-lg font-medium",
            variant === 'error' ? "text-scarlet-500" : "text-green-500"
        )}>
            {text}
        </span>
    );
}

function Field({ label, content, error }: { label?: string, content?: string, error?: boolean }) {
    if (!content || content.trim().length === 0) return;

    if (error) {
        return (
            <div className="flex flex-col gap-1 bg-scarlet-500/10 py-3 px-4 rounded-xl not-dark:border border-border-secondary">
                <Code className="text-scarlet-500">
                    {content}
                </Code>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 bg-surface-secondary p-3 rounded-xl not-dark:border border-border-secondary">
            {
                label &&
                <span className="text-sm text-tertiary-foreground">
                    {label}
                </span>
            }
            <Code className="text-foreground">
                {content}
            </Code>
        </div>
    );
}

function TestStats({ passed, total }: { passed?: number, total?: number }) {
    if (passed === undefined || total  === undefined) return;

    return (
        <span className="text-sm text-tertiary-foreground">
            Tests passed {passed}/{total}
        </span>
    );
}

function TestCaseOutputs({ input, actual, expected }: { input?: string, actual?: string, expected?: string }) {
    return (
        <div className="flex flex-col gap-5">
            <Field label="Input" content={input} />
            <Field label="Stdout" content={actual} />
            <Field label="Expected output" content={expected} />
        </div>
    );
}
