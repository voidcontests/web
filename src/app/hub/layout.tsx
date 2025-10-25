'use client';

import { getAccount } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Account } from "@/lib/models";
import Loading from "@/components/loading/plug";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const result = await getAccount();
            if (!result.ok) {
                setAccount(null);
                router.push('/login');
            } else {
                setAccount(result.data);
            }
        };
        load();
    }, [router]);

    if (account === undefined) {
        return <Loading />;
    }

    if (account === null) {
        return <Loading />;
    }

    // TODO: show something for banned users

    return children;
}
