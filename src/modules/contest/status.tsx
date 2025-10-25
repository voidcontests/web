import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { ContestListItem } from "@/lib/models";
import { capitalize } from "@/lib/strings";
import Pulse from "@/components/pulse";

export default function Status({ contest }: { contest: ContestListItem }) {
    // statuses:
    //   - `upcoming` - contest is not started yet
    //   - `ongoing`  - contest is live
    //   - `finished` - contest is over AND it is not marked as training (not visible for users, kinda internal thing)
    //   - `training` - contest is over and now in training mode

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
                        <Indicator state={state} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    { capitalize(state) }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function Indicator({ state }: { state:  'upcoming' | 'ongoing' | 'training' }) {
    if (state === 'upcoming') {
        return (
            <Pulse variant='inactive' />
        );
    }

    if (state === 'ongoing') {
        return (
            <Pulse variant='green' />
        );
    }

    if (state === 'training') {
        return (
            <Pulse variant='blue' />
        );
    }
}
