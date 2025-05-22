'use client';

import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import {
    useIsConnectionRestored,
    useTonConnectUI,
    useTonAddress,
    useTonWallet
} from "@tonconnect/ui-react";
import React, { useEffect } from "react";
import { truncate_address } from "@/lib/strings";
import { revalidate } from "@/actions";

const TonConnectButton = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress();
    const wallet = useTonWallet();

    useEffect(() => {
        if (isConnectionRestored && address) {
            setTimeout(() => { revalidate('/') }, 500);
        }
    }, [address]);

    const disconnect = async () => {
        tonConnectUI.disconnect();
        revalidate('/');
    }

    const connect = async () => {
        tonConnectUI.openModal();
    }

    if (!isConnectionRestored) {
        return (
            <Button variant="secondary" disabled>
                <LoaderCircle className="animate-spin" /> LOADING
            </Button>
        );
    }

    if (!wallet || !tonConnectUI.account) {
        return (
            <Button onClick={() => connect()} className="bg-blue-400 text-zinc-50 dark:bg-blue-400 dark:text-zinc-50">
                CONNECT WALLET
            </Button>
        );
    }


    // TODO: add dropdown menu with copying address, disconnecting account, etc.
    return (
        <Button onClick={disconnect}>
            {truncate_address(address, 4)} <LogOut />
        </Button>
    );
}

export { TonConnectButton };
