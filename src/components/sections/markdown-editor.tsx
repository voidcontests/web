import { Heading, Bold, Italic, Code, Link2, TextQuote, List, ListOrdered, ListChecks } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState, useEffect, useRef, forwardRef, TextareaHTMLAttributes, ChangeEvent, KeyboardEvent } from "react";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/sections/preview";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as strings from '@/lib/strings';
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type StyleKind = 'bold' | 'italic' | 'code' | 'heading' | 'link' | 'quote';

const ktoch = {
    'bold': '**',
    'italic': '*',
    'code': '`',
    'heading': '### ',
    'quote': '> ',
}

interface MarkdownEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    markdown: string,
    setMarkdown: (s: string) => void;
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(({ markdown, setMarkdown, children, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string>(markdown);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setInternalValue(markdown);
    }, [markdown]);

    useEffect(() => {
        setMarkdown(internalValue);
    }, [internalValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        setMarkdown(newValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((!e.ctrlKey && !e.metaKey) || !e.key) return;

        switch (e.key) {
            case 'b':
                e.preventDefault();
                applyStyle('bold');
                break;
            case 'i':
                e.preventDefault();
                applyStyle('italic');
                break;
        }
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
                throw new Error('ERROR: trying to apply unknown style');
        }
    }

    const toggle_buttons = [
        {
            icon: <Heading />,
            tooltip: 'Heading',
            onClick: () => applyStyle('heading'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <Bold />,
            tooltip: 'Bold',
            onClick: () => applyStyle('bold'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <Italic />,
            tooltip: 'Italic',
            onClick: () => applyStyle('italic'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <Code />,
            tooltip: 'Code',
            onClick: () => applyStyle('code'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <Link2 />,
            tooltip: 'Link',
            onClick: () => applyStyle('link'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <TextQuote />,
            tooltip: 'Quote',
            onClick: () => applyStyle('quote'),
            disabled: false,
            separatorBefore: false,
        },
        {
            icon: <List />,
            tooltip: 'List',
            onClick: () => { },
            disabled: true,
            separatorBefore: true,
        },
        {
            icon: <ListOrdered />,
            tooltip: 'Ordered list',
            onClick: () => { },
            disabled: true,
            separatorBefore: false,
        },
        {
            icon: <ListChecks />,
            tooltip: 'Checkbox list',
            onClick: () => { },
            disabled: true,
            separatorBefore: false,
        },
    ]

    return (
        <TooltipProvider>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <Label required={props.required} optional={!props.required}>
                        {children}
                    </Label>
                    {/* <h1 className="text-foreground text-lg font-medium">
                        {children}
                    </h1> */}
                    <div className="flex items-center gap-1">
                        {
                            toggle_buttons.map((toggle, index) => (
                                <div key={index} className="flex gap-1 items-center">
                                    {
                                        toggle.separatorBefore
                                            ? <Separator vertical className="h-5" />
                                            : <></>
                                    }
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant='ghost' size='icon' onClick={toggle.onClick} disabled={toggle.disabled}>
                                                {toggle.icon}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {toggle.tooltip}
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <TextArea
                    className={className}
                    value={internalValue}
                    placeholder={props.placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={textAreaRef}
                    resizable
                    {...props}
                />
                <div className="flex justify-end">
                    <span
                        className={cn(
                            "text-sm text-blue-400 font-medium",
                            internalValue.trim().length !== 0
                                ? "hover:cursor-pointer hover:underline hover:underline-offset-2"
                                : "hover:cursor-default opacity-70",
                        )}
                        onClick={() => {
                            if (internalValue.trim().length !== 0) setOpen(prev => !prev);
                        }}
                    >
                        PREVIEW
                    </span>
                </div>
                <Drawer open={open} onOpenChange={() => { setOpen(prev => !prev) }}>
                    <DrawerContent className="min-h-[60vh]">
                        <div className="flex justify-center">
                            <div className="max-w-7xl w-full flex flex-col">
                                <div className="mx-4">
                                    <Preview markdown={internalValue} />
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </TooltipProvider>
    )
});

export { MarkdownEditor };
