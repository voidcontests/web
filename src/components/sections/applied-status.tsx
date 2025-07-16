'use client';

import { ContestDetailed } from "@/actions/models/response";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { toast } from "@/components/toast";
import { LoaderCircle } from "lucide-react";
import { createEntry } from "@/actions/contests";
import { revalidate } from "@/actions/revalidate";
import { useAccount } from "@/hooks/use-account";
import Link from "next/link";
import { Response } from "@/actions";

export default function AppliedStatus({ contest }: { contest: Promise<Response<ContestDetailed>> }) {
    const { account, loading } = useAccount();

    const { data: cdetailed } = use(contest);
    const start_time = new Date(cdetailed.start_time);

    if (loading) {
        return (
            <Button variant="link" disabled>
                <LoaderCircle className="animate-spin" /> LOADING
            </Button>
        );
    }

    // TODO: for whatever freaking reason, sign in button dont work
    if (account === null) {
        return (
            <Link href="/login">
                <Button asChild variant="link">SIGN IN TO APPLY</Button>
            </Link>
        );
    }

    if (cdetailed.is_participant) {
        if (new Date() < start_time) {
            return <span className="text-center font-medium">You are applied!</span>;
        }

        return <span className="text-center font-medium">You are participating!</span>;
    }

    if (new Date() > start_time && !cdetailed.allow_late_join) {
        return (
            <span className="text-center font-medium">Application time is over.</span>
        );
    }

    if (cdetailed.max_entries && cdetailed.max_entries >= cdetailed.participants) {
        return (
            <span className="text-center font-medium">There is no available slots to join.</span>
        );
    }

    const handleApplyClick = async () => {
        try {
            await createEntry(cdetailed.id);
            revalidate(`/contest/${cdetailed.id}`);
        } catch (e) {
            toast({ title: 'Something went wrong. Try again leter' });
        }
    }

    return (
        <Button variant="link" onClick={handleApplyClick}>APPLY</Button>
    );
}
