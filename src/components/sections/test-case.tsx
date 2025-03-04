import { Code } from "@/components/code";

export function TestCase({ tc }: { tc: { input: string, output: string }}) {
    return (
        <div className="bg-surface rounded-xl overflow-hidden border">
            <div className="bg-surface-secondary text-tertiary-foreground px-3 py-2 border-b">
                Input
            </div>
            <div className="p-3">
                <Code>{tc.input}</Code>
            </div>
            <div className="bg-surface-secondary text-tertiary-foreground px-3 py-2 border-t border-b">
                Output
            </div>
            <div className="p-3">
                <Code>{tc.output}</Code>
            </div>
        </div>
    );
}
