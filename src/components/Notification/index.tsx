'use client';

import RightArrow from "@/icons/RightArrow";
import styles from "./styles.module.css";
import Link from "next/link";

interface Props {
    type: 'warning' | 'info';
    label: string;
    link?: string;
    icon: React.ReactNode;
}

export const Notification = (props: Props) => {
    if (props.link === undefined) {
        return (
            <div className={`${styles.container} ${props.type === 'warning' ? styles.warning : styles.info}`}>
                {props.icon}
                {props.label}
            </div>
        );
    }

    return (
        <Link
            href={props.link}
            target="_blank" rel="noopener noreferrer"
            className={`${styles.container} ${props.type === 'warning' ? styles.warning : styles.info}`}
        >
            {props.icon}
            {props.label}
            <div className={styles.arrow}>
                <RightArrow />
            </div>
        </Link>
    );
}