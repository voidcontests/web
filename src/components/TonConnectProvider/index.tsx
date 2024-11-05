"use client";

import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const manifest = "https://raw.githubusercontent.com/ton-connect/demo-dapp/refs/heads/master/docs/tonconnect-manifest.json";

export const TonConnectProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TonConnectUIProvider manifestUrl={manifest} uiPreferences={{
            theme: THEME.LIGHT
        }}>
            {children}
        </TonConnectUIProvider>
    );
}