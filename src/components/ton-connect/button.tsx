import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
    useIsConnectionRestored,
    useTonConnectUI,
    useTonAddress,
    useTonWallet
} from "@tonconnect/ui-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { Copy, LogOut } from "lucide-react";

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
            <Button onClick={() => tonConnectUI.openModal()} className="text-white bg-ton hover:bg-ton/90">
                CONNECT WALLET
            </Button>
        );
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="secondary">
                    {enshortAdress(address)} <Icons.chevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={handleCopyAddress}
                >
                    <Copy /> Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleLogOut}
                    className="text-red-500 focus:bg-red-500/10 focus:text-red-500"
                >
                    <LogOut /> Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export { TonConnectButton };