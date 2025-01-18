import * as API from '@/api';
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format_date } from '@/lib/utils';
import { truncate_address } from '@/lib/strings';

const format_duration = (duration_mins: number): string => {
    if (duration_mins < 0) {
        return "00:00";
    }

    const hours = Math.floor(duration_mins / 60);
    const minutes = duration_mins % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

export default async function ContestsPage() {
    const result = await API.contests.fetchActive();
    const contests = result?.data;

    return (
        <div className="flex justify-center">
            <div className="w-[1200px] flex gap-[20px]">
                <div className="w-full flex flex-col gap-[30px]">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="text-[20px] font-medium">OFFICIAL CONTESTS</h1>
                        <div className="flex gap-[30px]">
                            <Card className="w-[300px]">
                                <CardContent>
                                    <div>
                                        <Badge variant="green">Onboarding</Badge>
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
                                <CardFooter className="pt-[20px]">
                                    <Link href="/hui" size="large">LEADERBOARD</Link>
                                </CardFooter>
                            </Card>

                            <Card className="w-[300px]">
                                <CardContent>
                                    <div>
                                        <Badge>Starting soon</Badge>
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
                                <CardFooter className="pt-[20px]">
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
                                            <TableHeaderCell className='w-[15%]'>Host</TableHeaderCell>
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
                                                    <Badge variant="secondary">Training</Badge>
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
