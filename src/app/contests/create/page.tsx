import { Plus, Bold, Heading, Code, Italic, Link2, ListCollapse, TextQuote } from "lucide-react";
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
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Problem {
    letter: string;
    name: string,
    difficulty: 'easy' | 'mid' | 'hard',
}

const problemset: Problem[] = [
    {
        letter: 'A',
        name: 'Fibonacci Rotation',
        difficulty: 'easy',
    },
    {
        letter: 'B',
        name: 'Toilet Paper',
        difficulty: 'easy',
    },
    {
        letter: 'C',
        name: 'Corporation War',
        difficulty: 'easy',
    },
    {
        letter: 'D',
        name: 'Cristmas Tree',
        difficulty: 'mid',
    },
    {
        letter: 'E',
        name: 'Procrastinatioooooooon',
        difficulty: 'hard',
    },
    {
        letter: 'F',
        name: 'I have 3yrs comercial expirience, I swear',
        difficulty: 'hard',
    },
];

export default function CreateProblem() {
    return (
        <div className="flex justify-center">
            <div className="w-[1200px] grid grid-cols-10 gap-5">
                <div className="col-span-7 flex flex-col gap-[30px]">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="text-text text-lg font-medium">Add a title</h1>
                        <Input placeholder="Title" />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex justify-between items-center">
                            <h1 className="text-text text-lg font-medium">Add a description</h1>
                            <div>
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
                        <TextArea placeholder="Write a description for your contest here" className="h-[200px]" />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <TableContainer>
                            <TableHead className="gap-1">
                                <span>PROBLEMSET</span>
                                <span className="font-regular text-text-muted">- 5 problems</span>
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell>#</TableHeaderCell>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell>Difficulty</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        problemset.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{problem.letter}</TableCell>
                                                <TableCell>
                                                    <Link href='/'>{problem.name}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        problem.difficulty === 'easy'
                                                            ? <Badge variant='green'>Easy</Badge>
                                                            : problem.difficulty === 'mid'
                                                                ? <Badge variant='orange'>Mid</Badge>
                                                                : <Badge variant='red'>Hard</Badge>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="flex justify-between">
                            <Button variant='outline'><Plus /> ADD PROBLEM</Button>
                            <div className="flex gap-[20px]">
                                <Button variant='dashed'>SAVE AS DRAFT</Button>
                                <Button>SUBMIT CONTEST</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <Widget>
                        <WidgetContent>
                            <div className="flex justify-between items-center">
                                <WidgetTitle>TIME SETTINGS</WidgetTitle>
                                <Link href='/' size="large">CHANGE</Link>
                            </div>
                            <div>
                                Start - 31 Dec, 11 PM
                            </div>
                            <div>
                                Duration - 3 hours
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <WidgetTitle>PARTICIPANTS</WidgetTitle>
                                <Link href='/' size="large">CHANGE</Link>
                            </div>
                            <div>
                                800 slots
                            </div>
                        </WidgetContent>
                    </Widget>
                </div>
            </div>

            {/* <div className="w-[1200px] flex flex-col gap-[30px]">
                <TextArea placeholder="hello" />
                <div className="flex gap-[20px]">
                    <Input placeholder="this is input" />
                    <Button>Subscrive</Button>
                </div>
            </div> */}
        </div>
    );
}
