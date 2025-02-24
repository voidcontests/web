import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Status({ active, active_message, inactive_message }: { active?: boolean, active_message?: string, inactive_message?: string }) {
    if (!active_message) active_message = 'Active';
    if (!inactive_message) inactive_message = 'Not active';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="hover:bg-zinc-950/3 dark:hover:bg-zinc-50/5 flex items-center justify-center size-7 rounded-lg transition-colors hover:cursor-pointer">
                        <span className='relative flex items-center justify-center'>
                            {
                                active
                                    ? <>
                             			<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-green-500 bg-green-500 opacity-75'/>
                             			<span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'/>
                                    </>
                                    : <span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-950/15 dark:bg-zinc-50/15'/>
                            }
                  		</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    {
                        active ? active_message : inactive_message
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
