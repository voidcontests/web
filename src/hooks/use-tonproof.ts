import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { TonProofContext } from "../contexts/tonproof";
import { useContext, useEffect, useRef } from "react";
import * as Api from "@/api";
import Cookies from "js-cookie";

const COOKIE_KEY = 'token';
const PAYLOAD_TTL_MS = 1000 * 60 * 20;

export function useTonProof() {
    const isConnectionRestored = useIsConnectionRestored();
    const { setToken } = useContext(TonProofContext);
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored || !setToken) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            Cookies.remove(COOKIE_KEY);
            setToken(null);

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const value = await Api.tonproof.generatePayload();
                if (!value) {
                    tonConnectUI.setConnectRequestParameters(null);
                } else {
                    tonConnectUI.setConnectRequestParameters({ state: 'ready', value });
                }
            }

            refreshPayload();
            setInterval(refreshPayload, PAYLOAD_TTL_MS);
            return;
        }

        const token = Cookies.get(COOKIE_KEY);
        if (token) {
            setToken(token);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            Api.tonproof.check(wallet.connectItems.tonProof.proof, wallet.account).then(result => {
                if (result) {
                    setToken(result);
                    Cookies.set(COOKIE_KEY, result);
                } else {
                    alert('Please try another wallet');
                    tonConnectUI.disconnect();
                }
            })
        } else {
            alert('Please try another wallet');
            tonConnectUI.disconnect();
        }
    }, [wallet, isConnectionRestored, setToken])
}
