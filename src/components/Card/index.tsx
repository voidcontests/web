'use client';

import RightArrow from "@/icons/RightArrow";
import styles from "./styles.module.css";
import Link from "next/link";

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    linkLabel: string;
    link: string;
}

export const Card = (props: Props) => {
    return (
        <Link href={props.link} className={styles.card}>
            <div className={styles.container}>
                {props.icon}
                <div className={styles.title}>
                    {props.title}
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>

                <div className={styles.link}>
                    <div className={styles.label}>
                        {props.linkLabel}
                    </div>
                    <RightArrow className={styles.arrow} />
                </div>
            </div>
        </Link>
    );
}