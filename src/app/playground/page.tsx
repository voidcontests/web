'use client';
import { execute, ExecutionResult } from "@/actions/actions";
import { Code } from "@/components/code";
import ContentContainer from "@/components/content-container";
import Editor from "@/components/sections/editor";
import ExecutionReport from "@/components/sections/execution-report";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Widget, WidgetContent, WidgetTitle } from "@/components/ui/widget";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { forwardRef, useState } from "react";

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello world\\n");
    return 0;
}`;

export default function Page() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [waiting, setWaiting] = useState(false);
    const [result, setResult] = useState<ExecutionResult>();

    const onClick = async () => {
        setWaiting(true);
        setResult(undefined);

        const response = await execute(code);

        setResult(response);
        setWaiting(false);
    }

    return (
        <ContentContainer>
            <Editor markdown={code}  setMarkdown={setCode} required className="font-mono">
                Write C program
            </Editor>
            <Button onClick={onClick}>Execute</Button>
            {
                waiting
                    ? <Loading />
                    // ? <div className="flex gap-2 items-center text-base"><LoaderCircle className="size-5 animate-spin" /> Executing...</div>
                    : <ExecutionReport result={result} />
            }
            <div>
            </div>
        </ContentContainer>
    );
}

function Loading() {
    return (
        <Widget className="min-w-196 w-fit">
            <WidgetContent className="gap-3">
                <WidgetTitle>
                    <Skeleton className="h-4 w-24" />
                </WidgetTitle>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-96" />
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-80" />
                </div>
            </WidgetContent>
        </Widget>
    );
}
