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
            <Button variant="secondary" className="font-medium" disabled>
                <Icons.loader className="animate-spin" /> LOADING
            </Button>
        );
    }

    if (!wallet || !tonConnectUI.account) {
        return (
            <Button onClick={() => tonConnectUI.openModal()} className="text-white font-medium bg-ton hover:bg-ton/90">
                CONNECT WALLET
            </Button>
        );
    }


    return (
        <Button className="font-medium" onClick={handleLogOut}>
            {enshortAdress(address)} <Icons.chevronDown />
        </Button>
        // <DropdownMenu>
        //     <DropdownMenuTrigger>
        //         <Button className="font-medium">
        //             {enshortAdress(address)} <Icons.chevronDown />
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent>
        //         <DropdownMenuItem
        //             onClick={handleCopyAddress}
        //         >
        //             <Copy /> Copy Address
        //         </DropdownMenuItem>
        //         <DropdownMenuItem
        //             onClick={handleLogOut}
        //             className="text-red-500 focus:bg-red-500/10 focus:text-red-500"
        //         >
        //             <LogOut /> Log Out
        //         </DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
    );
}

export { TonConnectButton };