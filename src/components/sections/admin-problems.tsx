import { getAdminProblems } from '@/actions/actions';
import Difficulty from '@/components/difficulty';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle,
    TableCaption
} from "@/components/ui/table";
import { format_date } from '@/lib/utils';

export default async function AdminProblems() {
    const problems = await getAdminProblems();

    return (
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
                                    <Difficulty difficulty={problem.difficulty} />
                                </TableCell>
                                <TableCell className='w-3xs'>
                                    {format_date(new Date(problem.created_at))}
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
