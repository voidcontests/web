'use client';

import { TonConnectButton } from "@tonconnect/ui-react";
import styles from "./styles.module.css";
import Link from "next/link";
import { Notification } from "../Notification";
import AlertTriangle from "@/icons/AlertTriangle";
import { useState, useEffect } from 'react';

export const Header = () => {

    const [offsetY, setOffsetY] = useState(0);

    // false &&
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const notificationHeight = 45;

            if (scrollPosition <= notificationHeight) {
                setOffsetY(0 - scrollPosition);
            } else {
                setOffsetY(-notificationHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.header} style={{ top: offsetY }}>
            {/* <div className={styles.notification}>
                <Notification
                    type="warning"
                    label="This is an early development build. But still be as strict as possible about any bugs and not implemented things"
                    link="https://github.com/cascadecontests/frontend/bug-report" // TODO: Update this link, on repository create
                    icon={<AlertTriangle />}
                />
            </div> */}
            <header>
                <div className={styles.container}>
                    <Link href={"/"} className={styles.title}>Cascade</Link>
                    <div className={styles.navigation}>
                        <Link href={"/contests"} className={styles.link}>Contests</Link>
                        <Link href={"/leaderboards"} className={styles.link}>Leaderboards</Link>
                    </div>
                    <div className={styles.tonconnectButton}>
                        <TonConnectButton />
                    </div>
                </div>
            </header>
        </div>
    );
}