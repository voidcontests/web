"use client";

import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const manifest = "https://raw.githubusercontent.com/cascadecontests/frontend/refs/heads/master/public/tonconnect-manifest.json";

export const TonConnectProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <TonConnectUIProvider
            manifestUrl={manifest}
            actionsConfiguration={{
                modals: ['before', 'success', 'error'],
                notifications: ['before', 'success', 'error'],
            }}
            uiPreferences={{
                theme: THEME.LIGHT
            }}>
            {children}
        </TonConnectUIProvider>
    );
}