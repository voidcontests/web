'use client';

import { Account, ContestDetailed } from "@/lib/models";
import { Button } from "@/ui/button";
import { toast } from "@/components/toast";
import { createEntry } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

export default function AppliedStatus({ account, contest }: { account: Account | null, contest: ContestDetailed }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const now = new Date();
    const is_started = contest.start_time < now;

    if (!account) {
        return (
            <Button asChild variant="link">
                <Link href="/login">
                    Sign in to apply
                </Link>
            </Button>
        );
    }

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

    const apply = async () => {
        const result = await createEntry(contest.id);
        if (result.ok) {
            window.location.reload();
        } else {
            toast({ title: 'Failed to create entry', description: result.error.message });
        }
    }

    if (!contest.entry) {
        return (
            <Button variant="link" onClick={apply}>APPLY</Button>
        );
    }

    if (contest.awards.kind === 'pool' && contest.entry.is_paid === false) {
        const comment = `contests.fckn.engineer: Pay for entry to contest with ID: ${contest.id}`.replaceAll(" ", "%20");
        const paymentUrl = `ton://transfer/${contest.address}?amount=${contest.entry_price_ton_nanos}&text=${comment}`;

        return (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="link">
                        Pay for entry
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col items-center gap-6 p-6">
                        <h2 className="text-xl font-medium">Pay for Entry</h2>
                        <div className="bg-white p-4 rounded-xl">
                            <QRCodeSVG
                                value={paymentUrl}
                                size={256}
                            />
                        </div>
                        <p className="text-sm text-center text-muted-foreground max-w-md">
                            Scan this QR code to process payment
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (is_started) {
        return <span className="text-center font-medium">You are participating!</span>;
    }

    return <span className="text-center font-medium">You are applied!</span>;
}
