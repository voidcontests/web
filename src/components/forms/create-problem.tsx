'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import Editor from '@/components/sections/editor';
import { useForm } from 'react-hook-form';
import { createProblem } from '@/actions/actions';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';

export interface FormData {
    title: string;
    statement: string;
    answer: string;
    difficulty: string;
    keep_public: boolean;
}

export function CreateProblemForm() {
    const { register, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            title: "",
            statement: "",
            answer: "",
            difficulty: "",
            keep_public: true,
        }
    });

    const onSubmit = async (data: FormData) => {
        // TODO:redirect to problem' page
        try {
            await createProblem(data);
            toast.success("Problem created successfully");
        } catch (e) {
            console.error("Error:", e);
            toast.error("Something went wrong. Try again later");
        }
    };

    const validate = () => {
        const values = watch();
        return Object.entries(values).every(([_, value]) => {
            return typeof value !== "string" || value.trim() !== "";
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label required>
                        Add title
                    </Label>
                    <Input
                        {...register("title")}
                        placeholder="Title"
                        required
                    />
                </div>

                <Editor
                    placeholder="Write problem's statement"
                    markdown={watch("statement")}
                    setMarkdown={(s: string) => setValue("statement", s)}
                    required
                >
                    Add statement
                </Editor>

                <div className="flex flex-col gap-2">
                    <Label required>
                        Add answer
                    </Label>
                    <Input
                        {...register("answer")}
                        placeholder="Answer"
                    />
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label required>
                        Select difficulty
                    </Label>
                    <RadioGroup value={watch('difficulty')} onValueChange={(value) => setValue("difficulty", value)}>
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
                                className='shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
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
                                className='shadow-none data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
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
                                    Medium problems require a deeper understanding and the application of multiple concepts, often involving moderate complexity
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
                                className='shadow-none data-[state=checked]:border-scarlet-500 data-[state=checked]:bg-scarlet-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
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
                                    Difficult challenge for advanced participants with complex scenarios
                                </div>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Change visibility</Label>
                    <Label className={cn(
                        'flex items-start gap-3 rounded-xl border p-4 hover:cursor-pointer',
                        'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4 has-[[aria-checked=true]]:border-blue-400 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:bg-blue-400/20'
                    )}>
                        <Checkbox
                            checked={watch("keep_public")}
                            onCheckedChange={(value) => setValue("keep_public", Boolean(value))}
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
                    <Button type='submit' disabled={!validate()}>CREATE</Button>
                </div>
            </div>
        </form>
    );
}
