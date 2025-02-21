import { ContestDetailed } from "@/actions/dto/response";
import { format_duration } from "@/lib/utils";
import { use } from "react";
import {
    Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell
} from "@/components/ui/table-inline";
import Datetime from "@/components/datetime";
import Address from "@/components/address";

export function ContestAboutTable({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    return (
        <div className="border rounded-xl bg-surface p-5 flex flex-col gap-2 not-dark:shadow-md">
            <h1 className="text-foreground text-sm font-medium">
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
                            <Address address={cdetailed.creator.address} />
                        </TableCell>
                        <TableCell>{cdetailed.participants}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
