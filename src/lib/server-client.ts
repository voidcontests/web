import { cookies } from 'next/headers';
import z from 'zod';
import { config } from '@/config';
import { Result } from '@/lib/client';

/**
 * Get the authentication token from server-side cookies
 */
async function getServerToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    const token = cookieStore.get(config.cookies.token_key);
    return token?.value;
}

/**
 * Server-side fetch with schema validation
 */
export async function serverFetchWithSchema<T>(
    url: string,
    opts: RequestInit,
    schema: z.ZodSchema<T>,
    token?: string
): Promise<Result<T>> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(opts.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const res = await fetch(url, { ...opts, headers, cache: 'no-store' });
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
            const error = json as any;
            return {
                ok: false,
                error: { message: error?.message || `Request failed with status ${status}` },
                status,
            };
        }

        const parsed = schema.safeParse(json);
        if (!parsed.success) {
            return {
                ok: false,
                error: { message: `Validation failed: ${parsed.error.message}` },
                status,
            };
        }

        return {
            ok: true,
            data: parsed.data,
            status,
        };
    } catch (error) {
        return {
            ok: false,
            error: { message: error instanceof Error ? error.message : 'Network error' },
            status: 0,
        };
    }
}

/**
 * Server-side fetch with authentication
 */
export async function serverFetchWithAuth<T>(
    url: string,
    opts: RequestInit,
    schema: z.ZodSchema<T>
): Promise<Result<T>> {
    const token = await getServerToken();
    return serverFetchWithSchema(url, opts, schema, token);
}
