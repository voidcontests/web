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
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

interface Contest {
  title: string,
  host_username: string,
  host_url: string,
  type: 'paid' | 'training',
  entry_price_tons: number,
  prize_pot_tons: number,
  start: string,
  duration: string,
}

const contests: Contest[] = [
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
    title: 'La Guerra De Marmotas',
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
      <div className="w-[1200px] flex gap-[20px] m-[40px]">
        <TableContainer>
          <TableHead>
            PUBLIC COMPETITIONS
          </TableHead>
          <Table>
            <TableHeaderRow>
              <TableRow>
                <TableHeaderCell className="ml-4">#</TableHeaderCell>
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
                contests.map((contest, index) => (
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
      </div>
    </div>
  );
}
