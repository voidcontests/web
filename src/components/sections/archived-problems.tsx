'use client';

import { TableContainer, Table, TableHeader, TableHeaderRow, TableHead, TableBody, TableRow, TableCell, TableTitle, TableCaption } from '@/components/ui/table';
import { DifficultyTag } from '@/components/difficulty-tag';
import { ProblemList } from '@/actions/dto/response';
import { Link } from '@/components/ui/link';
import Address from '@/components/address';
import { use } from 'react';

export default function ArchivedProblems({ problems }: { problems: Promise<ProblemList> }) {
    const ps = use(problems);

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
                        ps.data.map((problem, index) => (
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
                    ps.data.length === 0 &&
                    <TableCaption>
                        Archive is empty now.
                    </TableCaption>
                }
            </Table>
        </TableContainer>
    );
}
