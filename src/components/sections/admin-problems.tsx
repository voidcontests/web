'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from "@/components/ui/table";
import { Account, Pagination, ProblemListItem } from '@/actions/models/response';
import { DifficultyTag } from '@/components/difficulty-tag';
import { DateView } from "@/components/date";
import { Link } from "@/components/ui/link";
import { use } from 'react';

export default function AdminProblems({ account, problems }: { account: Promise<Account>, problems: Promise<Pagination<ProblemListItem>> }) {
    const acc = use(account);
    const ps = use(problems);

    return (
        <TableContainer>
            <TableTitle className='flex justify-between'>
                <span>PROBLEMS</span>
                {
                    acc.role.name !== 'banned' &&
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
                        ps.items.map((problem, index) => (
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
                    ps.items.length === 0 &&
                    <TableCaption>
                        No created problems.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
