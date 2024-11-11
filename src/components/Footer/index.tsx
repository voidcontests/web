import LinkedIn from "@/icons/LinkedIn";
import GitHub from "@/icons/GitHub";
import Twitter from "@/icons/Twitter";
import Email from "@/icons/Email";
import styles from "./styles.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <hr className={styles.separator} />
            <div className={styles.container}>
                <div className={styles.label}>
                    Created by @ndbtea
                </div>
                <div className={styles.icons}>
                    <LinkedIn />
                    <GitHub />
                    <Twitter />
                    <Email />
                </div>
            </div>
        </footer>
    );
}