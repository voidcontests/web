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
        const day = date.getDate();

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = date.getMonth();
        const month = monthNames[monthIndex];

        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return `${day} ${month}, ${formattedTime}`;
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
        <div style={{ width: '1120px', margin: '0 auto' }}>
            <div style={{ display: 'flex', padding: '10px', fontWeight: 'bold' }}>
                <div className={styles.itemHeader} style={{ flex: '0 0 50px' }}>#</div>
                <div className={styles.itemHeader} style={{ flex: '1' }}>Name</div>
                <div className={styles.itemHeader} style={{ flex: '1' }}>Host</div>
                <div className={styles.itemHeader} style={{ flex: '1' }}>Address</div>
                <div className={styles.itemHeader} style={{ flex: '1' }}>Start</div>
                <div className={styles.itemHeader} style={{ flex: '1' }}>End</div>
            </div>
            {props.contests.map((contest, index) => (
                <div key={index} style={{ height: "40px", display: 'flex', alignItems: 'center', borderRadius: "15px", backgroundColor: index % 2 === 0 ? 'var(--gray-100)' : 'none', padding: '10px' }}>
                    <div className={styles.itemHeader} style={{ flex: '0 0 50px' }}>
                        {`${index + 1}.`}
                    </div>
                    <div className={styles.itemHeader} style={{ flex: '1' }}>
                        <Link className={styles.name} href={contest.hostURL}>
                            {contest.name}
                        </Link>
                    </div>
                    <div className={styles.item} style={{ flex: '1' }}>
                        <Link className={styles.link} href={contest.hostURL}>
                            {`@${contest.host}`}
                        </Link>
                    </div>
                    <div className={styles.ritemow} style={{ flex: '1' }}>
                        <Link className={styles.link} href={`https://tonscan.org/address/${contest.address}`}>
                            {shortenAddress(contest.address)}
                        </Link>
                    </div>
                    <div className={styles.item} style={{ flex: '1' }}>
                        {formatDate(contest.start)}
                    </div>
                    <div className={styles.item} style={{ flex: '1' }}>
                        {formatDate(contest.end)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContestList;