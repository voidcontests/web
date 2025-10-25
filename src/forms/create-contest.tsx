'use client';

import { DateTimePicker } from "@/ui/time-picker/date-time-picker";
import { Separator } from '@/ui/separator';
import { TextArea } from "@/ui/textarea";
import { createContest, getCreatedProblems } from "@/lib/api";
import { Button } from "@/ui/button";
import { Label } from '@/ui/label';
import { Input } from "@/ui/input";
import { useForm } from 'react-hook-form';
import { toast } from '@/components/toast';
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption, TableTitle,
} from "@/ui/table";
import Difficulty from "@/components/difficulty";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from '@/ui/checkbox';
import { ProblemListItem } from "@/lib/models";
import { Link } from "@/ui/link";
import { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ResultError } from "@/lib/client";
import TableTemplate from "@/components/templates/table";

export interface FormData {
    title: string;
    description: string;
    problems_ids: number[];
    start_time: Date;
    end_time: Date;
    max_entries: number;
    allow_late_join: boolean;
}

export function CreateContestForm() {
    const [problems, setProblems] = useState<ProblemListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ResultError | null>(null);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const result = await getCreatedProblems(0, 10);

            if (result.ok) {
                setProblems(result.data.items);
            } else {
                setError(result);
                toast({ title: 'Fetching problems failed', description: result.error.message });
            }

            setLoading(false);
        };
        load();
    }, []);

    const { register, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            problems_ids: [],
            start_time: undefined,
            end_time: undefined,
            max_entries: 0,
            allow_late_join: true,
        }
    });

    const onSubmit = async (data: FormData) => {
        const result = await createContest(data);
        if (!result.ok) {
            toast({ title: 'Failed to create contest', description: result.error.message });
            return;
        }

        toast({ title: 'Contest created successfully' });
        router.push('/hub');
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

                {/* TODO: Add pagination here */}
                <IncludeProblems
                    problems={problems}
                    loading={loading}
                    error={error}
                    selectedIds={watch('problems_ids')}
                    onCheckedChange={onCheckedChange}
                />

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

                <div className="flex justify-end">
                    <Button type='submit' disabled={!validate()}>CREATE</Button>
                </div>
            </div>
        </form>
    );
}

interface IncludeProblemsProps {
    problems: ProblemListItem[],
    loading: boolean,
    error: ResultError | null,
    selectedIds: number[],
    onCheckedChange: (e: CheckedState, problemID: number) => void
};

function IncludeProblems({ problems, loading, error, selectedIds, onCheckedChange }: IncludeProblemsProps) {
    if (loading) {
        return (
            <TableTemplate title='SELECT PROBLEMS' caption='Loading...' />
        );
    }

    if (error !== null) {
        return (
            <TableTemplate title='INCLUDE PROBLEMS' caption='Fetching created problems failed' />
        );
    }

    return (
        <TableContainer>
            <TableTitle>
                SELECT PROBLEMS
            </TableTitle>
            <Table>
                <TableCaption>
                    {
                        problems.length === 0
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
                        problems.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell className="align-middle">
                                    <div className="flex items-center justify-center">
                                        <Checkbox
                                            checked={selectedIds.includes(problem.id)}
                                            onCheckedChange={(e) => onCheckedChange(e, problem.id)}
                                        />
                                    </div>
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
    );
}
