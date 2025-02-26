import { getAccount, getAdminContests } from '@/actions/actions';
import { ContestListItem } from '@/actions/dto/response';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import { format_duration } from '@/lib/utils';
import ContestStatus from '../contest-status';
import DateView from '../date';

export default async function AdminContests() {
    // TODO: add loadings
    const [contests, account] = await Promise.all([getAdminContests(), getAccount()]);

    const is_live = (contest: ContestListItem): boolean => {
        const now = new Date();
        const start = new Date(contest.start_time);
        const end = new Date(contest.end_time);

        return now > start && now < end;
    }

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
                        <TableHead>Total slots</TableHead>
                        <TableHead>Leaderboard</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        contests.data.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center pr-5'>
                                    {contest.id}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/hub/contests/${contest.id}`}>
                                        {contest.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.start_time} />
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.end_time} />
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
                                    {contest.max_entries || 'Not limited'}
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contest/${contest.id}/leaderboard`}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <DateView date={contest.created_at} />
                                </TableCell>
                                <TableCell>
                                    <ContestStatus contest={contest} />
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
