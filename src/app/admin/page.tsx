import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn, format_date, format_duration } from '@/lib/utils';
import ContentContainer from '@/components/content-container';


import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle
} from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { capitalize } from "@/lib/strings";
import { getAdminContests, getAdminProblems } from '@/actions/actions';

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
}

export default async function Page() {
    const problems = await getAdminProblems();
    const contests = await getAdminContests();

    return (
        <ContentContainer>
            <TableContainer>
                <TableTitle>
                    CONTESTS
                </TableTitle>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Duration</TableHead>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody>
                        {
                            contests.data.map((contest, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-center'>{contest.id}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/contests/${contest.id}`}>
                                            {contest.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {format_date(new Date(contest.start_time))}
                                    </TableCell>
                                    <TableCell>
                                        {format_date(new Date(contest.end_time))}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            contest.duration_mins !== 0
                                                ? format_duration(contest.duration_mins)
                                                : '-'
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {/* <TableCaption>
                        Hello
                    </TableCaption> */}
                </Table>
            </TableContainer>
            <TableContainer>
                <TableTitle>
                    PROBLEMS
                </TableTitle>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Difficulty</TableHead>
                            {/* <TableHead>Created At</TableHead> */}
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody>
                        {
                            problems.data.map((problem, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-center'>
                                        {problem.id}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/admin/problem/${problem.id}`}>
                                            {problem.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Tag variant={difficultyToBadgeType[problem.difficulty]}>{capitalize(problem.difficulty)}</Tag>
                                    </TableCell>
                                    {/* <TableCell>
                                        {format_date(new Date(problem.created_at))}
                                    </TableCell> */}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {/* <TableCaption>
                        Hello
                    </TableCaption> */}
                </Table>
            </TableContainer>
        </ContentContainer>
    );
}
