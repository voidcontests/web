'use client';

import { useIsConnectionRestored, useTonConnectUI } from "@tonconnect/ui-react";
import { revalidate } from "@/actions/revalidate";
import React, { useEffect } from "react";
import { Spinner } from "@/ui/spinner";
import { Button } from "@/ui/button";

const TonConnectButton = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const [ tonConnectUI ] = useTonConnectUI();

    useEffect(() => {
        if (isConnectionRestored) {
            revalidate('/');
        }
    }, []);

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
                <Spinner className="size-4" />
                <span className="font-normal text-base">
                    loading
                </span>
            </Button>
        );
    }

    if (!tonConnectUI.account) {
        return (
            <Button onClick={() => connect()} variant={'link'}>
                Connect wallet
            </Button>
        );
    }


    return (
        <Button onClick={() => disconnect()}>
            Disconnect
        </Button>
    );
}

export { TonConnectButton };
