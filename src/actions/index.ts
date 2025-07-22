//
// NOTE:
// if server-action don't use server API like `cookies` from 'next/headers'
// next.js decides to do actual request only once (at build time). it leads to
// kinda 'statical' pages, that are even not marked as static in build logs.
//

import { config } from '@/config';
import { cookies } from 'next/headers';
import z from 'zod';
import { ErrorSchema } from './schemas';
import { Error } from './models/response';

export type ID = string | number;

type ResultSuccess<T> = { ok: true; data: T; status: number };
type ResultError = { ok: false, error: Error, status: number };

export type Result<T> = ResultSuccess<T> | ResultError;

export async function fetchWithSchema<T>(url: string, opts: RequestInit, schema: z.ZodSchema<T>, token?: string): Promise<Result<T>> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(opts.headers as Record<string, string>),
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(url, { ...opts, headers, next: { revalidate: 300 } });
	const status = res.status;
	const text = await res.text();

	let json: unknown;
	try {
		json = JSON.parse(text);
	} catch {
		return {
			ok: false,
			error: { message: `Invalid JSON response: ${text}` },
			status,
		};
	}

	if (!res.ok) {
		const parsedErr = ErrorSchema.safeParse(json);
		if (parsedErr.success) {
			return {
				ok: false,
				error: parsedErr.data,
				status,
			};
		} else {
			return {
				ok: false,
				error: { message: `Unknown error (${status})` },
				status,
			};
		}
	}

	const parsed = schema.safeParse(json);
	if (!parsed.success) {
		return {
			ok: false,
			error: { message: `Validation failed: ${parsed.error.message}, ${text}` },
			status,
		};
	}

	return {
		ok: true,
		data: parsed.data,
		status,
	};
}

export async function fetchWithAuth<T>(url: string, opts: RequestInit, schema: z.ZodSchema<T>): Promise<Result<T>> {
	const token = cookies().get(config.cookies.token_key)?.value;
	return fetchWithSchema(url, opts, schema, token);
}
