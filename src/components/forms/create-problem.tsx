'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MarkdownEditor } from '@/components/sections/markdown-editor';
import { useForm, useFieldArray } from 'react-hook-form';
import { createProblem, revalidate } from '@/actions';
import { toast } from '@/components/toast';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageBox } from '@/components/sections/message-box';
import { Trash2 } from 'lucide-react';
import { TextArea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export interface TestCase {
    input: string;
    output: string;
    is_example: boolean;
}

export interface FormData {
    title: string;
    statement: string;
    kind: string;
    answer: string;
    difficulty: string;
    test_cases: TestCase[];
    time_limit_ms: number;
}

export function CreateProblemForm() {
    const router = useRouter();

    const { register, handleSubmit, setValue, watch, control } = useForm<FormData>({
        defaultValues: {
            title: "",
            statement: "",
            kind: "",
            answer: "",
            difficulty: "",
            test_cases: [],
            time_limit_ms: 5000,
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "test_cases",
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createProblem(data);
            revalidate('/hub');
            toast({ title: 'Problem created successfully' });
            router.push('/hub');
        } catch (e) {
            console.error("Error:", e);
            toast({ title: 'Something went wrong. Try again later' });
        }
    };

    function validate(): boolean {
        const { title, statement, kind, answer, difficulty, test_cases } = watch();

        return (
            !!title.trim() &&
            !!statement.trim() &&
            !!kind.trim() &&
            !!difficulty.trim() &&
            !(isNaN(watch('time_limit_ms')) || watch('time_limit_ms').toString().includes('.') || watch('time_limit_ms').toString().includes(',') || watch('time_limit_ms') < 500 || watch('time_limit_ms') > 10000) &&
            (
              kind === "text_answer_problem" ||
              (test_cases.length > 0 && test_cases.every(tc => !!tc.input.trim() && !!tc.output.trim()))
            ) &&
            (kind === "coding_problem" || !!answer.trim())
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label required>Add title</Label>
                    <Input {...register("title")} placeholder="Title" required />
                </div>

                <MarkdownEditor
                    placeholder="Write problem's statement here (Markdown supported)"
                    markdown={watch("statement")}
                    setMarkdown={(s: string) => setValue("statement", s)}
                    required
                >
                    Add statement
                </MarkdownEditor>

                <div className="flex flex-col gap-2">
                    <Label required>Select problem's type</Label>
                    <Select value={watch('kind')} onValueChange={(value) => setValue('kind', value)}>
                        <SelectTrigger className="w-96">
                            <SelectValue placeholder="Choose one" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="text_answer_problem">TEXT ANSWER PROBLEM</SelectItem>
                                <SelectItem value="coding_problem">CODING PROBLEM</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {watch('kind') === 'text_answer_problem' && (
                    <div className="flex flex-col gap-2">
                        <Label required>Add answer</Label>
                        <Input {...register("answer")} placeholder="Answer" />
                    </div>
                )}

                {watch('kind') === 'coding_problem' && (
                    <>

                        <div className="flex flex-col gap-4">
                            <Label required>Test cases</Label>
                            <MessageBox>
                                Be very precise with spaces and new lines. Be sure NOT to accidentally include extra whitespaces. On judging step they will be treated exactly as provided!
                            </MessageBox>
                            {fields.map((field, index) => (
                                <div key={field.id} className={cn("flex flex-col gap-4 pb-4", (index !== watch('test_cases').length-1) && 'border-b')}>
                                    <div className='flex items-center justify-between'>
                                        <span className="text-base font-medium">TC #{index + 1}</span>
                                        <Button variant="ghost" size="icon" className='text-secondary-foreground hover:text-scarlet-500' type="button" onClick={() => remove(index)}>
                                            <Trash2 />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label required>Input</Label>
                                        <TextArea
                                            className='font-mono'
                                            {...register(`test_cases.${index}.input` as const, { required: true })}
                                            resizable
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label required>Output</Label>
                                        <TextArea
                                            className='font-mono'
                                            {...register(`test_cases.${index}.output` as const, { required: true })}
                                            resizable
                                        />
                                    </div>
                                    <Label className='flex flex-row gap-2 hover:cursor-pointer'>
                                        <Checkbox
                                            checked={watch(`test_cases.${index}.is_example`)}
                                            onCheckedChange={(value) => setValue(`test_cases.${index}.is_example`, Boolean(value))}
                                        />
                                        <span className='font-normal'>Use as example</span>
                                    </Label>
                                </div>
                            ))}
                            <Button
                                variant="dashed"
                                type="button"
                                onClick={() => append({ input: "", output: "", is_example: false })}
                            >
                                New test case
                            </Button>
                            <Separator />
                            <div className="flex flex-col gap-2">
                                <Label required>Time limit</Label>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-row gap-1 items-center max-w-72'>
                                        <Input {...register("time_limit_ms", { valueAsNumber: true })} placeholder="Time limit" required />
                                        <span className=''>ms</span>
                                    </div>
                                    {
                                        (isNaN(watch('time_limit_ms')) || watch('time_limit_ms').toString().includes('.') || watch('time_limit_ms').toString().includes(',') || watch('time_limit_ms') < 500 || watch('time_limit_ms') > 10000) &&
                                        <span className="text-scarlet-500">Time limit should be a valid integer between 1000ms and 10000ms</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label required>Select difficulty</Label>
                    <RadioGroup value={watch('difficulty')} onValueChange={(value) => setValue("difficulty", value)}>

                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-green-500',
                                'has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:bg-green-500/16'
                            )}
                        >
                            <RadioGroupItem
                                value='easy'
                                className='shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>Easy</span>
                                    <span className='text-secondary-foreground'>(1 pts)</span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Easy problems involve basic concepts and can be solved quickly with simple reasoning
                                </div>
                            </div>
                        </Label>


                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-amber-500',
                                'has-[[data-state=checked]]:bg-amber-50 dark:has-[[data-state=checked]]:bg-amber-500/16'
                            )}
                        >
                            <RadioGroupItem
                                value='mid'
                                className='shadow-none data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>Medium</span>
                                    <span className='text-secondary-foreground'>(2 pts)</span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Medium problems require a deeper understanding and the application of multiple concepts, often involving moderate complexity
                                </div>
                            </div>
                        </Label>


                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:border-scarlet-500',
                                'has-[[data-state=checked]]:bg-scarlet-50 dark:has-[[data-state=checked]]:bg-scarlet-500/16'
                            )}
                        >
                            <RadioGroupItem
                                value='hard'
                                className='shadow-none data-[state=checked]:border-scarlet-500 data-[state=checked]:bg-scarlet-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-zinc-50 *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                            />
                            <div className='grid gap-1.5 font-normal'>
                                <div className='flex flex-row gap-1.5'>
                                    <span className='font-medium'>Hard</span>
                                    <span className='text-secondary-foreground'>(3 pts)</span>
                                </div>
                                <div className='text-foreground/80 leading-snug'>
                                    Difficult challenge for advanced participants with complex scenarios
                                </div>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                <div className="flex justify-end">
                    <Button type='submit' disabled={!validate()}>CREATE</Button>
                </div>
            </div>
        </form>
    );
}
