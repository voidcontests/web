import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Link from "next/link";

interface Contest {
    title: string,
    host_username: string,
    host_url: string,
    type: 'paid' | 'training',
    entry_price_tons: number,
    prize_pot_tons: number,
    start_date: string,
    end_date: string,
}

const contests: Contest[] = [
    {
        title: 'canary-o1',
        host_username: 'ndbtea',
        host_url: 'https://github.com/jus1d',
        type: 'paid',
        entry_price_tons: 3,
        prize_pot_tons: 69,
        start_date: '19 Jan, 1:00',
        end_date: '21 Jan, 1:00',
    },
    {
        title: 'la guerra de marmotas',
        host_username: 'reilix',
        host_url: 'https://github.com/Re1l1x',
        type: 'training',
        entry_price_tons: 1,
        prize_pot_tons: 21,
        start_date: '24 Sep, 0:00',
        end_date: '24 Jan, 12:00',
    },
    {
        title: 'trenbolon contest #2',
        host_username: 'ccc',
        host_url: 'https://github.com/jus1d',
        type: 'training',
        entry_price_tons: 2,
        prize_pot_tons: 6969,
        start_date: '14 Sep, 1:00',
        end_date: '21 Jan, 1:00',
    },
    {
        title: 'ultimate coding challenge',
        host_username: 'code_master',
        host_url: 'https://github.com/code_master',
        type: 'paid',
        entry_price_tons: 5,
        prize_pot_tons: 150,
        start_date: '15 Feb, 10:00',
        end_date: '20 Feb, 18:00',
    },
    {
        title: 'data science hackathon',
        host_username: 'data_nerd',
        host_url: 'https://github.com/data_nerd',
        type: 'training',
        entry_price_tons: 0,
        prize_pot_tons: 50,
        start_date: '01 Mar, 9:00',
        end_date: '05 Mar, 17:00',
    },
    {
        title: 'web development showdown',
        host_username: 'dev_guru',
        host_url: 'https://github.com/dev_guru',
        type: 'paid',
        entry_price_tons: 4,
        prize_pot_tons: 200,
        start_date: '10 Mar, 12:00',
        end_date: '15 Mar, 12:00',
    },
    {
        title: 'AI innovation contest',
        host_username: 'ai_expert',
        host_url: 'https://github.com/ai_expert',
        type: 'training',
        entry_price_tons: 2,
        prize_pot_tons: 100,
        start_date: '20 Mar, 8:00',
        end_date: '25 Mar, 20:00',
    },
    {
        title: 'mobile app development challenge',
        host_username: 'app_dev',
        host_url: 'https://github.com/app_dev',
        type: 'paid',
        entry_price_tons: 3,
        prize_pot_tons: 75,
        start_date: '01 Apr, 14:00',
        end_date: '10 Apr, 14:00',
    },
    {
        title: 'game development jam',
        host_username: 'game_dev',
        host_url: 'https://github.com/game_dev',
        type: 'training',
        entry_price_tons: 1,
        prize_pot_tons: 30,
        start_date: '15 Apr, 10:00',
        end_date: '20 Apr, 18:00',
    },
    {
        title: 'cybersecurity capture the flag',
        host_username: 'sec_expert',
        host_url: 'https://github.com/sec_expert',
        type: 'paid',
        entry_price_tons: 6,
        prize_pot_tons: 250,
        start_date: '01 May, 9:00',
        end_date: '05 May, 17:00',
    },
    {
        title: 'blockchain development workshop',
        host_username: 'blockchain_bro',
        host_url: 'https://github.com/blockchain_bro',
        type: 'training',
        entry_price_tons: 0,
        prize_pot_tons: 40,
        start_date: '10 May, 11:00',
        end_date: '15 May, 15:00',
    },
];

export default function Contests() {
    return (
        <div className="flex justify-center">
            <div className="pt-6 w-[1200px]">
                {/* Official contests cards */}
                <h1 className="text-3xl font-medium pb-4">Official competitions</h1>
                <div className="flex gap-8">
                    <Card className="w-[260px]">
                        <CardHeader className="pb-2">
                            <div>
                                <Badge variant="green">
                                    STARTING SOON
                                </Badge>
                            </div>
                            <h1 className="text-lg font-medium text-foreground">
                                Hack-a-marmot
                            </h1>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 pb-2">
                            <Separator />
                            <div className="flex justify-between">
                                <div>Prize Pot</div>
                                <div>69 TON</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Entry Price</div>
                                <div>3 TON</div>
                            </div>
                            <Separator />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-6">
                            <div>
                                Hosted by <Link href="https://github.com/jus1d" className="text-link hover:underline underline-offset-2">@ndbtea</Link>
                            </div>
                            <Link href="/contest/69">
                                <Button variant="link">APPLY</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="w-[260px]">
                        <CardHeader className="pb-2">
                            <div>
                                <Badge variant="orange">
                                    ENDS IN 18h
                                </Badge>
                            </div>
                            <h1 className="text-lg font-medium text-foreground">
                                Introduction
                            </h1>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 pb-2">
                            <Separator />
                            <div className="flex justify-between">
                                <div>Prize Pot</div>
                                <div>69 TON</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Entry Price</div>
                                <div>3 TON</div>
                            </div>
                            <Separator />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-6">
                            <div>
                                Hosted by <Link href="https://github.com/jus1d" className="text-link hover:underline underline-offset-2">@ccc</Link>
                            </div>
                            <Link href="/contest/52/leaderboard">
                                <Button variant="link">LEADERBOARD</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>

                {/* Public Contests */}
                <h1 className="text-3xl font-medium pt-6 pb-4">Public contests</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="ml-4">#</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Host</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Entry Price</TableHead>
                            <TableHead>Prize Pot</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            contests.map((contest, index) => (
                                <TableRow>
                                    <TableCell>{`${index}.`}</TableCell>
                                    <TableCell>{contest.title}</TableCell>
                                    <TableCell>
                                        <Link href={contest.host_url} className="text-link hover:underline underline-offset-2">{`@${contest.host_username}`}</Link>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            contest.type == "paid" ?
                                                <Badge variant="green">PAID</Badge> :
                                                <Badge variant="orange">TRAINING</Badge>
                                        }
                                    </TableCell>
                                    <TableCell>{contest.entry_price_tons} TON</TableCell>
                                    <TableCell>{contest.prize_pot_tons} TON</TableCell>
                                    <TableCell>{contest.start_date}</TableCell>
                                    <TableCell>{contest.end_date}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}