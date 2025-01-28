'use client';

import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ContestDetailed } from "@/api/dto/response";
import { Button } from "@/components/ui/button";
import * as API from '@/api';
import { use } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function AppliedStatus({ contest }: { contest: Promise<ContestDetailed> }) {
    const cdetailed = use(contest);

    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const isConnectionRestored = useIsConnectionRestored();

    if (!isConnectionRestored) {
        return (
            <Button variant="link" disabled>
                <LoaderCircle className="animate-spin" /> LOADING
            </Button>
        );
    }

    if (!wallet) {
        return (
            <Button variant="link" onClick={() => tonConnectUI.openModal()}>CONNECT WALET TO APPLY</Button>
        );
    }

    if (cdetailed.is_participant) {
        return (
            <span className="text-center font-medium">You are participating!</span>
        );
    }

    const handleApplyClick = async () => {
        try {
            await API.applyForContest(cdetailed.id);
            // fetchContest(); // TODO
        } catch (e) {
            toast.error('Something went wrong. Try again leter');
        }
    }

    return (
        <Button variant="link" onClick={handleApplyClick}>APPLY</Button>
    );
}