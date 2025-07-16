import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Tag } from "./ui/tag";

export interface VerdictProps extends HTMLAttributes<HTMLDivElement> {
    verdict: 'OK' | 'WA' | undefined;
}

type VerdictColorMap = {
    [key: string]: 'green' | 'red';
};

const verdict_color: VerdictColorMap = {
    'OK': 'green',
    'WA': 'red',
}

type TipMap = {
    [key: string]: string;
};

const tip: TipMap = {
    'OK': 'Your solution accepted',
    'WA': 'At least tried',
}

function Verdict({ className, verdict, ...props }: VerdictProps) {
    if (verdict === undefined) {
        return (
            <></>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Tag variant={verdict_color[verdict]} className={cn("hover:cursor-pointer", className)} {...props}>
                        {verdict}
                    </Tag>
                </TooltipTrigger>
                <TooltipContent>
                    {tip[verdict]}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export { Verdict }
