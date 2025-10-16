'use client'

import { useEffect, useState } from 'react';
import { getAccount } from '@/lib/api';
import { Account } from '@/lib/models';
import Cookies from 'js-cookie';
import { config } from '@/config';

export function useAccount() {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccount = async () => {
        setLoading(true);
        let token = Cookies.get(config.cookies.token_key);
        if (token === undefined || token === "") {
            setAccount(null);
            setError(null);
            setLoading(false);
            return;
        }

        const result = await getAccount();
        if (!result.ok) {
            setAccount(null);
            setError(result.error.message);
            setLoading(false);
            return;
        }

        setAccount(result.data);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return { account, loading, error };
}
