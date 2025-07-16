import { ContestDetailed } from "@/actions/models/response";
import { format_duration } from "@/lib/utils";
import { use } from "react";
import {
    Table, TableHeader, TableHeaderRow, TableHead,
    TableBody, TableRow, TableCell
} from "@/components/ui/table-inline";
import { DateView } from "@/components/date";
import { Response } from "@/actions";

export function ContestAboutTable({ contest }: { contest: Promise<Response<ContestDetailed>> }) {
    const { data: cdetailed } = use(contest);

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
                            <DateView date={cdetailed.start_time} />
                        </TableCell>
                        <TableCell>
                            <DateView date={cdetailed.end_time} />
                        </TableCell>
                        <TableCell>{format_duration(cdetailed.duration_mins)}</TableCell>
                        <TableCell>
                            {`@${cdetailed.creator.username}`}
                        </TableCell>
                        <TableCell>{cdetailed.participants}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
