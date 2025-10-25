'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/ui/widget";
import { ContestDetailed } from "@/lib/models";
import { format_duration } from "@/lib/utils";
import { DateView } from "@/components/date";

export default function Details({ contest }: { contest: ContestDetailed }) {
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
                        <DateView date={contest.start_time} />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Deadline
                    </div>
                    <div className="flex-1">
                        <DateView date={contest.end_time} />
                    </div>
                </div>
                {
                    contest.duration_mins !== 0 &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Duration
                        </div>
                        <div className="flex-1">
                            {format_duration(contest.duration_mins)}
                        </div>
                    </div>
                }
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Participants
                    </div>
                    <div className="flex-1">
                        {contest.participants}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Total slots
                    </div>
                    <div className="flex-1">
                        {contest.max_entries || 'Not limited'}
                    </div>
                </div>
            </WidgetContent>
        </Widget>
    );
}
