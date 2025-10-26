'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/ui/widget";
import { ContestDetailed } from "@/lib/models";
import { DateView } from "@/components/date";
import Duration from "@/components/duration";
import Countdown from "@/components/countdown";

export default function Details({ contest }: { contest: ContestDetailed }) {
    const now = new Date();

    if (contest.start_time > now) { // Not started
        return (
            <Widget className="flex-1">
                <WidgetContent>
                    <WidgetTitle className="text-foreground">
                        ABOUT
                    </WidgetTitle>
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Starts at
                        </div>
                        <div className="flex-1">
                            <DateView date={contest.start_time} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Ends at
                        </div>
                        <div className="flex-1">
                            <DateView date={contest.end_time} />
                        </div>
                    </div>
                    {
                        contest.duration_mins !== 0 &&
                        <div className="flex">
                            <div className="flex-1 text-secondary-foreground">
                                Time window
                            </div>
                            <div className="flex-1">
                                <Duration value={contest.duration_mins} as='minutes' strict />
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

    return ( // Started
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">
                    ABOUT
                </WidgetTitle>
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Started at
                    </div>
                    <div className="flex-1">
                        <DateView date={contest.start_time} />
                    </div>
                </div>
                {
                    contest.submission_deadline &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Deadline in
                        </div>
                        <div className="flex-1">
                            <Countdown target={contest.submission_deadline} />
                        </div>
                    </div>
                }
                {
                    contest.duration_mins !== 0 && !contest.submission_deadline &&
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Time window
                        </div>
                        <div className="flex-1">
                            <Duration value={contest.duration_mins} as='minutes' strict />
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
