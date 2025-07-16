//
// NOTE:
// if server-action don't use server API like `cookies` from 'next/headers'
// next.js decides to do actual request only once (at build time). it leads to
// kinda 'statical' pages, that are even not marked as static in build logs.
//

import { config } from '@/config';
import { cookies } from 'next/headers';
import z from 'zod';

export type ID = string | number;

export async function fetchWithAuth<T>(url: string, options: RequestInit, schema: z.ZodSchema<T>): Promise<T> {
    const token = cookies().get(config.cookies.token_key)?.value;
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}. Body: ${errorBody}`);
    }

    const data = await res.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        throw new Error(`Response validation failed: ${parsed.error}`);
    }

    return parsed.data;
}
