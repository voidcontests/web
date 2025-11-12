'use client';

import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useRef, useState } from "react";
import { generatePayload, checkTonProof, TonProofPayload } from "@/lib/api/ton";
import { toast } from "@/components/toast";

const PAYLOAD_TTL_MS = 1000 * 60 * 10;

export function useTonProof() {
    const [tonConnectUI] = useTonConnectUI();
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [token, setToken] = useState<string | null>(null);

    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            console.log('No wallet connected, setting up payload refresh');
            setToken(null);

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const result = await generatePayload();
                if (!result.ok) {
                    tonConnectUI.setConnectRequestParameters(null);
                } else {
                    tonConnectUI.setConnectRequestParameters({
                        state: 'ready',
                        value: { tonProof: result.data.payload }
                    });
                }
            };

            refreshPayload();
            interval.current = setInterval(refreshPayload, PAYLOAD_TTL_MS);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            const payload: TonProofPayload = {
                address: wallet.account.address,
                network: wallet.account.chain,
                proof: {
                    timestamp: wallet.connectItems.tonProof.proof.timestamp,
                    domain: {
                        lengthBytes: wallet.connectItems.tonProof.proof.domain.lengthBytes,
                        value: wallet.connectItems.tonProof.proof.domain.value,
                    },
                    signature: wallet.connectItems.tonProof.proof.signature,
                    payload: wallet.connectItems.tonProof.proof.payload,
                    state_init: wallet.account.walletStateInit,
                },
            };

            checkTonProof(payload).then(result => {
                if (result.ok) {
                    toast({ title: 'Wallet connected successfully' });
                    setTimeout(() => window.location.reload(), 500);
                } else {
                    toast({ title: 'Wallet verification failed', description: result.error.message });
                    tonConnectUI.disconnect();
                }
            });
        } else if (wallet.connectItems?.tonProof && 'error' in wallet.connectItems.tonProof) {
            toast({ title: 'Proof verification error', description: wallet.connectItems.tonProof.error.message });
            tonConnectUI.disconnect();
        } else {
            // Only disconnect if this appears to be a restored session without proof
            // Don't disconnect immediately as tonProof might be loading
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [wallet, isConnectionRestored, tonConnectUI]);

    return { token, isConnectionRestored };
}
