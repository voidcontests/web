import LinkedIn from "@/icons/linkedin";
import GitHub from "@/icons/github";
import Twitter from "@/icons/twitter";
import Email from "@/icons/email";
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