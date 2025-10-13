import { config } from '@/config';
import z from 'zod';

export type ID = string | number;

type ResultSuccess<T> = { ok: true; data: T; status: number };
type ResultError = { ok: false; error: { message: string; timeout?: string }; status: number };

export type Result<T> = ResultSuccess<T> | ResultError;

/**
 * Get the authentication token from cookies
 */
function getToken(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    
    const name = config.cookies.token_key + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length);
        }
    }
    return undefined;
}

/**
 * Set authentication token in cookies
 */
export function setToken(token: string, expiresInDays: number = 30): void {
    if (typeof document === 'undefined') return;
    
    const date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${config.cookies.token_key}=${token};${expires};path=/`;
}

/**
 * Remove authentication token from cookies
 */
export function removeToken(): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${config.cookies.token_key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Fetch with schema validation
 */
export async function fetchWithSchema<T>(
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
        const res = await fetch(url, { ...opts, headers });
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
            // Try to parse error message from response
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
 * Fetch with authentication
 */
export async function fetchWithAuth<T>(
    url: string,
    opts: RequestInit,
    schema: z.ZodSchema<T>
): Promise<Result<T>> {
    const token = getToken();
    return fetchWithSchema(url, opts, schema, token);
}
