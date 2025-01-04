import { Link } from "@/components/ui/link";
import { Badge } from "@/components/ui/badge";
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderRow,
  TableHeaderCell,
} from "@/components/ui/table";
import {
  Card, CardContent, CardTitle, CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Contest {
  title: string,
  host_username: string,
  host_url: string,
  type: 'paid' | 'training',
  participants?: number,
  entry_price_tons?: number,
  prize_pot_tons: number,
  start?: string,
  finish?: string,
  duration?: string,
}

const pastContests: Contest[] = [
  {
    title: 'canary-contest',
    host_username: 'ndbtea',
    host_url: 'https://github.com/jus1d',
    type: 'training',
    participants: 291,
    prize_pot_tons: 0,
    finish: '21 Jan, 7 PM',
  },
  {
    title: 'La Guerra de Marmotas',
    host_username: 'reilix',
    host_url: 'https://github.com/Re1l1x',
    type: 'paid',
    participants: 2100,
    prize_pot_tons: 3150,
    finish: '28 May, 2 PM',
  },
  {
    title: 'VOID Round 296',
    host_username: 'ccc',
    host_url: 'https://github.com/jus1d',
    type: 'paid',
    participants: 97,
    prize_pot_tons: 485,
    finish: '24 Nov, 11 PM',
  },
];

const publicContests: Contest[] = [
  {
    title: 'canary-contest',
    host_username: 'ndbtea',
    host_url: 'https://github.com/jus1d',
    type: 'paid',
    entry_price_tons: 5,
    prize_pot_tons: 115,
    start: '19 Jan, 9 PM',
    duration: '3h',
  },
  {
    title: 'La Guerra de Marmotas',
    host_username: 'reilix',
    host_url: 'https://github.com/Re1l1x',
    type: 'paid',
    entry_price_tons: 3,
    prize_pot_tons: 21,
    start: '24 Jul, 5 PM',
    duration: '5h',
  },
  {
    title: 'VOID Round 297',
    host_username: 'ccc',
    host_url: 'https://github.com/jus1d',
    type: 'training',
    entry_price_tons: 2,
    prize_pot_tons: 38,
    start: '7 Dec, 4 AM',
    duration: '12h',
  }
];

export default function ContestsPage() {
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
              <TableHeaderRow>
                <TableRow>
                  <TableHeaderCell>#</TableHeaderCell>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Host</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Entry price</TableHeaderCell>
                  <TableHeaderCell>Prize pot</TableHeaderCell>
                  <TableHeaderCell>Start</TableHeaderCell>
                  <TableHeaderCell>Duration</TableHeaderCell>
                </TableRow>
              </TableHeaderRow>
              <TableBody>
                {
                  publicContests.map((contest, index) => (
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
                      <TableCell>{contest.entry_price_tons} TON</TableCell>
                      <TableCell>{contest.prize_pot_tons} TON</TableCell>
                      <TableCell>{contest.start}</TableCell>
                      <TableCell>{contest.duration}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
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
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
