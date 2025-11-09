'use client';

import { Widget, WidgetContent, WidgetTitle } from "@/ui/widget";
import { ContestDetailed } from "@/lib/models";
import { DateView } from "@/components/date";
import Timer from "@/components/timer";
import Address from "@/components/address";
import TonPrizes from "@/components/ton-prizes";
import Tx from "@/components/tx";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className="flex-1 text-secondary-foreground">{label}</div>
            <div className="flex-1">{children}</div>
        </div>
    );
}

function StartTime({ date }: { date: Date }) {
    return (
        <DetailRow label="Start">
            <DateView date={date} />
        </DetailRow>
    );
}

function EndTime({ date }: { date: Date }) {
    return (
        <DetailRow label="End">
            <DateView date={date} />
        </DetailRow>
    );
}

function SubmissionDeadline({ date }: { date: Date }) {
    return (
        <DetailRow label="Deadline">
            <Timer target={date} expiredLabel="expired" />
        </DetailRow>
    );
}

function ContestAddress({ address }: { address: string }) {
    return (
        <DetailRow label="Address">
            <Address address={address} length={4} />
        </DetailRow>
    );
}

function DistributionTx({ tx }: { tx: string }) {
    return (
        <DetailRow label="Distribution tx">
            <Tx tx={tx} length={5} />
        </DetailRow>
    );
}

function Prizes({ nanos }: { nanos: number }) {
    return (
        <DetailRow label="Prizes">
            <TonPrizes nanos={nanos} />
        </DetailRow>
    );
}

function EntryPrice({ nanos }: { nanos: number }) {
    return (
        <DetailRow label="Pay for entry">
            <TonPrizes nanos={nanos} />
        </DetailRow>
    );
}

function Participants({ participants, max_entries }: { participants: number; max_entries?: number }) {
    return (
        <DetailRow label="Participants">
            {max_entries === undefined ? participants : `${participants}/${max_entries}`}
        </DetailRow>
    );
}

export default function Details({ contest }: { contest: ContestDetailed }) {
    return (
        <Widget className="flex-1">
            <WidgetContent>
                <WidgetTitle className="text-foreground">ABOUT</WidgetTitle>

                <StartTime date={contest.start_time} />
                <EndTime date={contest.end_time} />

                {contest.entry?.submission_deadline && (
                    <SubmissionDeadline date={contest.entry.submission_deadline} />
                )}

                {contest.awards.kind !== "no" && contest.address && (
                    <>
                        <ContestAddress address={contest.address} />

                        {contest.awards.is_distributed ? (
                            <DistributionTx tx={contest.awards.distribution_tx_hash} />
                        ) : (
                            <>
                                <Prizes nanos={contest.awards.nanocoins} />
                                {contest.awards.kind === 'pool' &&
                                    <EntryPrice nanos={contest.entry_price_ton_nanos} />
                                }
                            </>
                        )}
                    </>
                )}

                <Participants
                participants={contest.participants}
                max_entries={contest.max_entries}
                />
            </WidgetContent>
        </Widget>
    );
}
