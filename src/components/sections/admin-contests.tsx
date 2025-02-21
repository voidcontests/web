import { getAccount, getAdminContests } from '@/actions/actions';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import { format_date, format_duration } from '@/lib/utils';

export default async function AdminContests() {
    const [contests, account] = await Promise.all([getAdminContests(), getAccount()]);

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>CONTESTS</span>
                {
                    account.role.name !== 'banned' &&
                    <Link href='/hub/new/contest' size="large">NEW</Link>
                }
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Starting at</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Leaderboard</TableHead>
                        <TableHead>Created at</TableHead>
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
                                    <Link href={`/contest/${contest.id}/leaderboard`}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {format_date(new Date(contest.created_at))}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    contests.data.length === 0 &&
                    <TableCaption>
                        No created contests.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
