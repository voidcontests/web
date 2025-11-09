'use client';

import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Button } from "@/ui/button";
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useForm, useFieldArray } from 'react-hook-form';
import { createProblem } from '@/lib/api';
import { toast } from '@/components/toast';
import { Separator } from '@/ui/separator';
import { Trash2, Upload } from 'lucide-react';
import { TextArea } from '@/ui/textarea';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

export interface TestCase {
    input: string;
    output: string;
}

export interface FormData {
    title: string;
    statement: string;
    difficulty: string;
    test_cases: TestCase[];
    time_limit_ms: number;
    memory_limit_mb: number;
    checker: string;
}

const EXAMPLE_TCS = `[
  {
    "input": "5 3",
    "output": "8"
  },
  {
    "input": "10 20",
    "output": "30"
  }
]`;

export default function CreateProblemForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadError, setUploadError] = useState<string>("");
    const [testCasesCollapsed, setTestCasesCollapsed] = useState<boolean>(false);

    const { register, handleSubmit, setValue, watch, control } = useForm<FormData>({
        defaultValues: {
            title: "",
            statement: "",
            difficulty: "",
            test_cases: [],
            time_limit_ms: 2000,
            memory_limit_mb: 128,
            checker: "tokens",
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "test_cases",
    });

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadError("");

        if (!file.name.endsWith('.json')) {
            setUploadError("Please upload a JSON file");
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        try {
            const fileContent = await file.text();
            const jsonData = JSON.parse(fileContent);

            if (!Array.isArray(jsonData)) {
                throw new Error("JSON file must contain an array of test cases");
            }

            const validTestCases: TestCase[] = [];
            for (let i = 0; i < jsonData.length; i++) {
                const tc = jsonData[i];

                if (typeof tc !== 'object' || tc === null) {
                    throw new Error(`Test case ${i + 1} must be an object`);
                }

                if (!('input' in tc) || !('output' in tc)) {
                    throw new Error(`Test case ${i + 1} must have 'input' and 'output' fields`);
                }

                validTestCases.push({
                    input: String(tc.input),
                    output: String(tc.output),
                });
            }

            if (validTestCases.length === 0) {
                throw new Error("JSON file must contain at least one test case");
            }

            setValue('test_cases', validTestCases);
            setTestCasesCollapsed(true);
            toast({ title: `Successfully loaded ${validTestCases.length} test case${validTestCases.length !== 1 ? 's' : ''}` });

        } catch (error) {
            if (error instanceof SyntaxError) {
                setUploadError("Invalid JSON format");
            } else if (error instanceof Error) {
                setUploadError(error.message);
            } else {
                setUploadError("Failed to parse file");
            }
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: FormData) => {
        const result = await createProblem(data);
        if (!result.ok) {
            toast({ title: 'Failed to create problem', description: result.error.message });
            return;
        }

        toast({ title: 'Problem created successfully' });
        router.push('/hub');
    };

    function validate(): boolean {
        const { title, statement, difficulty, test_cases, checker } = watch();

        return (
            !!title.trim() &&
            !!statement.trim() &&
            !!difficulty.trim() &&
            !!checker.trim() &&
            !(isNaN(watch('time_limit_ms')) || watch('time_limit_ms').toString().includes('.') || watch('time_limit_ms').toString().includes(',') || watch('time_limit_ms') < 500 || watch('time_limit_ms') > 10000) &&
            !(isNaN(watch('memory_limit_mb')) || watch('memory_limit_mb').toString().includes('.') || watch('memory_limit_mb').toString().includes(',') || watch('memory_limit_mb') < 1 || watch('memory_limit_mb') > 1024) &&
            (test_cases.length > 0 && test_cases.every(tc => !!tc.input.trim() && !!tc.output.trim()))
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label required>Add title</Label>
                    <Input {...register("title")} placeholder="Title" required />
                </div>

                <div className="flex flex-col gap-2">
                    <Label required>
                        Add statement
                    </Label>
                    <TextArea
                        {...register("statement")}
                        className='min-h-40'
                        placeholder="Statement"
                        resizable
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <Label required>Test cases</Label>
                        <div className="flex flex-row items-center gap-2">
                            {fields.length > 0 && (
                                <Button
                                    type="button"
                                    variant="dashed"
                                    size="sm"
                                    onClick={() => setTestCasesCollapsed(!testCasesCollapsed)}
                                    className="gap-2"
                                >
                                    {testCasesCollapsed ? (
                                        <>
                                            Show all ({fields.length})
                                        </>
                                    ) : (
                                        <>
                                            Collapse
                                        </>
                                    )}
                                </Button>
                            )}
                            <div className="flex flex-col items-end gap-1">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="dashed"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload JSON
                                </Button>
                                {uploadError && (
                                    <span className="text-xs text-scarlet-500">{uploadError}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    {fields.length === 0 && (
                        <>
                            <div className="text-sm text-secondary-foreground p-4 bg-surface rounded-lg border border-dashed">
                                <p className="mb-2">You can upload a JSON file with test cases in the following format:</p>
                                <pre className="text-xs bg-zinc-100 dark:bg-zinc-900 p-2 rounded overflow-x-auto">
                                    {EXAMPLE_TCS}
                                </pre>
                                <p className="mt-2 text-xs">
                                    <a href="/test-cases-example.json" download className="text-blue-400 hover:underline">
                                        Download example file
                                    </a>
                                </p>
                            </div>
                            <div className='flex flex-row items-center gap-5'>
                                <Separator />
                                <span className='text-sm'>
                                    OR
                                </span>
                                <Separator />
                            </div>
                        </>
                    )}
                    {!testCasesCollapsed && fields.map((field, index) => (
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
                                    {...register(`test_cases.${index}.input` as const, { required: true })}
                                    resizable
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label required>Output</Label>
                                <TextArea
                                    {...register(`test_cases.${index}.output` as const, { required: true })}
                                    resizable
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                append({ input: "", output: "" });
                                setTestCasesCollapsed(false);
                            }}
                            className="flex-1"
                        >
                            New test case
                        </Button>
                        {(fields.length > 0 && !testCasesCollapsed) && (
                            <Button
                                type="button"
                                variant="outline"
                                size="default"
                                onClick={() => setTestCasesCollapsed(true)}
                                className="gap-2"
                            >
                                Collapse
                            </Button>
                        )}
                    </div>
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
                                <span className="text-xs text-scarlet-500">
                                    Integer value in milliseconds between 500 and 10,000
                                </span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label required>Memory limit</Label>
                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-row gap-1 items-center max-w-72'>
                                <Input {...register("memory_limit_mb", { valueAsNumber: true })} placeholder="Memory limit" required />
                                <span className=''>MB</span>
                            </div>
                            {
                                (isNaN(watch('memory_limit_mb')) || watch('memory_limit_mb').toString().includes('.') || watch('memory_limit_mb').toString().includes(',') || watch('memory_limit_mb') < 16 || watch('memory_limit_mb') > 512) &&
                                <span className="text-xs text-scarlet-500">
                                    Integer value in megabytes between 16 and 512
                                </span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label required>Checker</Label>
                        <Select value={watch('checker')} onValueChange={(value) => setValue('checker', value)}>
                            <SelectTrigger className="max-w-72">
                                <SelectValue placeholder="Select checker" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="tokens">Tokens</SelectItem>
                                    <SelectItem value="integers">Integers</SelectItem>
                                    <SelectItem value="floats4">Floats (precision 4)</SelectItem>
                                    <SelectItem value="floats6">Floats (precision 6)</SelectItem>
                                    <SelectItem value="floats9">Floats (precision 9)</SelectItem>
                                    <SelectItem value="yesno">Yes/No</SelectItem>
                                    <SelectItem value="full">Full match</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {watch('checker') && (
                            <div className="text-xs text-secondary-foreground">
                                {watch('checker') === 'tokens' && (
                                    <p>Compares output as whitespace-separated tokens. Ignores extra whitespace and line breaks.</p>
                                )}
                                {watch('checker') === 'integers' && (
                                    <p>Compares sequences of integers. Validates that outputs contain the same integers in the same order.</p>
                                )}
                                {watch('checker') === 'floats4' && (
                                    <p>Compares floating-point numbers with 4 decimal places precision (0.0001 tolerance).</p>
                                )}
                                {watch('checker') === 'floats6' && (
                                    <p>Compares floating-point numbers with 6 decimal places precision (0.000001 tolerance).</p>
                                )}
                                {watch('checker') === 'floats9' && (
                                    <p>Compares floating-point numbers with 9 decimal places precision (0.000000001 tolerance).</p>
                                )}
                                {watch('checker') === 'yesno' && (
                                    <p>Validates Yes/No answers. Accepts variations like yes/no, YES/NO, y/n (case-insensitive).</p>
                                )}
                                {watch('checker') === 'full' && (
                                    <p>Requires exact character-by-character match including whitespace and line breaks.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label required>Select difficulty</Label>
                    <RadioGroup value={watch('difficulty')} onValueChange={(value) => setValue("difficulty", value)}>

                        <Label
                            className={cn(
                                'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                                'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                                'has-[[data-state=checked]]:outline-2 has-[[data-state=checked]]:outline-green-500',
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
                                'has-[[data-state=checked]]:outline-2 has-[[data-state=checked]]:outline-amber-500',
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
                                'has-[[data-state=checked]]:outline-2 has-[[data-state=checked]]:outline-scarlet-500',
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
                    <Button className='font-medium' type='submit' disabled={!validate()}>CREATE</Button>
                </div>
            </div>
        </form>
    );
}
