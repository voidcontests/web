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

export type Response<T> = { data: T, status: number };

export async function fetchWithAuth<T>(url: string, options: RequestInit, schema: z.ZodSchema<T>): Promise<Response<T>> {
    const token = cookies().get(config.cookies.token_key)?.value;
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const res = await fetch(url, { ...options, headers });
    const status = res.status;

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Fetch failed: ${status} ${res.statusText}. Body: ${errorBody}`);
    }

    const json = await res.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
        throw new Error(`Response validation failed: ${parsed.error}`);
    }

    return { data: parsed.data, status };
}
