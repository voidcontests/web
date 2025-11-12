'use client';

import { Button } from "@/ui/button";
import Link from "next/link";
import { useAccount } from "@/hooks/account";
import { removeToken } from "@/lib/api";
import { LogOut } from "lucide-react";
import { Spinner } from "@/ui/spinner";
import { Username } from "@/components/username";

const AccountButton = () => {
    let { account, loading } = useAccount();

    if (loading) {
        return (
            <Button disabled className="font-medium bg-blue-400 text-zinc-50 dark:bg-blue-400 dark:text-zinc-50">
                <Spinner className="size-4" />
                <span className="font-normal text-base">
                    loading
                </span>
            </Button>
        );
    }

    if (account === null) {
        return (
            <Link href="/login">
                <Button className="font-medium bg-blue-400 text-zinc-50 dark:bg-blue-400 dark:text-zinc-50">
                    Sign in
                </Button>
            </Link>
        );
    }

    return (
        <Button onClick={() => {
            removeToken();
            window.location.reload();
        }}>
            <Username username={account.username} /> <LogOut />
        </Button>
    );
}

export { AccountButton };
