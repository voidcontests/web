'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/components/ui/widget";
import { ContestDetailed } from "@/actions/models/response";
import { Skeleton } from "@/components/ui/skeleton";
import { format_duration } from "@/lib/utils";
import { DateView } from "@/components/date";
import { use } from "react";
import { Result } from "@/actions";

export function ContestAbout({ contest }: { contest: Promise<Result<ContestDetailed>> }) {
    const result = use(contest);
    if (!result.ok) {
        throw new Error(`Fetch contest failed: ${result.error}`);
    }

    const cdetailed = result.data;

    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    ABOUT
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Starts
                    </div>
                    <div className="flex-1">
                        <DateView date={cdetailed.start_time} />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Deadline
                    </div>
                    <div className="flex-1">
                        <DateView date={cdetailed.end_time} />
                    </div>
                </div>
                {
                    cdetailed.duration_mins !== 0 &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Duration
                        </div>
                        <div className="flex-1">
                            {format_duration(cdetailed.duration_mins)}
                        </div>
                    </div>
                }
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Participants
                    </div>
                    <div className="flex-1">
                        {cdetailed.participants}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Total slots
                    </div>
                    <div className="flex-1">
                        {cdetailed.max_entries || 'Not limited'}
                    </div>
                </div>
            </WidgetContent>
        </Widget>
    );
}

export function Loading() {
    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    ABOUT
                </WidgetTitle>
                <div className="flex flex-row justify-between">
                    <Skeleton className="h-4 w-[50px]" />
                    <Skeleton className="h-4 w-[120px]" />
                </div>
                <div className="flex flex-row justify-between">
                    <Skeleton className="h-4 w-[60px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </WidgetContent>
        </Widget>
    );
}
