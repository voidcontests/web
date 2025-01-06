import { Heading, Bold, Italic, Code, Link2, ListCollapse, TextQuote } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Kind = 'bold' | 'italic' | 'code' | 'heading';

const ktoch = {
    'bold': '**',
    'italic': '*',
    'code': '`',
    'heading': '### ',
}

const insert = (s: string, sub: string, idx: number): string => s.slice(0, idx) + sub + s.slice(idx);

const getLineStartIndex = (text: string, index: number): number => {
    const lines = text.split('\n');

    let cur = 0;

    for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + 1;

        if (cur + lineLength > index) {
            return cur;
        }

        cur += lineLength;
    }

    return -1;
}

const Editor = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ value, onChange, className, children, ...props }) => {
    const [internalValue, setInternalValue] = useState(value);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        if (onChange) onChange(e);
    };

    const apply = (change: Kind) => {
        if (textAreaRef.current) {
            let sstart = textAreaRef.current.selectionStart;
            let send = textAreaRef.current.selectionEnd;

            let tosstart = 0, tosend = 0;

            let updated: string = internalValue?.toString() ?? '';
            let chars = ktoch[change];
            if (['bold', 'italic', 'code'].includes(change)) {
                if (sstart === send) return;

                updated = insert(updated, chars, sstart);
                updated = insert(updated, chars, send + chars.length);

                tosstart += chars.length;
                tosend += chars.length;
            }
            if (change === 'heading') {
                let linestart = getLineStartIndex(updated, sstart);
                if (linestart === -1) return;

                updated = insert(updated, chars, linestart);

                tosstart += chars.length;
                tosend += chars.length;
            }

            setInternalValue(updated);
            setTimeout(() => {
                textAreaRef.current?.focus();
                textAreaRef.current?.setSelectionRange(tosstart, tosend);
            }, 0);
            // NOTE: without timeout selection  doesn't select AT ALL.
        }
    }

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
                <h1 className="text-text text-lg font-medium">
                    {children}
                </h1>
                <div className="flex gap-[5px]">
                    <Button variant='ghost' size='icon' onClick={() => apply('heading')}>
                        <Heading />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => apply('bold')}>
                        <Bold />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => apply('italic')}>
                        <Italic />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => apply('code')}>
                        <Code />
                    </Button>
                    <Button variant='ghost' size='icon' disabled>
                        <Link2 />
                    </Button>
                    <Button variant='ghost' size='icon' disabled>
                        <ListCollapse />
                    </Button>
                    <Button variant='ghost' size='icon' disabled>
                        <TextQuote />
                    </Button>
                </div>
            </div>
            <TextArea
                className={className}
                value={internalValue}
                placeholder="Write a description for your contest here"
                onChange={handleChange}
                ref={textAreaRef}
                {...props}
            />
        </div>
    )
});

export default Editor;