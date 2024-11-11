'use client';

import { TonConnectButton } from "@tonconnect/ui-react";
import styles from "./styles.module.css";
import Link from "next/link";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href={"/"} className={styles.title}>CIIM</Link>
                <div className={styles.right}>
                    <Link href={"/contests"} className={styles.link}>Contests</Link>
                    <Link href={"/leaderboards"} className={styles.link}>Leaderboards</Link>
                    <TonConnectButton />
                </div>
            </div>
        </header>
    );
}