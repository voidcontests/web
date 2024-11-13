'use client';

import RightArrow from "@/icons/RightArrow";
import styles from "./styles.module.css";

interface Props {
    type: 'warning' | 'info';
    label: string;
    link: string;
    icon: React.ReactNode;
}

export const Notification = (props: Props) => {
    return (
        <a
            href={props.link}
            target="_blank" rel="noopener noreferrer"
            className={`${styles.container} ${props.type === 'warning' ? styles.warning : styles.info}`}
        >
            {props.icon}
            {props.label}
            <div className={styles.arrow}>
                <RightArrow />
            </div>
        </a>
    );
}