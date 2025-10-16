'use client';

import { getAccount } from "@/lib/api";
import { BannedLayout } from "@/components/layouts/banned";
import { UnauthorizedLayout } from "@/components/layouts/unauthorized";
import { useEffect, useState } from "react";
import { Account } from "@/lib/models";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null | undefined>(undefined);

    useEffect(() => {
        const fetchAccount = async () => {
            const result = await getAccount();
            if (!result.ok) {
                setAccount(null);
            } else {
                setAccount(result.data);
            }
        };
        fetchAccount();
    }, []);

    if (account === undefined) {
        // TODO: Remove this ugly loading
        return <div>Loading...</div>;
    }

    if (account === null) {
        return <UnauthorizedLayout />;
    }

    if (account.role.name === 'banned') {
        return <BannedLayout />;
    }

    return children;
}
