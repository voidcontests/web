'use client';

import { useState } from "react";
import ContentContainer from "@/components/content-container";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

export default function Page() {
    const [problem, setProblem] = useState({
        title: "",
        statement: "",
        answer: "",
        difficulty: "",
        keepPublic: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProblem((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        if (problem.title.trim().length === 0) {
            return false;
        }

        if (problem.statement.trim().length === 0) {
            return false;
        }

        if (problem.answer.trim().length === 0) {
            return false;
        }

        if (problem.difficulty.trim().length === 0) {
            return false;
        }

        return true;
    }

    return (
        <ContentContainer className="max-w-3xl">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-foreground text-lg font-medium">Add a title</h1>
                    <Input
                        name="title"
                        value={problem.title}
                        placeholder="Title"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-foreground text-lg font-medium">Add a statement</h1>
                    <TextArea
                        name="statement"
                        value={problem.statement}
                        placeholder="Write problem's statement"
                        onChange={handleChange}
                        resizable
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-foreground text-lg font-medium">Add an answer</h1>
                    <Input
                        name="answer"
                        value={problem.answer}
                        placeholder="Answer"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-foreground text-lg font-medium">
                        Select difficulty
                    </h1>
                    <RadioGroup value={problem.difficulty} onValueChange={(value) => setProblem((prev) => ({ ...prev, difficulty: value }))}>
                        {/* Easy */}
                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-green-500',
                                'has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:bg-green-500/16',
                            )}
                        >
                            <RadioGroupItem
                                value='easy'
                                className='shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>
                                        Easy
                                    </span>
                                    <span className='text-secondary-foreground'>
                                        (1 pts)
                                    </span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Easy problems involve basic concepts and can be solved quickly with simple reasoning
                                </div>
                            </div>
                        </Label>

                        {/* Mid */}
                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-amber-500',
                                'has-[[data-state=checked]]:bg-amber-50 dark:has-[[data-state=checked]]:bg-amber-500/16',
                            )}
                        >
                            <RadioGroupItem
                                value='mid'
                                className='shadow-none data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>
                                        Medium
                                    </span>
                                    <span className='text-secondary-foreground'>
                                        (2 pts)
                                    </span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Difficult challenge for advanced participants with complex scenarios
                                </div>
                            </div>
                        </Label>

                        {/* Hard */}
                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-scarlet-500',
                                'has-[[data-state=checked]]:bg-scarlet-50 dark:has-[[data-state=checked]]:bg-scarlet-500/16',
                            )}
                        >
                            <RadioGroupItem
                                value='hard'
                                className='shadow-none data-[state=checked]:border-scarlet-500 data-[state=checked]:bg-scarlet-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>
                                        Hard
                                    </span>
                                    <span className='text-secondary-foreground'>
                                        (3 pts)
                                    </span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Medium problems require a deeper understanding and the application of multiple concepts, often involving moderate complexity
                                </div>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-foreground text-lg font-medium">Set visibility</h1>
                    <Label className={cn(
                        'flex items-start gap-3 rounded-xl border p-4 hover:cursor-pointer',
                        'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4 has-[[aria-checked=true]]:border-blue-400 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:bg-blue-400/20'
                    )}>
                        <Checkbox
                            id='toggle-2'
                            checked={problem.keepPublic}
                            onCheckedChange={() => setProblem((prev) => ({ ...prev, keepPublic: !prev.keepPublic }))}
                            className='data-[state=checked]:bg-blue-400 dark:data-[state=checked]:bg-blue-400'
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <p className='text-sm leading-none font-medium'>
                                Keep public
                            </p>
                            <p className='text-foreground/80 text-sm'>
                                After the end of the contest, the task will remain visible in public archives
                            </p>
                        </div>
                    </Label>
                </div>

                <div className="flex justify-end">
                    <Button disabled={!validate()}>CREATE</Button>
                </div>

                <code>{JSON.stringify(problem)}</code>
            </div>
        </ContentContainer>
    );
}
