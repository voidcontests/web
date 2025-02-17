'use client';

import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import Editor from '@/components/sections/editor';
import { useForm } from 'react-hook-form';
import { createContest } from '@/actions/actions';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { DateTimePicker } from "@/components/time-picker/date-time-picker";
import { TextArea } from "../ui/textarea";

export interface FormData {
    title: string;
    description: string;
    problem_ids: number[];
    start_date: Date;
    end_date: Date;
}

export function CreateContestForm() {
    const { register, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            problem_ids: [],
            start_date: undefined,
            end_date: undefined,
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

    const validate = () => {
        return watch('start_date') && watch('end_date') && watch('title').length !== 0 && watch('problem_ids').length !== 0;
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

                <Separator />

                <div className="flex flex-col gap-2">
                    <Label required>Starting at</Label>
                    <DateTimePicker date={watch('start_date')} setDate={(d: Date) => setValue("start_date", d)} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label required>Deadline at</Label>
                    <DateTimePicker date={watch('end_date')} setDate={(d: Date) => setValue("end_date", d)} />
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
