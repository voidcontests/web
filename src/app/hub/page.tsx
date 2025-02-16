import { getAdminContests, getAdminProblems } from '@/actions/actions';
import ContentContainer from '@/components/content-container';
import Difficulty from '@/components/difficulty';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import { format_date, format_duration } from '@/lib/utils';

export default async function Page() {
    const problems = await getAdminProblems();
    const contests = await getAdminContests();

    return (
        <ContentContainer>
            <TableContainer>
                <TableTitle className='flex justify-between'>
                    <span>CONTESTS</span>
                    <Link href='/hub/new/contest' size="large">NEW</Link>
                </TableTitle>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody>
                        {
                            contests.data.map((contest, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-center'>{contest.id}</TableCell>
                                    <TableCell>
                                        <Link href={`/hub/contests/${contest.id}`}>
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
                                                : 'Not limited'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {contest.participants}
                                    </TableCell>
                                    <TableCell>
                                        {format_date(new Date(contest.created_at))}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                <TableTitle className='flex justify-between'>
                    <span>PROBLEMS</span>
                    <Link href='/hub/new/problem' size="large">NEW</Link>
                </TableTitle>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead className='w-3xs'>Created At</TableHead>
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
                                        <Link href={`/hub/problem/${problem.id}`}>
                                            {problem.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Difficulty difficulty={problem.difficulty} />
                                    </TableCell>
                                    <TableCell className='w-3xs'>
                                        {format_date(new Date(problem.created_at))}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </ContentContainer>
    );
}
