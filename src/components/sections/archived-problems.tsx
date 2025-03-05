import { getProblemArchive } from '@/actions/actions';
import { DifficultyTag } from '@/components/difficulty-tag';
import { Link } from "@/components/ui/link";
import {
    TableContainer, Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell, TableTitle, TableCaption
} from "@/components/ui/table";
import Address from '@/components/address';

export default async function ArchivedProblems() {
    const problems = await getProblemArchive();

    console.log(problems);

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>PROBLEM ARCHIVE</span>
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className='w-122'>Writer address</TableHead>
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
                                <TableCell className='w-122'>
                                    <Address address={problem.writer.address} notruncate />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    problems.data.length === 0 &&
                    <TableCaption>
                        There are no archived problems at the moment. Please wait
                        until the contest ends — then, some problems may become public.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
