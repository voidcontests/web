"use client";

import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { TonProofContext } from "@/contexts/TonProofToken";
import { useState } from "react";
import { useTonProof } from "@/hooks/use-tonproof";

const manifestURL = "https://raw.githubusercontent.com/voidcontests/frontend/refs/heads/master/public/tonconnect-manifest.json";

export const TonConnectProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <TonProofContext.Provider value={{ token, setToken }}>
            <TonConnectUIProvider
                manifestUrl={manifestURL}
                actionsConfiguration={{
                    modals: ['before', 'success', 'error'],
                    notifications: [],
                }}
                uiPreferences={{
                    theme: THEME.DARK
                }}
                walletsListConfiguration={
                    { includeWallets: undefined }
                }
            >
                <TonProof>
                    {children}
                </TonProof>
            </TonConnectUIProvider>
        </TonProofContext.Provider>
    );
}

const TonProof = ({ children }: { children: React.ReactNode }) => {
    useTonProof();
    return children;
}
