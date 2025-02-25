import { ContestListItem } from "@/actions/dto/response";
import Status from "./status";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function ContestStatus({ contest }: { contest: ContestListItem }) {
    // Statuses:
    //      Upcoming - contest did not started yet
    //      Ongoing  - contest is live
    //      Finished - contest is over AND it is not marked as training (not visible for users, kinda internal thing)
    //      Training - contest is over and now in training mode

    const now = new Date();
    const start = new Date(contest.start_time);
    const end = new Date(contest.end_time);

    let label;
    if (now < start) {
        label = 'Upcoming';
    }
    else if (now >= start && now < end) {
        label = 'Ongoing';
    }
    else if (now >= end) {
        label = 'Training';
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5 flex items-center justify-center size-7 rounded-lg transition-colors hover:cursor-pointer">
                        <Status active={ now > start && now < end } />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    { label }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
