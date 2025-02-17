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
import { ProblemList } from "@/api/dto/response";
import { use } from "react";
import Difficulty from "../difficulty";
import { Link } from "../ui/link";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export interface FormData {
    title: string;
    description: string;
    problems_ids: number[];
    start_time: Date;
    end_time: Date;
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
                        {
                            problemslist.data.length === 0 &&
                            <TableCaption>
                                You dont't have any created problems. You can create new one problem <Link href="/hub/new/problem">here</Link>.
                            </TableCaption>
                        }
                        <TableHeader>
                            <TableHeaderRow>
                                <TableHead>Inc</TableHead>
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

                <code>
                    {JSON.stringify(watch())}
                </code>
            </div>
        </form>
    );
}
