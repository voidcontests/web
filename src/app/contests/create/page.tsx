"use client";

import {
    Plus, Paperclip, Bold, Heading, Code,
    Italic, Link2, ListCollapse, TextQuote,
    Trash,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "@/components/ui/link";
import {
    Widget,
    WidgetContent,
    WidgetTitle,
} from "@/components/ui/widget";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
    TableFooter,
    TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { cn, itoc } from "@/lib/utils";
import { useState } from "react";

interface Problem {
    title: string,
    statement: string,
    answer: string,
    // difficulty: 'easy' | 'mid' | 'hard',
}

interface Contest {
    title: string,
    description?: string,
    problemset: Problem[],
}

export default function CreateProblem() {
    const [contest, setContest] = useState<Contest>({
        title: '',
        description: '',
        problemset: [],
    });

    const [problem, setProblem] = useState<Problem>({
        title: '',
        statement: '',
        answer: '',
    });

    const handleContestTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest(prev => ({
            ...prev,
            title: e.target.value,
        }));
    }

    const handleContestDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContest(prev => ({
            ...prev,
            description: e.target.value,
        }));
    }

    const handleProblemTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(prev => ({
            ...prev,
            title: e.target.value,
        }));
    }

    const handleProblemStatementChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProblem(prev => ({
            ...prev,
            statement: e.target.value,
        }));
    }


    const handleProblemAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(prev => ({
            ...prev,
            answer: e.target.value,
        }));
    }

    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-center">
            <div className="w-[1200px] grid grid-cols-10 gap-5">
                <div className="col-span-7 flex flex-col gap-[30px]">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="text-text text-lg font-medium">Add a title</h1>
                        <Input
                            value={contest.title}
                            placeholder="Title"
                            onChange={handleContestTitleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex justify-between items-center">
                            <h1 className="text-text text-lg font-medium">Add a description</h1>
                            <div className="flex gap-[5px]">
                                <Toggle size='sm'>
                                    <Heading />
                                </Toggle>
                                <Toggle size='sm'>
                                    <Bold />
                                </Toggle>
                                <Toggle size='sm'>
                                    <Italic />
                                </Toggle>
                                <Toggle size='sm'>
                                    <Code />
                                </Toggle>
                                <Toggle size='sm'>
                                    <Link2 />
                                </Toggle>
                                <Toggle size='sm'>
                                    <ListCollapse />
                                </Toggle>
                                <Toggle size='sm'>
                                    <TextQuote />
                                </Toggle>
                            </div>
                        </div>
                        <TextArea
                            value={contest.description}
                            placeholder="Write a description for your contest here"
                            onChange={handleContestDescriptionChange}
                            className="h-[200px]"
                        />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <TableContainer>
                            <TableHead className="gap-1">
                                <span>PROBLEMSET</span>
                                {
                                    contest.problemset.length !== 0 &&
                                    <span className="font-regular text-text-muted">{`- ${contest.problemset.length} problems`}</span>
                                }
                            </TableHead>
                            <Table>
                                {
                                    contest.problemset.length === 0 &&
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
                                        contest.problemset.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{itoc(index)}</TableCell>
                                                <TableCell>{problem.title}</TableCell>
                                                <TableCell>
                                                    <Badge variant='secondary'>not set</Badge>
                                                </TableCell>
                                                <TableCell className="w-[100px]">
                                                    <span
                                                        className="text-base text-text-link font-medium transition-colors hover:underline hover:cursor-pointer underline-offset-2"
                                                        onClick={() => {
                                                            setContest(prev => ({
                                                                ...prev,
                                                                problemset: prev.problemset.filter((_, i) => i !== index),
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
                            <div className="flex gap-[20px]">
                                <Button variant='dashed'>SAVE AS DRAFT</Button>
                                <Button
                                    disabled={contest.problemset.length === 0 || contest.title === ''}
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
                                <Link href='/' size="large">SET</Link>
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
                    });
                }
                setOpen(prev => !prev);
            }}>
                <DrawerContent className="">
                    <div className="max-h-[90] overflow-y-auto pb-10">
                        <div className="flex justify-center">
                            <div className="w-[1200px] flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[10px]">
                                    <h1 className="text-text text-lg font-medium">Add a title</h1>
                                    <Input
                                        value={problem.title}
                                        placeholder="Title"
                                        onChange={handleProblemTitleChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-text text-lg font-medium">Add a description</h1>
                                        <div className="flex gap-[5px]">
                                            <Toggle size='sm'>
                                                <Heading />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <Bold />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <Italic />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <Code />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <Link2 />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <ListCollapse />
                                            </Toggle>
                                            <Toggle size='sm'>
                                                <TextQuote />
                                            </Toggle>
                                        </div>
                                    </div>
                                    <TextArea
                                        value={problem.statement}
                                        placeholder="Write a description for your contest here"
                                        onChange={handleProblemStatementChange}
                                        className="h-[400px]"
                                    />
                                    <div className="flex justify-between">
                                        <div className="flex gap-[10px] items-center">
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
                                                !problem.title || !problem.statement || !problem.answer
                                            }
                                            onClick={() => {
                                                setContest(prev => ({
                                                    ...prev,
                                                    problemset: [...prev.problemset, problem],
                                                }));
                                                setProblem({
                                                    title: '',
                                                    statement: '',
                                                    answer: '',
                                                });
                                                setOpen(false);
                                            }}
                                        >SUBMIT PROBLEM</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
