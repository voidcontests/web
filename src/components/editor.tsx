import { Heading, Bold, Italic, Code, Link2, TextQuote, List, ListOrdered, ListChecks } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import React, { useState, useEffect, useRef } from "react";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import Preview from "@/components/preview";
import { parseMD } from "@/lib/utils";
import * as strings from '@/lib/strings';

type StyleKind = 'bold' | 'italic' | 'code' | 'heading' | 'link' | 'quote';

const ktoch = {
    'bold': '**',
    'italic': '*',
    'code': '`',
    'heading': '### ',
    'quote': '> ',
}

interface EditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    markdown: string,
    setMarkdown: (s: string) => void;
}

const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>(({ markdown, setMarkdown, children, className, ...props }) => {
    const [internalValue, setInternalValue] = useState<string>(markdown);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setInternalValue(markdown);
    }, [markdown]);

    useEffect(() => {
        setMarkdown(internalValue);
    }, [internalValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        setMarkdown(newValue);
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
        const end = internalValue.indexOf('\n', begin);
        select(begin, end);
    }


    const applyStyle = (style: StyleKind) => {
        if (!textAreaRef.current) return;

        let selectionStart = textAreaRef.current.selectionStart;
        let selectionEnd = textAreaRef.current.selectionEnd;

        let val: string = internalValue;
        let chars;
        switch (style) {
            case 'bold':
            case 'italic':
            case 'code':
                chars = ktoch[style];
                val = strings.surround(val, chars, selectionStart, selectionEnd);

                setInternalValue(val);
                select(selectionStart + chars.length, selectionEnd + chars.length);
                break;
            case 'heading':
            case 'quote':
                chars = ktoch[style];
                let linestart = strings.getLineStartIndex(val, selectionStart);
                if (linestart == -1) return;

                val = strings.insert(val, chars, linestart);
                setInternalValue(val);

                if (style === 'heading') selectLineFrom(linestart + 4);
                else selectLineFrom(linestart + 2)
                break;
            case 'link':
                val = strings.insert(val, '[', selectionStart);
                val = strings.insert(val, '](url)', selectionEnd + 1);

                setInternalValue(val);
                select(selectionEnd + 3, selectionEnd + 6);
                break;
            default:
                console.log('unknown styles');
        }
    }

    const parsed = parseMD(internalValue);

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
                <h1 className="text-text text-lg font-medium">
                    {children}
                </h1>
                <div className="flex items-center gap-[5px]">
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('heading')}>
                        <Heading />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('bold')}>
                        <Bold />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('italic')}>
                        <Italic />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('code')}>
                        <Code />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('link')}>
                        <Link2 />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => applyStyle('quote')}>
                        <TextQuote />
                    </Button>
                    <Separator vertical className="h-5" />
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
            <div className="flex justify-end">
                <span
                    className="text-text-link font-medium hover:cursor-pointer hover:underline hover:underline-offset-2"
                    onClick={() => setOpen(prev => !prev)}
                >
                    PREVIEW
                </span>
            </div>
            <Drawer open={open} onOpenChange={() => { setOpen(prev => !prev) }}>
                <DrawerContent className="min-h-[60vh]">
                    <div className="flex justify-center">
                        <div className="w-[1200px] flex flex-col gap-[30px]">
                            <Preview markdown={parsed} />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
});

export default Editor;