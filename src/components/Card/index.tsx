'use client';

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
            {props.icon}
            <h1>
                {props.title}
            </h1>
            <p>
                {props.description}
            </p>
            <a href={props.link}>
                {props.linkLabel}
            </a>
        </div>
    );
}