'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';
import { useTonProof } from '@/hooks/ton-proof';

// TODO: change to actual link when deployed
const MANIFEST_URL = "https://raw.githubusercontent.com/voidcontests/web/refs/heads/legacy/ton-connect/public/tonconnect-manifest.json";

function TonProofInitializer() {
    useTonProof();
    return null;
}

export function TonConnectProvider({ children }: { children: ReactNode }) {
    return (
        <TonConnectUIProvider
            manifestUrl={MANIFEST_URL}
            walletsListConfiguration={{
                includeWallets: [
                    {
                        appName: "tonkeeper",
                        name: "Tonkeeper",
                        imageUrl: "https://tonkeeper.com/assets/tonconnect-icon.png",
                        aboutUrl: "https://tonkeeper.com",
                        universalLink: "https://app.tonkeeper.com/ton-connect",
                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                        platforms: ["ios", "android", "chrome", "firefox"]
                    }
                ]
            }}
            actionsConfiguration={{
                twaReturnUrl: 'https://t.me/voidcontests_bot',
                returnStrategy: 'back'
            }}
        >
            <TonProofInitializer />
            {children}
        </TonConnectUIProvider>
    );
}
