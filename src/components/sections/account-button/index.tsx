'use client';

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useAccount } from "@/hooks/use-account";
import { removeToken } from "@/lib/api";
import { LoaderCircle, LogOut } from "lucide-react";

const AccountButton = () => {
    let { account, loading } = useAccount();

    if (loading) {
        return (
            <Button variant="secondary" disabled>
                <LoaderCircle className="animate-spin" /> LOADING
            </Button>
        );
    }

    if (account === null) {
        return (
            <Link href="/login">
                <Button className="bg-blue-400 text-zinc-50 dark:bg-blue-400 dark:text-zinc-50">
                    SIGN IN
                </Button>
            </Link>
        );
    }

    return (
        <Button onClick={() => {
            removeToken();
            window.location.reload();
        }}>
            {`@${account.username}`} <LogOut />
        </Button>
    );
}

export { AccountButton };
