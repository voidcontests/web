'use client';

import { ContestProblemDetailed, ProblemDetailed } from "@/lib/models";
import { Widget, WidgetContent, WidgetTitle, } from "@/ui/widget";
import { ContestProblemDetailedSchema } from "@/lib/schemas";
import Timer from "@/components/timer";
import TimeLimit from "./time-limit";

function isContestProblem(problem: ContestProblemDetailed | ProblemDetailed): problem is ContestProblemDetailed {
    return ContestProblemDetailedSchema.safeParse(problem).success;
}

export default function Details({ problem }: { problem: ProblemDetailed | ContestProblemDetailed }) {
    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    DETAILS
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Time limit
                    </div>
                    <div className="flex-1">
                        <TimeLimit ms={problem.time_limit_ms}  />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Memory limit
                    </div>
                    <div className="flex-1">
                        128 MB
                    </div>
                </div>
                {
                    isContestProblem(problem) && problem.submission_deadline !== undefined &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Deadline
                        </div>
                        <div className="flex-1">
                            <Timer target={problem.submission_deadline} expiredLabel="expired" />
                        </div>
                    </div>
                }
            </WidgetContent>
        </Widget>
    );
}
