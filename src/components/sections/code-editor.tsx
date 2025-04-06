import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect, forwardRef, TextareaHTMLAttributes, ChangeEvent } from "react";
import { getInitialCode } from "@/components/sections/editor/utils";
import Editor from "@/components/sections/editor";

interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(({ code, setCode, language, setLanguage, className, ...props }, ref) => {
        const [inner, setInner] = useState<string>(code);

        useEffect(() => setInner(code), [code]);
        useEffect(() => setCode(inner), [inner, setCode]);

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setInner(e.target.value);
        };

        return (
            <div className='border rounded-xl bg-surface overflow-hidden pb-3 not-dark:shadow-md'>
                <div className="bg-surface-secondary border-b px-5 py-2 flex flex-row items-center justify-between gap-2">
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
