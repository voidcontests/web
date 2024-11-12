'use client';

import RightArrow from "@/icons/RightArrow";
import styles from "./styles.module.css";

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    linkLabel: string;
    link: string;
}

export const Card = (props: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                {props.icon}
                <div className={styles.title}>
                    {props.title}
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>

                <a href={props.link} className={styles.link}>
                    <div className={styles.label}>
                        {props.linkLabel}
                    </div>
                    <RightArrow className={styles.arrow} />
                </a>
            </div>

            {/* <div className={styles.icon}>
            </div>
            <div className={styles.text}>
                <h1 className={styles.title}>
                </h1>
                <p className={styles.description}>
                </p>
            </div>
            <div className={styles.linkContainer}>
            </div> */}
        </div>
    );
}