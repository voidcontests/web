'use client';

import { Widget, WidgetContent, WidgetTitle } from "@/components/ui/widget";
import { CreateContest, CreateProblem } from '@/api/dto/request';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useTonWallet } from '@tonconnect/ui-react';
import { Button } from "@/components/ui/button";
import { Plus, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";
import { useRouter } from 'next/navigation';
import Editor from "@/components/editor";
import { itoc } from "@/lib/utils";
import { useState } from "react";
import { toast } from 'sonner';
import * as API from '@/api';
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
    TableCaption,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { capitalize } from "@/lib/strings";

export default function CreateContestPage() {
    const router = useRouter();
    const wallet = useTonWallet();

    const [contest, setContest] = useState<CreateContest>({
        title: '',
        description: '',
        problems: [],
        starting_at: new Date(),
        duration_mins: 100,
    });

    const [problem, setProblem] = useState<CreateProblem>({
        title: '',
        statement: '',
        answer: '',
        input: '',
        difficulty: '',
    });

    const handleContestTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest(prev => ({
            ...prev,
            title: e.target.value,
        }));
    }

    const setContestDescription = (s: string): void => {
        setContest(prev => ({
            ...prev,
            description: s,
        }));
    }

    const handleProblemTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(prev => ({
            ...prev,
            title: e.target.value,
        }));
    }

    const setProblemStatement = (s: string): void => {
        setProblem(prev => ({
            ...prev,
            statement: s,
        }));
    }


    const handleProblemAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(prev => ({
            ...prev,
            answer: e.target.value,
        }));
    }

    const submitContest = async (is_draft: boolean) => {
        if (is_draft) {
            toast.warning('Saving as draft is unavailable yet');
            return;
        }
        if (wallet === null) {
            toast.error('Connect wallet first');
            return;
        }

        let now = new Date();
        let date = new Date(now);
        date.setDate(now.getDate() + 2);

        try {
            const c = await API.contests.create({
                title: contest.title,
                description: contest.description,
                problems: contest.problems,
                starting_at: date,
                duration_mins: 300,
            });

            if (c === undefined) {
                throw new Error('contest is undefined');
            }
            toast.success("Contest created!");

            setTimeout(() => {
                router.push(`/contests/${c.id}`);
            }, 3000);
        } catch (e) {
            toast.error("Something went wrong");
        }
    }

    const [open, setOpen] = useState(false);

    type DifficultyColorMap = {
        [key: string]: 'green' | 'orange' | 'red';
    };

    const difficultyToBadgeType: DifficultyColorMap = {
        'easy': 'green',
        'mid': 'orange',
        'hard': 'red',
    }

    return (
        <div className="flex justify-center">
            <div className="w-[1200px] grid grid-cols-12 gap-5">
                <div className="col-span-9 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-text-bright text-lg font-medium">Add a title</h1>
                        <Input
                            value={contest.title}
                            placeholder="Title"
                            onChange={handleContestTitleChange}
                        />
                    </div>
                    <Editor
                        placeholder="Write a contest's description"
                        markdown={contest.description ?? ''}
                        setMarkdown={setContestDescription}
                    >
                        Add a description
                    </Editor>
                    <div className="flex flex-col gap-5">
                        <TableContainer>
                            <TableHead className="gap-1">
                                <span>PROBLEMSET</span>
                                {
                                    contest.problems.length !== 0 &&
                                    <span className="font-normal text-text-muted">{`- ${contest.problems.length} problems`}</span>
                                }
                            </TableHead>
                            <Table>
                                {
                                    contest.problems.length === 0 &&
                                    <TableCaption>No problems yet</TableCaption>
                                }
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className="w-[6%]">#</TableHeaderCell>
                                        <TableHeaderCell className="w-[50%]">Name</TableHeaderCell>
                                        <TableHeaderCell className="w-[30%]">Difficulty</TableHeaderCell>
                                        <TableHeaderCell></TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        contest.problems.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{itoc(index)}</TableCell>
                                                <TableCell>{problem.title}</TableCell>
                                                <TableCell>
                                                    <Tag
                                                        variant={difficultyToBadgeType[problem.difficulty]}
                                                    >
                                                        {capitalize(problem.difficulty)}
                                                    </Tag>
                                                </TableCell>
                                                <TableCell className="w-[100px]">
                                                    <span
                                                        className="text-base text-text-link font-medium transition-colors hover:underline hover:cursor-pointer underline-offset-2"
                                                        onClick={() => {
                                                            setContest(prev => ({
                                                                ...prev,
                                                                problems: prev.problems.filter((_, i) => i !== index),
                                                            }));
                                                        }}
                                                    >
                                                        rm -f .
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="flex justify-between">
                            <Button variant='outline' onClick={() => setOpen(prev => !prev)}>
                                <Plus />ADD PROBLEM
                            </Button>
                            <div className="flex gap-5">
                                <Button
                                    variant='dashed'
                                    onClick={() => submitContest(true)}
                                >SAVE AS DRAFT</Button>
                                <Button
                                    disabled={contest.problems.length === 0 || contest.title === ''}
                                    onClick={() => submitContest(false)}
                                >
                                    SUBMIT CONTEST
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <Widget>
                        <WidgetContent>
                            <div className="flex justify-between items-center">
                                <WidgetTitle>TIME SETTINGS</WidgetTitle>
                                <span
                                    className="text-text-link hover:underline underline-offset-2 hover:cursor-pointer font-medium"
                                >
                                    SET
                                </span>
                            </div>
                            <div>Not set yet</div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <WidgetTitle>PARTICIPANTS</WidgetTitle>
                                <Link href='/' size="large">SET</Link>
                            </div>
                            <div>Not set yet</div>
                        </WidgetContent>
                    </Widget>
                </div>
            </div>

            {/* Section for the drawer */}
            <Drawer open={open} onOpenChange={() => {
                if (open) {
                    setProblem({
                        title: '',
                        statement: '',
                        answer: '',
                        difficulty: '',
                        input: '',
                    });
                }
                setOpen(prev => !prev);
            }}>
                <DrawerContent>
                    <div className="flex justify-center">
                        <div className="w-[1200px] grid grid-cols-12 gap-5">
                            <div className="col-span-9 flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-text-bright text-lg font-medium">Add a title</h1>
                                    <Input
                                        value={problem.title}
                                        placeholder="Title"
                                        onChange={handleProblemTitleChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Editor
                                        markdown={problem.statement}
                                        setMarkdown={setProblemStatement}
                                        placeholder="Write a problem's statement here"
                                        className="h-[400px] resize-none"
                                    >
                                        Add a statement
                                    </Editor>
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <Button variant='dashed'>
                                                <Paperclip /> sample.txt
                                            </Button>
                                            <div>
                                                with answer provided
                                            </div>
                                            <Input
                                                value={problem.answer}
                                                placeholder="here"
                                                onChange={handleProblemAnswerChange}
                                                className='w-[400px]'
                                            />
                                        </div>
                                        <Button
                                            disabled={
                                                !problem.title || !problem.statement || !problem.answer || !problem.difficulty
                                            }
                                            onClick={() => {
                                                setContest(prev => ({
                                                    ...prev,
                                                    problems: [...prev.problems, problem],
                                                }));
                                                setProblem({
                                                    title: '',
                                                    statement: '',
                                                    answer: '',
                                                    difficulty: '',
                                                    input: '',
                                                });
                                                setOpen(false);
                                            }}
                                        >
                                            SUBMIT PROBLEM
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-8">
                                <Widget>
                                    <WidgetContent>
                                        <div className="flex justify-between items-center">
                                            <WidgetTitle>DIFFICULTY</WidgetTitle>
                                        </div>
                                        <Select value={problem.difficulty} onValueChange={(val) => {
                                            setProblem(prev => ({
                                                ...prev,
                                                difficulty: val,
                                            }))
                                        }}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="easy">
                                                        Easy
                                                    </SelectItem>
                                                    <SelectItem value="mid">
                                                        Medium
                                                    </SelectItem>
                                                    <SelectItem value="hard">
                                                        Hard
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </WidgetContent>
                                </Widget>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div >
    );
}
