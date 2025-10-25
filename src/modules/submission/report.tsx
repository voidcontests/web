import { CollapsibleField } from "@/components/collapsible-field";
import CodeBlock from "@/components/code-block";
import { Separator } from "@/ui/separator";
import { Skeleton } from "@/ui/skeleton";
import { Submission } from "@/lib/models";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const titles = {
    'judging': 'Judging...',
    'pending': 'In queue...',
    'wrong_answer': 'Wrong answer',
    'runtime_error': 'Runtime error',
    'presentation_error': 'Presentation error',
    'compilation_error': 'Compilation error',
    'time_limit_exceeded': 'Time limit exceeded',
    'memory_limit_exceeded': 'Memory limit exceeded'
};

export default function Report({ submission }: { submission?: Submission }) {
    if (!submission) return;

    if (submission.status === 'judging' || submission.status === 'pending') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin size-5 text-tertiary-foreground" />
                    <span className="text-lg text-tertiary-foreground">
                        {titles[submission.status]}
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

    if (submission.status === 'failed' || submission.verdict === 'internal_error') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <Title text='Something went wrong' variant="error" />
                </div>
                <Separator />
                <CollapsibleField
                    variant='error'
                    content="Something went wrong while executing your solution. We are trying to do our best, to fix this as soon as possible"
                />
            </div>
        );
    }

    if (submission.verdict === 'ok') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <Title text='Accepted' />
                    <TestStats passed={submission.testing_report?.passed_tests_count} total={submission.testing_report?.total_tests_count} />
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

    if (submission.verdict === 'wrong_answer' || submission.verdict === 'time_limit_exceeded' || submission.verdict === 'memory_limit_exceeded' || submission.verdict === 'compilation_error' || submission.verdict === 'runtime_error' || submission.verdict === 'presentation_error') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <Title text={titles[submission.verdict]} variant="error" />
                    <TestStats passed={submission.testing_report?.passed_tests_count} total={submission.testing_report?.total_tests_count} />
                </div>
                <Separator />
                <div className="flex flex-col gap-5">
                    {submission.verdict === 'compilation_error' && (
                        <CollapsibleField
                            variant='error'
                            content={submission.testing_report?.stderr}
                        />
                    )}

                    {submission.verdict === 'runtime_error' && (
                        <>
                            {!submission.testing_report?.stderr?.trim() ? (
                                <CollapsibleField
                                    variant='error'
                                    content='Exited with non-zero exit code'
                                />
                            ) : (
                                <CollapsibleField
                                    content={submission.testing_report?.stderr}
                                    variant='error'
                                />
                            )}
                        </>
                    )}

                    {(submission.verdict === 'runtime_error' || submission.verdict === 'wrong_answer' || submission.verdict === 'time_limit_exceeded' || submission.verdict === 'memory_limit_exceeded' || submission.verdict === 'presentation_error') && (
                        <TestCaseOutputs
                            input={submission.testing_report?.failed_test?.input}
                            actual={submission.testing_report?.failed_test?.actual_output}
                            expected={submission.testing_report?.failed_test?.expected_output}
                        />
                    )}
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
            <CollapsibleField label="input" content={input} />
            <CollapsibleField label="stdout" content={actual} />
            <CollapsibleField label="expected output" content={expected} />
        </div>
    );
}
