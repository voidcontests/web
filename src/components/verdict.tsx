import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Tag } from "./ui/tag";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface VerdictProps extends React.HTMLAttributes<HTMLDivElement> {
    verdict: 'OK' | 'WA' | undefined;
}

type VerdictColorMap = {
    [key: string]: 'green' | 'orange';
};

const verdict_color: VerdictColorMap = {
    'OK': 'green',
    'WA': 'orange',
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
