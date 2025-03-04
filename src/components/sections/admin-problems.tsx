import { getAccount, getAdminProblems } from '@/actions/actions';
import { DifficultyTag } from '@/components/difficulty-tag';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import DateView from '../date';

export default async function AdminProblems() {
    const [problems, account] = await Promise.all([getAdminProblems(), getAccount()]);

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>PROBLEMS</span>
                {
                    account.role.name !== 'banned' &&
                    <Link href='/hub/new/problem' size="large">NEW</Link>
                }
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className='w-3xs'>Created at</TableHead>
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
                                    <DifficultyTag difficulty={problem.difficulty} />
                                </TableCell>
                                <TableCell className='w-3xs'>
                                    <DateView date={problem.created_at} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    problems.data.length === 0 &&
                    <TableCaption>
                        No created problems.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
