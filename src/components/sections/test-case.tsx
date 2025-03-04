'use client';

import { Code } from "@/components/code";
import { Copy } from "@/components/copy";

export function TestCase({ tc }: { tc: { input: string, output: string }}) {
    return (
        <div className="bg-surface rounded-xl overflow-hidden border">
            <div className="bg-surface-secondary px-3 py-1.5 border-b flex justify-between">
                <span className="text-tertiary-foreground">
                    Input
                </span>
                <Copy data={tc.input} />
            </div>
            <div className="px-3 py-1.5">
                <Code>{tc.input}</Code>
            </div>
            <div className="bg-surface-secondary text-tertiary-foreground px-3 py-1.5 border-t border-b flex justify-between">
                <span className="text-tertiary-foreground">
                    Output
                </span>
                <Copy data={tc.output} />
            </div>
            <div className="px-3 py-1.5">
                <Code>{tc.output}</Code>
            </div>
        </div>
    );
}
