import { useState, useEffect, forwardRef, TextareaHTMLAttributes, ChangeEvent } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    code: string;
    setCode: (code: string) => void;
}

const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(({ code, setCode, className, ...props }, ref) => {
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
            <div className='border rounded-xl bg-surface overflow-hidden pb-3'>
                <div className="bg-surface-secondary border-b px-5 py-2 flex flex-row items-center gap-2">
                    {/* <Terminal className="size-5" /> */}
                    <span className="text-sm font-medium text-foreground">CODE EDITOR</span>
                </div>
                <textarea
                    className={cn('px-5 pt-3 font-mono h-96 w-full resize-none ring-0 outline-0', className)}
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
