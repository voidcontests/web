const format_date = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
}

export default function DateView({ date }: { date: Date }) {
    return (
        <span>
            {format_date(new Date(date))}
        </span>
    );
}
