'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/ui/widget";
import { ContestDetailed } from "@/lib/models";
import { DateView } from "@/components/date";
import Timer from "@/components/timer";

export default function Details({ contest }: { contest: ContestDetailed }) {
    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    ABOUT
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Start
                    </div>
                    <div className="flex-1">
                        <DateView date={contest.start_time} />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        End
                    </div>
                    <div className="flex-1">
                        <DateView date={contest.end_time} />
                    </div>
                </div>
                {
                    contest.submission_deadline &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Deadline
                        </div>
                        <div className="flex-1">
                            <Timer target={contest.submission_deadline} expiredLabel="expired" />
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
                        Total seats
                    </div>
                    <div className="flex-1">
                        {contest.max_entries || 'Not limited'}
                    </div>
                </div>
            </WidgetContent>
        </Widget>
    );
}
