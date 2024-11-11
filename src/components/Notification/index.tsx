'use client';

import RightArrow from "@/icons/RightArrow";
import styles from "./styles.module.css";
import Twitter from "@/icons/Twitter";

interface Props {
    type: 'warning' | 'info';
    label: string;
    link: string;
    icon: React.ReactNode;
}

export const Notification = (props: Props) => {
    return (
        <div
            className={`${styles.container} ${props.type === 'warning' ? styles.warning : styles.info}`}
            onClick={() => {
                if (window.location.href !== undefined) {
                    window.open(props.link);
                }
            }}
        >
            {props.icon}
            {props.label}
            <RightArrow />
        </div>
    );
}