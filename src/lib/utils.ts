import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// combines strings to tailwindcss class
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// sleep sleeps
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
