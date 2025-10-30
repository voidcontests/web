'use client';

import { Account, ContestDetailed } from "@/lib/models";
import { Button } from "@/ui/button";
import { toast } from "@/components/toast";
import { createEntry } from "@/lib/api";
import Link from "next/link";

export default function AppliedStatus({ account, contest }: { account: Account | null, contest: ContestDetailed }) {
    const start_time = new Date(contest.start_time);

    if (account === null) {
        return (
            <Button asChild variant="link">
                <Link href="/login">
                    Sign in to apply
                </Link>
            </Button>
        );
    }

    if (contest.is_participant) {
        if (new Date() < start_time) {
            return <span className="text-center font-medium">You are applied!</span>;
        }

        return <span className="text-center font-medium">You are participating!</span>;
    }

    if (new Date() > start_time && !contest.allow_late_join) {
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
        try {
            await createEntry(contest.id);
            window.location.reload();
        } catch (e) {
            toast({ title: 'Something went wrong. Try again leter' });
        }
    }

    return (
        <Button variant="link" onClick={apply}>APPLY</Button>
    );
}
