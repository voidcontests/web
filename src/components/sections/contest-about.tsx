'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/components/ui/widget";
import { ContestDetailed } from "@/api/dto/response";
import { format_date, format_duration } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

export function ContestAbout({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

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
                        {format_date(new Date(cdetailed.start_time))}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Deadline
                    </div>
                    <div className="flex-1">
                        {format_date(new Date(cdetailed.end_time))}
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
                        Slots
                    </div>
                    <div className="flex-1">
                        Not limited
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
