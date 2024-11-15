import GitHub from "@/icons/GitHub";
import Email from "@/icons/Email";
import styles from "./styles.module.css";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <hr className={styles.separator} />
            <div className={styles.container}>
                <div className={styles.label}>
                    Created by <Link
                        href="https://github.com/jus1d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >@ndbtea</Link>
                </div>
                <div className={styles.icons}>
                    <Link href="https://github.com/cascadecontests" target="_blank" rel="noopener noreferrer">
                        <GitHub />
                    </Link>
                    <Link href="mailto:artfa63@gmail.com">
                        <Email />
                    </Link>
                </div>
            </div>
        </div>
    );
}