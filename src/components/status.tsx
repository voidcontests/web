import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Status({ active }: { active?: boolean }) {
    if (active) {
        return (
            <span className='relative flex items-center justify-center'>
     			<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-scarlet-500 bg-scarlet-500 opacity-75'></span>
     			<span className='relative inline-flex h-2 w-2 rounded-full bg-scarlet-500'></span>
      		</span>
        );
    }

    return (
        <span className='relative flex items-center justify-center'>
      		<span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-950/15 dark:bg-zinc-50/15'></span>
       	</span>
    );
}
