import { ContestListItem } from "@/lib/models";
import Status from "./status";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { capitalize } from "@/lib/strings";

export default function ContestStatus({ contest }: { contest: ContestListItem }) {
    // Statuses:
    //      Upcoming - contest did not started yet
    //      Ongoing  - contest is live
    //      Finished - contest is over AND it is not marked as training (not visible for users, kinda internal thing)
    //      Training - contest is over and now in training mode

    const now = new Date();
    const start = new Date(contest.start_time);
    const end = new Date(contest.end_time);

    let state: 'upcoming' | 'ongoing' | 'training';
    if (now < start) {
        state = 'upcoming';
    }
    else if (now >= start && now < end) {
        state = 'ongoing';
    }
    else { // if (now >= end)
        state = 'training';
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5 flex items-center justify-center size-7 rounded-lg transition-colors hover:cursor-pointer">
                        <Status state={state} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    { capitalize(state) }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
