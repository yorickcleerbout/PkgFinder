import type { Result } from './types.js';

export async function safeFetch<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<Result<T>> {
    try {
        const res = await fetch(input, init);
        if (!res.ok) {
            return { ok: false, error: new Error(`HTTP ${res.status}: ${res.statusText}`) };
        }

        const data = await res.json() as T;
        return { ok: true, data };
    } catch (err: any) {
        return { ok: false, error: err instanceof Error ? err : new Error(String(err)) };
    }
}
