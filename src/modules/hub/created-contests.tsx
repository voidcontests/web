import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import Status from '@/modules/contest/status';
import { DateView } from "@/components/date";
import { Link } from "@/ui/link";
import { fetchCreatedContests } from "@/actions/contests";
import Duration from "@/components/duration";
import PaginationControlsClient from "@/components/pagination-controls-client";

type Props = {
    page: number;
};

export default async function CreatedContests({ page }: Props) {
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await fetchCreatedContests(offset, limit);

    if (!result.ok) {
        return (
            <TableContainer>
                <TableTitle>CONTESTS</TableTitle>
                <TableCaption>Failed to load contests: {result.error.message}</TableCaption>
            </TableContainer>
        );
    }

    const contests = result.data.items;
    const total = result.data.meta.total;

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>CONTESTS</span>
                <Link href='/hub/new/contest' size="large">NEW</Link>
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-32">Start</TableHead>
                        <TableHead className="w-32">End</TableHead>
                        <TableHead className="w-32">Duration</TableHead>
                        <TableHead className="w-32">Participants</TableHead>
                        <TableHead className="w-32">Scores</TableHead>
                        <TableHead className="w-32">Status</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        contests.map((contest, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center pr-5'>
                                    {offset + index}/
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contests/${contest.id}`}>
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
                                    <Duration value={contest.duration_mins} as='minutes' full />
                                </TableCell>
                                <TableCell>
                                    {
                                        contest.max_entries === undefined
                                            ? contest.participants
                                            : `${contest.participants}/${contest.max_entries}`
                                    }
                                </TableCell>
                                <TableCell>
                                    <Link href={`/contests/${contest.id}/scores`}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Status contest={contest} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    contests.length === 0
                        ? <TableCaption>No created contests</TableCaption>
                        : <TableCaption>
                            <PaginationControlsClient
                                total={total}
                                limit={limit}
                                offset={offset}
                            />
                        </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
