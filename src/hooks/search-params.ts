'use client'

export function useSearchParams() {
    if (typeof window === 'undefined') {
        return new URLSearchParams();
    }

    const search = window.location.search;
    const params = new URLSearchParams(search);

    return params;
}
