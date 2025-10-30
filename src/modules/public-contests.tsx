import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableCaption, TableTitle } from '@/ui/table';
import { ContestListItem } from '@/lib/models';
import { DateView } from '@/components/date';
import { Link } from '@/ui/link';
import Duration from '@/components/duration';
import { Username } from '@/components/username';
import PaginationControlsLink from '@/components/pagination-controls-link';

const TITLE = 'PUBLIC CONTESTS';
const LIMIT = 10;

type Props = {
    contests: ContestListItem[];
    total: number;
    offset: number;
};

export default function PublicContests({ contests, total, offset }: Props) {
    return (
        <TableContainer>
            <TableTitle>
                {TITLE}
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead className='w-32'>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className='w-32'>Host</TableHead>
                        <TableHead className='w-32'>Start</TableHead>
                        <TableHead className='w-32'>End</TableHead>
                        <TableHead className='w-32'>Duration</TableHead>
                        <TableHead className='w-32'>Participants</TableHead>
                        <TableHead className='w-32'>Total slots</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {contests.map((contest, index) => (
                        <TableRow key={index}>
                            <TableCell>{contest.id}</TableCell>
                            <TableCell>
                                <Link href={`/contests/${contest.id}`}>
                                    {contest.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Username username={contest.creator.username} />
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
                            <TableCell>{contest.participants}</TableCell>
                            <TableCell>{contest.max_entries || 'Not limited'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {
                    contests.length === 0
                        ? <TableCaption>No public contests</TableCaption>
                        : <TableCaption>
                            <PaginationControlsLink
                                total={total}
                                limit={LIMIT}
                                offset={offset}
                            />
                        </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
