import { ContestDetailed } from "@/api/dto/response";
import { format_duration } from "@/lib/utils";
import { format_date } from '@/lib/utils';
import { Link } from "@/components/ui/link";
import { use } from "react";
import {
    Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell
} from "../ui/table-inline";
import { truncate_address } from "@/lib/strings";
import Datetime from "../datetime";

export function ContestAboutTable({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <div className="border rounded-xl bg-secondary p-5 flex flex-col gap-2">
            <h1 className="text-bright-text text-sm font-medium">
                ABOUT
            </h1>
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        <TableHead>Starts</TableHead>
                        <TableHead>Ends</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Creator</TableHead>
                        <TableHead>Participants</TableHead>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Datetime timestamp={cdetailed.start_time} />
                        </TableCell>
                        <TableCell>
                            <Datetime timestamp={cdetailed.end_time} />
                        </TableCell>
                        <TableCell>{format_duration(cdetailed.duration_mins)}</TableCell>
                        <TableCell>
                            { /*TODO: Move to <Address /> component */}
                            <Link href={`https://tonscan.org/address/${cdetailed.creator.address}`}>
                                {truncate_address(cdetailed.creator.address, 6)}
                            </Link>
                        </TableCell>
                        <TableCell>{cdetailed.participants}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
