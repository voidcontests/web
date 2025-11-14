'use client';

import { Account, ContestDetailed } from "@/lib/models";
import { Button } from "@/ui/button";
import { toast } from "@/components/toast";
import { createEntry } from "@/lib/api";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Container } from "@/containers/default";
import { TonConnectButton } from "@/components/ton-connect/button";

export default function AppliedStatus({ account, contest }: { account: Account | null, contest: ContestDetailed }) {
    if (!account) {
        return <NoAccount />;
    }

    if (account.id === contest.creator.id) {
        <span className="text-center font-medium">Can't apply to contest, created by you.</span>
    }

    const apply = async () => {
        const result = await createEntry(contest.id);
        if (result.ok) {
            window.location.reload();
        } else {
            toast({ title: 'Failed to create entry', description: result.error.message });
        }
    }

    const checkPayment = () => {
        if (window === undefined) return;
        window.location.reload();
    }

    if (!contest.entry) {
        if (!contest.is_registration_open) {
            return (
                <span className="text-center font-medium">Application time is over.</span>
            );
        }

        if (contest.max_entries && contest.participants >= contest.max_entries) {
            return (
                <span className="text-center font-medium">There is no available slots to join.</span>
            );
        }

        if ((contest.awards.kind === 'pool' || contest.awards.kind === 'sponsored') && !account.address) {
            return (
                <TonConnectButton />
            );
        }

        return (
            <Button variant="link" onClick={apply}>APPLY</Button>
        );
    }

    if (contest.entry.is_admitted) {
        return <Participating contest={contest} />
    }

    if (contest.awards.kind === 'pool' && contest.entry.is_paid === false) {
        const comment = `contests.fckn.engineer: Pay for entry to contest with ID: ${contest.id}`.replaceAll(" ", "%20");
        const paymentURL = `ton://transfer/${contest.address}?amount=${contest.entry_price_ton_nanos}&text=${comment}`;

        return (
            <Container className="flex flex-col items-center p-5 gap-3">
                <QRCodeSVG
                    value={paymentURL}
                    size={256}
                    bgColor="var(--surface)"
                    fgColor="var(--foreground)"
                />
                <Button variant='secondary' className="w-full" onClick={checkPayment}>
                    CHECK PAYMENT
                </Button>
                <span className="text-center text-sm">
                    Scan this QR code, to make payment for the entry
                </span>
            </Container>
        );
    }

    if (!contest.entry.is_admitted) {
        <NotAdmitted contest={contest} />
    }

    return <Participating contest={contest} />
}

function NotAdmitted({ contest }: { contest: ContestDetailed }) {
    let text = 'You are not permitted yet';
    if (contest.entry?.message) {
        text = contest.entry?.message;
    }

    return <span className="text-center font-medium">{text}</span>;
}

function NoAccount() {
    return (
        <Button asChild variant="link">
            <Link href="/login">
                Sign in to apply
            </Link>
        </Button>
    );
}

function Participating({ contest }: { contest: ContestDetailed }) {
    const now = new Date();
    const is_started = contest.start_time < now;

    if (is_started) {
        return <span className="text-center font-medium">You are participating!</span>;
    }

    return <span className="text-center font-medium">You are applied!</span>;
}
