import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines strings to tailwindcss class
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Converts a number to its corresponding letetr in capital english alphabet
export const itoc = (i: number) => String.fromCharCode(65 + i);

export const format_date = (date: Date): string => {
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

export const format_duration = (duration_mins: number): string => {
    if (duration_mins < 0) {
        return "00:00";
    }

    const hours = Math.floor(duration_mins / 60);
    const minutes = duration_mins % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}