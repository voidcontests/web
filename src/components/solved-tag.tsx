import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tag } from "@/components/ui/tag";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
    status: "accepted" | "tried" | undefined;
}

function SolvedTag({ status, className, ...props }: Props) {
    if (status === undefined) {
        return null;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Tag variant={status === "accepted" ? "green" : "orange"} className={cn("hover:cursor-pointer", className)} {...props}>
                        {status === "accepted" ? "AC" : "TR"}
                    </Tag>
                </TooltipTrigger>
                <TooltipContent>
                    {
                        status === "accepted"
                            ? "You've submitted an accepted solution."
                            : "You've tried this problem."
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export { SolvedTag }
