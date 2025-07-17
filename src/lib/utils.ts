import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines strings to tailwindcss class
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Converts a number to its corresponding letetr in capital english alphabet
export const itoc = (i: number) => String.fromCharCode(65 + i);

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

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
