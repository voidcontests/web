'use client';

import { Widget, WidgetContent, WidgetTitle } from "@/components/ui/widget";
import { CreateContest, CreateProblem } from '@/api/dto/request';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useTonWallet } from '@tonconnect/ui-react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";
import { useRouter } from 'next/navigation';
import Editor from "@/components/sections/editor";
import { itoc } from "@/lib/utils";
import { useState } from "react";
import { toast } from 'sonner';
import * as API from '@/api';
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableCaption,
    TableTitle,
} from "@/components/ui/table";
import { capitalize } from "@/lib/strings";
import { Toggle } from "@/components/ui/toggle";
import ContentContainer from "@/components/content-container";

export default function CreateContestPage() {
    const router = useRouter();
    const wallet = useTonWallet();

    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');

    const [contest, setContest] = useState<CreateContest>({
        title: '',
        description: '',
        problems: [],
        start_time: new Date(),
        end_time: new Date(),
        duration_mins: 0,
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
            const c = await API.createContest({
                title: contest.title,
                description: contest.description,
                problems: contest.problems,
                start_time: new Date(starts),
                end_time: new Date(ends),
                duration_mins: contest.duration_mins,
            });

            if (c === undefined) {
                throw new Error('contest is undefined');
            }

            toast.success("Contest created!");
            router.push(`/contest/${c.id}`);
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
        <ContentContainer>
            <div className="flex flex-col gap-8 mb-16">
                <div className="flex flex-col gap-2">
                    <h1 className="text-bright-text text-lg font-medium">Add a title</h1>
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
                        <TableTitle>
                            PROBLEMSET
                        </TableTitle>
                        <Table>
                            {
                                contest.problems.length === 0 &&
                                <TableCaption>No problems yet</TableCaption>
                            }
                            <TableHeader>
                                <TableHeaderRow>
                                    <TableHead className="w-[6%]">#</TableHead>
                                    <TableHead className="w-[50%]">Name</TableHead>
                                    <TableHead className="w-[30%]">Difficulty</TableHead>
                                    <TableHead></TableHead>
                                </TableHeaderRow>
                            </TableHeader>
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
                                                    className="text-base text-link-text font-medium transition-colors hover:underline hover:cursor-pointer underline-offset-2"
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
                    <div className="flex justify-start">
                        <Button variant='outline' onClick={() => setOpen(prev => !prev)}>
                            <Plus />ADD PROBLEM
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-bright-text text-lg font-medium">Time settings</h1>
                        <div className="flex flex-grow gap-3 items-center">
                            <div className='flex-shrink-0'>
                                From
                            </div>
                            <Input
                                value={starts}
                                placeholder="YYYY-MM-dd hh:mm"
                                onChange={(e) => setStarts(e.target.value)}
                                className="w-[300px]"
                            />
                            <div className='flex-shrink-0'>
                                to
                            </div>
                            <Input
                                value={ends}
                                placeholder="YYYY-MM-dd hh:mm"
                                onChange={(e) => setEnds(e.target.value)}
                                className="w-[300px]"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex gap-5">
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
                    <ContentContainer>
                        <div className="grid grid-cols-12 gap-5 mx-4">
                            <div className="col-span-9 flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-bright-text text-lg font-medium">Add a title</h1>
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
                                    <div className="flex justify-between gap-4">
                                        <div className="flex flex-grow gap-2 items-center">
                                            <Button variant='outline' className='flex-shrink-0' disabled>
                                                ATTACH
                                            </Button>
                                            <div className='flex-shrink-0'>
                                                input file with answer provided
                                            </div>
                                            <Input
                                                value={problem.answer}
                                                placeholder="here"
                                                onChange={handleProblemAnswerChange}
                                                className="flex-grow"
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
                                        <div className="flex flex-wrap gap-3">
                                            <Toggle className="flex-1" pressed={problem.difficulty === 'easy'} onClick={
                                                () => setProblem(prev => ({
                                                    ...prev,
                                                    difficulty: 'easy',
                                                }))
                                            }>
                                                Easy
                                            </Toggle>
                                            <Toggle className="flex-1" pressed={problem.difficulty === 'mid'} onClick={
                                                () => setProblem(prev => ({
                                                    ...prev,
                                                    difficulty: 'mid',
                                                }))
                                            }>Mid</Toggle>
                                            <Toggle className="flex-1" pressed={problem.difficulty === 'hard'} onClick={
                                                () => setProblem(prev => ({
                                                    ...prev,
                                                    difficulty: 'hard',
                                                }))
                                            }>Hard</Toggle>
                                        </div>
                                    </WidgetContent>
                                </Widget>
                            </div>
                        </div>
                    </ContentContainer>
                </DrawerContent>
            </Drawer>
        </ContentContainer>
    );
}
