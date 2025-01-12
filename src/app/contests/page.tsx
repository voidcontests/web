'use client';

import * as Api from '@/api';
import type { Contest } from "@/models/contest";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import React, { useEffect, useState } from "react";
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

export default function ContestsPage() {
    const [contests, setContests] = useState<Contest[] | undefined>();

    useEffect(() => {
        async function fetchContests() {
            try {
                const result = await Api.contests.getContests();
                console.log(result);
                setContests(result?.data || []);
            } catch (error) {
                console.error("Error fetching contests:", error);
                setContests([]);
            }
        }

        fetchContests();
    }, []);

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
                                            <TableHeaderCell className='w-[40%]'>Title</TableHeaderCell>
                                            <TableHeaderCell className='w-[10%]'>Host</TableHeaderCell>
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
                                                    <Link href={`https://tonscan.org/address/${contest.creator_address}`}>{`host`}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">Training</Badge>
                                                </TableCell>
                                                <TableCell>{new Date(contest.starting_at).toISOString()}</TableCell>
                                                <TableCell>{contest.duration_mins}mins</TableCell>
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
                    {/* <TableContainer>
                        <TableHead>
                            PAST COMPETITIONS
                        </TableHead>
                        <Table>
                            <TableHeaderRow>
                                <TableRow>
                                    <TableHeaderCell>#</TableHeaderCell>
                                    <TableHeaderCell>Title</TableHeaderCell>
                                    <TableHeaderCell>Host</TableHeaderCell>
                                    <TableHeaderCell>Type</TableHeaderCell>
                                    <TableHeaderCell>Participants</TableHeaderCell>
                                    <TableHeaderCell>Prize pot</TableHeaderCell>
                                    <TableHeaderCell>Finished</TableHeaderCell>
                                    <TableHeaderCell></TableHeaderCell>
                                </TableRow>
                            </TableHeaderRow>
                            <TableBody>
                                {
                                    pastContests.map((contest, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{`${index}/`}</TableCell>
                                            <TableCell>{contest.title}</TableCell>
                                            <TableCell>
                                                <Link href={contest.host_url}>{`@${contest.host_username}`}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    contest.type == "paid" ?
                                                        <Badge variant="green">Paid</Badge> :
                                                        <Badge variant="secondary">Training</Badge>
                                                }
                                            </TableCell>
                                            <TableCell>{contest.participants} TON</TableCell>
                                            <TableCell>{contest.prize_pot_tons} TON</TableCell>
                                            <TableCell>{contest.finish}</TableCell>
                                            <TableCell>
                                                <Link href={`/contest/${index}/scoring`} size="large">
                                                    SCORING
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </div>
            </div>
        </div>
    );
}
