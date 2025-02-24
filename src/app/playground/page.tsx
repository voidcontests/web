'use client';
import { execute, ExecutionResult } from "@/actions/actions";
import ContentContainer from "@/components/content-container";
import Editor from "@/components/sections/editor";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

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
                    ? <div className="flex gap-2 items-center text-base"><LoaderCircle className="size-5 animate-spin" /> Executing...</div>
                    : <div>
                        {
                            result &&
                            <div className="font-mono flex flex-col">
                                <span>{`exit_code: ${result.status}`}</span>
                                {
                                    result.stdout &&
                                    <span>{`stdout: ${result.stdout}`}</span>
                                }
                                {
                                    result.stderr &&
                                    <span className="text-red-500/80">{`stderr: ${result.stderr}`}</span>
                                }
                            </div>
                        }
                    </div>
            }
            <div>
            </div>
        </ContentContainer>
    );
}
