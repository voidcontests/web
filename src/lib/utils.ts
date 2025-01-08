import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines strings to tailwindcss class
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Converts a number to its corresponding letetr in capital english alphabet
export const itoc = (i: number) => String.fromCharCode(65 + i);