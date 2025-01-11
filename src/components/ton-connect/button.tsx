import React from "react";
import {
    useIsConnectionRestored,
    useTonConnectUI,
    useTonAddress,
    useTonWallet
} from "@tonconnect/ui-react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const TonConnectButton = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress();
    const wallet = useTonWallet();

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address);
    }

    const handleLogOut = () => {
        tonConnectUI.disconnect();
    }

    const enshortAdress = (address: string): string => {
        if (address.length < 8) return address;
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }

    if (!isConnectionRestored) {
        return (
            <Button variant="secondary" disabled>
                <Icons.loader className="animate-spin" /> LOADING
            </Button>
        );
    }

    if (!wallet || !tonConnectUI.account) {
        return (
            <Button onClick={() => tonConnectUI.openModal()} className="text-text-primary-on-color bg-blue-ton hover:bg-blue-ton/90">
                CONNECT WALLET
            </Button>
        );
    }


    // TODO: add dropdown menu with copying address, disconnecting account, etc.
    return (
        <Button onClick={handleLogOut}>
            {enshortAdress(address)} <Icons.chevronDown />
        </Button>
    );
}

export { TonConnectButton };