import styles from "./page.module.css";
import Link from "next/link";

interface Props {
    contests: Contest[];
}

interface Contest {
    name: string;
    host: string;
    hostURL: string;
    address: string;
    start: Date;
    end: Date;
}

const ContestList = (props: Props) => {

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/(\w+)\s(\d+),\s(\d+)/, '$2 $1, $3');

        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return `${formattedDate}, ${formattedTime}`;
    }

    const shortenAddress = (str: string) => {
        if (str.length <= 10) {
            return str;
        }

        const startChars = 8;
        const endChars = 8;

        const start = str.substring(0, startChars);
        const end = str.substring(str.length - endChars);

        return `${start}...${end}`;
    }

    return (
        <table style={{ borderCollapse: 'collapse', width: '1120px', margin: '0 auto' }}>
            <thead>
                <tr>
                    <th className={styles.itemHeader}>#</th>
                    <th className={styles.itemHeader}>Name</th>
                    <th className={styles.itemHeader}>Host</th>
                    <th className={styles.itemHeader}>Address</th>
                    <th className={styles.itemHeader}>Start</th>
                    <th className={styles.itemHeader}>End</th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map((contest, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f7f9fb' : 'white' }}>
                        <td className={styles.itemHeader}>
                            {`${index + 1}.`}
                        </td>
                        <td className={styles.itemHeader}>
                            <Link className={styles.name} href={contest.hostURL}>
                                {contest.name}
                            </Link>
                        </td>
                        <td className={styles.item}>
                            <Link className={styles.link} href={contest.hostURL}>
                                {`@${contest.host}`}
                            </Link>
                        </td>
                        <td className={styles.ritemow}>
                            <Link className={styles.link} href={`https://tonscan.org/address/${contest.address}`}>
                                {shortenAddress(contest.address)}
                            </Link>
                        </td>
                        <td className={styles.item}>
                            {formatDate(contest.start)}
                        </td>
                        <td className={styles.item}>
                            {formatDate(contest.end)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ContestList;