'use client';

import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { createContest } from '@/actions/actions';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { DateTimePicker } from "@/components/time-picker/date-time-picker";
import { TextArea } from "../ui/textarea";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption,
    TableTitle,
} from "@/components/ui/table";
import { ProblemList } from "@/actions/dto/response";
import { ChangeEvent, use } from "react";
import Difficulty from "../difficulty";
import { Link } from "../ui/link";
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

export interface FormData {
    title: string;
    description: string;
    problems_ids: number[];
    start_time: Date;
    end_time: Date;
    max_entries: number;
    allow_late_join: boolean;
    keep_as_training: boolean;
}

export function CreateContestForm({ problems }: { problems: Promise<ProblemList> }) {
    const problemslist = use(problems);

    const { register, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            problems_ids: [],
            start_time: undefined,
            end_time: undefined,
            max_entries: 0,
            allow_late_join: true,
            keep_as_training: false,
        }
    });

    const onSubmit = async (data: FormData) => {
        // TODO:redirect to problem' page
        try {
            await createContest(data);
            toast.success("Contest created successfully");
        } catch (e) {
            console.error("Error:", e);
            toast.error("Something went wrong. Try again later");
        }
    };

    const onCheckedChange = (e: CheckedState, problemID: number) => {
        const checked = Boolean(e.valueOf());
        let prev = watch('problems_ids');
        if (checked) {
            prev.push(problemID);
        } else {
            prev = prev.filter(x => x != problemID);
        }
        setValue('problems_ids', prev);
    }

    const validate = () => {
        return watch('start_time') && watch('end_time') && watch('title').length !== 0 && watch('problems_ids').length !== 0 && watch('start_time') < watch('end_time');
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

                <div className="flex flex-col gap-2">
                    <Label optional>
                        Add description
                    </Label>
                    <TextArea
                        {...register("description")}
                        placeholder="Description"
                        resizable
                    />
                </div>

                <TableContainer>
                    <TableTitle>
                        SELECT PROBLEMS
                    </TableTitle>
                    <Table>
                        <TableCaption>
                            {
                                problemslist.data.length === 0
                                    ? <span>You need to create problems first <Link href="/hub/new/problem">here</Link>.</span>
                                    : <span>You can create new problems <Link href="/hub/new/problem">here</Link>.</span>
                            }
                        </TableCaption>
                        <TableHeader>
                            <TableHeaderRow>
                                <TableHead>Inc.</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Difficulty</TableHead>
                            </TableHeaderRow>
                        </TableHeader>
                        <TableBody>
                            {
                                problemslist.data.map((problem, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center">
                                            <Checkbox
                                                checked={watch('problems_ids').includes(problem.id)}
                                                onCheckedChange={(e) => onCheckedChange(e, problem.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {problem.id}
                                        </TableCell>
                                        <TableCell>
                                            {problem.title}
                                        </TableCell>
                                        <TableCell>
                                            <Difficulty difficulty={problem.difficulty} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label>Accesibility settings</Label>
                    <Label className={cn(
                        'flex items-start gap-3 rounded-xl border p-4 hover:cursor-pointer',
                        'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4 has-[[aria-checked=true]]:border-blue-400 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:bg-blue-400/20'
                    )}>
                        <Checkbox
                            checked={watch("allow_late_join")}
                            onCheckedChange={(value) => setValue("allow_late_join", Boolean(value))}
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <p className='text-sm leading-none font-medium'>
                                Allow late join
                            </p>
                            <p className='text-foreground/80 text-sm'>
                                When the option is enabled, users may apply to the competition at any time until it finishes;
                                when it is not - users may only apply before the competition begins.
                            </p>
                        </div>
                    </Label>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>
                        Add total participants limit
                        <span className="text-sm font-normal text-tertiary-foreground">(optional, 0 - not limited)</span>
                    </Label>
                    <Input
                        type="number"
                        className="no-arrows max-w-70"
                        {...register("max_entries", { valueAsNumber: true })}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const val = e.target.value;
                            if (val.length !== 0) {
                                const charcode = val[val.length - 1].charCodeAt(0);
                                if (charcode < 48 || charcode > 57) return;
                            }
                            setValue("max_entries", Number(val));
                        }}
                        placeholder="Slots"
                    />

                    {
                        watch('max_entries') > 8*1000**3 &&
                        <span className="text-[0.8125rem] font-normal">
                            Bro, do you really need this limitation??? There are fewer people on the planet than that number.
                        </span>
                    }
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label required>Starting at</Label>
                    <DateTimePicker date={watch('start_time')} setDate={(d: Date) => setValue("start_time", d)} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label required>Deadline at</Label>
                    <DateTimePicker date={watch('end_time')} setDate={(d: Date) => setValue("end_time", d)} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label className={cn(
                        'flex items-start gap-3 rounded-xl border p-4 hover:cursor-pointer',
                        'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4 has-[[aria-checked=true]]:border-blue-400 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:bg-blue-400/20'
                    )}>
                        <Checkbox
                            checked={watch("keep_as_training")}
                            onCheckedChange={(value) => setValue("keep_as_training", Boolean(value))}
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <p className='text-sm leading-none font-medium'>
                                Keep as training
                            </p>
                            <p className='text-foreground/80 text-sm'>
                                You can keep this contest available as a training session after it ends. Users will be able to view the problems, but they won't be able to submit any solutions.
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
