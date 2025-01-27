import { SolvedTag } from "@/components/solved-tag";
import { Link } from "@/components/ui/link";
import { itoc } from '@/lib/utils';
import {
    TableContainer, TableHead, Table, TableBody,
    TableRow, TableCell, TableHeaderRow, TableHeaderCell,
} from "@/components/ui/table";
import { ContestDetailed, ProblemListItem } from "@/api/dto/response";
import { use } from "react";

export default function Problemset({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);
    const problemset = cdetailed.problems;

    return (
        <TableContainer>
            <TableHead>
                PROBLEMSET
            </TableHead>
            <Table>
                <TableHeaderRow>
                    <TableRow>
                        <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                        <TableHeaderCell className='w-[70%]'>Title</TableHeaderCell>
                    </TableRow>
                </TableHeaderRow>
                <TableBody>
                    {
                        problemset.map((problem, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {itoc(index)}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/contests/${problem.contest_id}/problems/${problem.id}`}
                                    // className={pid === problem.id.toString() ? 'text-bright-text font-semibold' : ''}
                                    >
                                        {problem.title}
                                    </Link>
                                    {
                                        <SolvedTag className="ml-2" state={problem.status} />
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}