import { useState, useEffect, forwardRef, TextareaHTMLAttributes, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import Editor from "./editor";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

function getInitialCode(language: string): string {
    switch (language) {
        case 'c':
            return `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d", a + b);
}`;
        case 'python':
            return `a = int(input())
b = int(input())

print(sum(a, b))`;
    }

    return '';
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(({ code, setCode, language, setLanguage, className, ...props }, ref) => {
        const [inner, setInner] = useState<string>(code);

        useEffect(() => {
            setInner(code);
        }, [code]);

        useEffect(() => {
            setCode(inner);
        }, [inner, setCode]);

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            const val = e.target.value;
            setInner(val);
        };

        return (
            <div className='border rounded-xl bg-surface overflow-hidden pb-3 not-dark:shadow-md'>
                <div className="bg-surface-secondary border-b px-5 py-2 flex flex-row items-center justify-between gap-2">
                    {/* <Terminal className="size-5" /> */}
                    <span className="text-sm font-medium text-foreground">CODE EDITOR</span>
                    <Select value={language} onValueChange={(value: string) => {
                            setLanguage(value);
                            setInner(getInitialCode(value));
                    }}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Choose one" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="c">C</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Editor
                    language={language}
                    value={inner}
                    onChange={handleChange}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
CodeEditor.displayName = "CodeEditor";

export { CodeEditor };
