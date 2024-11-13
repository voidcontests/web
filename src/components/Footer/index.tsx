import LinkedIn from "@/icons/LinkedIn";
import GitHub from "@/icons/GitHub";
import Twitter from "@/icons/Twitter";
import Email from "@/icons/Email";
import styles from "./styles.module.css";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <hr className={styles.separator} />
            <div className={styles.container}>
                <div className={styles.label}>
                    Created by <Link href="https://github.com/jus1d" className={styles.link}>@ndbtea</Link>
                </div>
                <div className={styles.icons}>
                    <LinkedIn />
                    <GitHub />
                    <Twitter />
                    <Email />
                </div>
            </div>
        </div>
    );
}