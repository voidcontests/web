import { Separator } from "@/components/ui/separator";
import { truncate_address } from '@/lib/strings';
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";
import { format_date, format_duration } from '@/lib/utils';
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
    TableCaption,
} from "@/components/ui/table";
import {
    Card, CardContent, CardTitle, CardFooter
} from "@/components/ui/card";
import * as API from '@/api';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contests :: VOID*',
};

export default async function ContestsPage() {
    const result = await API.contests.fetchActive();
    const contests = result?.data;

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex gap-5">
                <div className="w-full flex flex-col gap-7 mx-4">
                    <div className="flex flex-col gap-2.5">
                        <h1 className="text-xl font-medium">OFFICIAL CONTESTS</h1>
                        <div className="flex gap-7">
                            <Card className="w-[300px]">
                                <CardContent>
                                    <div>
                                        <Tag variant="green">Onboarding</Tag>
                                    </div>
                                    <CardTitle>
                                        Introduction
                                    </CardTitle>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <div>Prize pot</div>
                                        <div>69 TON</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>Entry price</div>
                                        <div>0.5 TON</div>
                                    </div>
                                    <Separator />
                                    <div>
                                        Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-5">
                                    <Button variant="link" className="w-full">LEADERBOARD</Button>
                                </CardFooter>
                            </Card>

                            <Card className="w-[300px]">
                                <CardContent>
                                    <div>
                                        <Tag>Starting soon</Tag>
                                    </div>
                                    <CardTitle>
                                        The Void Round 297
                                    </CardTitle>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <div>Prize pot</div>
                                        <div>117 TON</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>Entry price</div>
                                        <div>1 TON</div>
                                    </div>
                                    <Separator />
                                    <div>
                                        Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-5">
                                    <Button variant="link" className="w-full">APPLY</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    <Separator />
                    <TableContainer>
                        <TableHead>
                            PUBLIC COMPETITIONS
                        </TableHead>
                        <Table>
                            {
                                contests !== undefined && contests.length !== 0 || true
                                    ? <TableHeaderRow>
                                        <TableRow>
                                            <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                                            <TableHeaderCell className='w-[35%]'>Title</TableHeaderCell>
                                            <TableHeaderCell className='w-[15%]'>Host address</TableHeaderCell>
                                            <TableHeaderCell className='w-[10%]'>Type</TableHeaderCell>
                                            <TableHeaderCell className='w-[23%]'>Start</TableHeaderCell>
                                            <TableHeaderCell className='w-[12%]'>Duration</TableHeaderCell>
                                        </TableRow>
                                    </TableHeaderRow>
                                    : <></>
                            }
                            <TableBody>
                                {
                                    contests !== undefined && contests.length !== 0
                                        ? contests.map((contest, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{`${index}/`}</TableCell>
                                                <TableCell>
                                                    <Link href={`/contests/${contest.id}`}>
                                                        {contest.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link href={`https://tonscan.org/address/${contest.creator.address}`}>
                                                        {truncate_address(contest.creator.address)}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Tag variant="secondary">Training</Tag>
                                                </TableCell>
                                                <TableCell>{format_date(new Date(contest.starting_at))}</TableCell>
                                                <TableCell>{format_duration(contest.duration_mins)}</TableCell>
                                            </TableRow>
                                        ))
                                        : <></>
                                }
                            </TableBody>
                            {
                                contests === undefined
                                    ? <TableCaption>loading...</TableCaption>
                                    : contests.length === 0
                                        ? <TableCaption>no public contests</TableCaption>
                                        : <></>
                            }
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
