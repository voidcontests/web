import { CodeBlock } from "@/components/sections/code-block";
import { SubmissionListItem } from "@/actions/dto/response";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/code";

export function SubmissionReport({ submission }: { submission?: SubmissionListItem }) {
    if (!submission) return;

    if (submission.verdict === 'wrong_answer') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-scarlet-500 font-medium">
                        WRONG ANSWER
                    </span>
                    <span className="text-sm text-tertiary-foreground">
                        Tests passed {submission.testing_report?.passed}/{submission.testing_report?.total}
                    </span>
                </div>
                <Separator />
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1 bg-surface-secondary p-3 rounded-xl not-dark:border border-border-secondary">
                        <span className="text-sm text-tertiary-foreground">
                            Input
                        </span>
                        <Code className="text-foreground">
                            {submission.testing_report?.failed_test?.input}
                        </Code>
                    </div>
                    <div className="flex flex-col gap-1 bg-surface-secondary p-3 rounded-xl not-dark:border border-border-secondary">
                        <span className="text-sm text-tertiary-foreground">
                            Stdout
                        </span>
                        <Code className="text-foreground">
                            {submission.testing_report?.failed_test?.actual_output}
                        </Code>
                    </div>
                    <div className="flex flex-col gap-1 bg-surface-secondary p-3 rounded-xl not-dark:border border-border-secondary">
                        <span className="text-sm text-tertiary-foreground">
                            Expected output
                        </span>
                        <Code className="text-foreground">
                            {submission.testing_report?.failed_test?.expected_output}
                        </Code>
                    </div>
                </div>
            </div>
        );
    }

    if (submission.verdict === 'ok') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-green-500 font-medium">
                        ACCEPTED
                    </span>
                    <span className="text-sm text-tertiary-foreground">
                        Tests passed {submission.testing_report?.passed}/{submission.testing_report?.total}
                    </span>
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">
                        Submitted solution
                    </span>
                    <CodeBlock code={submission.code ?? ''} language="c" />
                </div>
            </div>
        );
    }

    if (submission.verdict === 'runtime_error') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-scarlet-500 font-medium">
                        RUNTIME ERROR
                    </span>
                </div>
                <Separator />
                <div className="flex flex-col gap-1 bg-scarlet-500/10 py-3 px-4 rounded-xl not-dark:border border-border-secondary">
                    <Code className="text-scarlet-500">
                        {submission.testing_report?.stderr}
                    </Code>
                </div>
            </div>
        );
    }

    if (submission.verdict === 'compilation_error') {
        return (
            <div className="border bg-surface rounded-xl p-5 flex flex-col gap-5 not-dark:shadow-md">
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-scarlet-500 font-medium">
                        COMPILATION ERROR
                    </span>
                </div>
                <Separator />
                <div className="flex flex-col gap-1 bg-scarlet-500/10 py-3 px-4 rounded-xl not-dark:border border-border-secondary">
                    <Code className="text-scarlet-500">
                        {submission.testing_report?.stderr}
                    </Code>
                </div>
            </div>
        );
    }
}
