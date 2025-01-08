import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitize from "sanitize-html";
import { marked } from "marked";

// Combines strings to tailwindcss class
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Converts a number to its corresponding letetr in capital english alphabet
export const itoc = (i: number) => String.fromCharCode(65 + i);

// Parses plaint text as a markdown and sanitizes HTML output
export const parseMD = (md: string): string => {
    const parsed = marked.parse(md);
    if (parsed instanceof Promise) {
        parsed.then((val) => {
            return sanitize(val);
        });
    } else {
        return sanitize(parsed);
    }
    return '';
}