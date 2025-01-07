import { Heading, Bold, Italic, Code, Link2, TextQuote, List, ListOrdered, ListChecks } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

type StyleKind = 'bold' | 'italic' | 'code' | 'heading' | 'link' | 'quote';

const ktoch = {
    'bold': '**',
    'italic': '*',
    'code': '`',
    'heading': '### ',
    'quote': '> ',
}

const insert = (s: string, sub: string, idx: number): string => s.slice(0, idx) + sub + s.slice(idx);

const surround = (s: string, sub: string, begin: number, end: number): string => {
    s = insert(s, sub, begin);
    s = insert(s, sub, end + sub.length);

    return s;
}

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

    const moveCursor = (idx: number) => {
        setTimeout(() => {
            if (!textAreaRef.current) return;
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(idx, idx);
        }, 0);
    }

    const select = (begin: number, end: number) => {
        setTimeout(() => {
            if (!textAreaRef.current) return;
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(begin, end);
        }, 0);
    }

    const selectLineFrom = (begin: number) => {
        if (!internalValue) return;
        const end = internalValue.toString().indexOf('\n', begin);
        select(begin, end);
    }


    const apply = (style: StyleKind) => {
        if (!textAreaRef.current) return;

        let selectionStart = textAreaRef.current.selectionStart;
        let selectionEnd = textAreaRef.current.selectionEnd;

        let val: string = internalValue?.toString() ?? '';
        let chars;
        switch (style) {
            case 'bold':
            case 'italic':
            case 'code':
                chars = ktoch[style];
                val = surround(val, chars, selectionStart, selectionEnd);

                setInternalValue(val);
                select(selectionStart + chars.length, selectionEnd + chars.length);
                break;
            case 'heading':
            case 'quote':
                chars = ktoch[style];
                let linestart = getLineStartIndex(val, selectionStart);
                if (linestart == -1) return;

                val = insert(val, chars, linestart);
                setInternalValue(val);

                if (style === 'heading') selectLineFrom(linestart + 4);
                else selectLineFrom(linestart + 2)
                break;
            case 'link':
                val = insert(val, '[', selectionStart);
                val = insert(val, '](url)', selectionEnd + 1);

                setInternalValue(val);
                select(selectionEnd + 3, selectionEnd + 6);
                break;
            default:
                console.log('unknown styles');
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
                    <Button variant='ghost' size='icon' onClick={() => apply('link')}>
                        <Link2 />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => apply('quote')}>
                        <TextQuote />
                    </Button>
                    <Separator vertical />
                    <Button variant='ghost' size='icon' disabled>
                        <List />
                    </Button>
                    <Button variant='ghost' size='icon' disabled>
                        <ListOrdered />
                    </Button>
                    <Button variant='ghost' size='icon' disabled>
                        <ListChecks />
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