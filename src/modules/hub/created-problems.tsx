import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/ui/table";
import Difficulty from '@/components/difficulty';
import { Link } from "@/ui/link";
import { fetchCreatedProblems } from "@/actions/problems";
import TimeLimit from "@/modules/problem/time-limit";
import MemoryLimit from "@/modules/problem/memory-limit";
import PaginationControlsClient from "@/components/pagination-controls-client";

type Props = {
    page: number;
};

export default async function CreatedProblems({ page }: Props) {
    const limit = 10;
    const offset = (page - 1) * limit;

    const result = await fetchCreatedProblems(offset, limit);

    if (!result.ok) {
        return (
            <TableContainer>
                <TableTitle>PROBLEMS</TableTitle>
                <TableCaption>Failed to load problems: {result.error.message}</TableCaption>
            </TableContainer>
        );
    }

    const problems = result.data.items;
    const total = result.data.meta.total;

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>PROBLEMS</span>
                <Link href='/hub/new/problem' size="large">NEW</Link>
            </TableTitle>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="w-64">Difficulty</TableHead>
                        <TableHead className="w-64">Time limit</TableHead>
                        <TableHead className="w-64">Memory limit</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {
                        problems.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center'>
                                    {offset + index}/
                                </TableCell>
                                <TableCell>
                                    <Link href={`/hub/preview/problems/${problem.id}`}>
                                        {problem.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Difficulty difficulty={problem.difficulty} />
                                </TableCell>
                                <TableCell>
                                    <TimeLimit ms={problem.time_limit_ms}  />
                                </TableCell>
                                <TableCell>
                                    <MemoryLimit mb={problem.memory_limit_mb} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    problems.length === 0
                        ? <TableCaption>No created problems</TableCaption>
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
