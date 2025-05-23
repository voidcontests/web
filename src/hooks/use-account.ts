'use client'

import { useEffect, useState } from 'react';
import { getAccount } from '@/actions';
import { Account } from '@/actions/dto/response';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_KEY } from '@/config';

export function useAccount() {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAccount = async () => {
        try {
            setLoading(true);
            let token = Cookies.get(TOKEN_COOKIE_KEY);
            if (token === undefined || token === "") {
                setAccount(null);
            } else {
                const accountData = await getAccount();
                setAccount(accountData);
            }
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch account'));
            setAccount(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return { account, loading, error };
}
