'use client';

import { Widget, WidgetContent, WidgetTitle, } from "@/ui/widget";
import { ContestDetailed } from "@/lib/models";
import { DateView } from "@/components/date";
import Timer from "@/components/timer";
import Address from "@/components/address";
import TonPrizes from "@/components/ton-prizes";

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
                {
                    contest.award_type !== 'no' && contest.address && <>
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Address
                        </div>
                        <div className="flex-1">
                            <Address address={contest.address} length={4} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Prizes
                        </div>
                        <div className="flex-1">
                            <TonPrizes nanos={contest.prizes.ton_nanos} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 text-secondary-foreground">
                            Pay for entry
                        </div>
                        <div className="flex-1">
                            <TonPrizes nanos={contest.entry_price_ton_nanos} />
                        </div>
                    </div></>
                }
                <div className="flex">
                    <div className="flex-1 text-secondary-foreground">
                        Participants
                    </div>
                    <div className="flex-1">
                        {
                            contest.max_entries === undefined
                                ? contest.participants
                                : `${contest.participants}/${contest.max_entries}`
                        }
                    </div>
                </div>
            </WidgetContent>
        </Widget>
    );
}
