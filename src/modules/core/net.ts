import type { Result } from './types.js';

export async function safeFetch<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<Result<T>> {
    try {
        // Determine User-Agent version dynamically (only in extension context)
        let userAgent = 'PkgFinder/unknown';
        if (typeof chrome !== 'undefined' && chrome.runtime?.getManifest) {
            userAgent = `PkgFinder/${chrome.runtime.getManifest().version}`;
        }

        // Merge default headers with user-provided headers
        const defaultHeaders: HeadersInit = {
            'Accept': 'application/json',
            'User-Agent': userAgent,
        };

        const mergedHeaders: HeadersInit = {
            ...defaultHeaders,
            ...(init?.headers || {})
        };

        const res = await fetch(input, {
            ...init,
            headers: mergedHeaders,
        });

        if (!res.ok) {
            return { ok: false, error: new Error(`HTTP ${res.status}: ${res.statusText}`) };
        }

        const data = await res.json() as T;
        return { ok: true, data };
    } catch (err: any) {
        return { ok: false, error: err instanceof Error ? err : new Error(String(err)) };
    }
}
