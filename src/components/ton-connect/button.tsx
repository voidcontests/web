import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import {
    useIsConnectionRestored,
    useTonConnectUI,
    useTonAddress,
    useTonWallet
} from "@tonconnect/ui-react";
import React from "react";
import { truncate_address } from "@/lib/strings";

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

    if (!isConnectionRestored) {
        return (
            <Button variant="secondary" disabled>
                <LoaderCircle className="animate-spin" /> LOADING
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
            {truncate_address(address, 4)} <LogOut />
        </Button>
    );
}

export { TonConnectButton };