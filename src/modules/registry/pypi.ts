import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';
import {safeFetch} from '../core/net.js';

export async function fetchPypiSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();

    const names = await fetchSearchResultsFromWeb(query);
    const suggestions: PkgSuggestion[] = [];

    for (const name of names.slice(0, 5)) {
        try {
            const pkgInfo = await fetchPypiPackageInfo(name);

            if (!pkgInfo.ok) {
                console.warn(`Failed to fetch PyPI package info for ${name}:`, pkgInfo.error);
                continue;
            }

            const { version, summary, upload_time } = pkgInfo.data;

            const input: RegistrySuggestionInput = {
                registry: 'py',
                name,
                summary,
                version,
                updated: upload_time,
                flairMode
            };

            suggestions.push(buildSuggestion(input));
        } catch (e) {
            console.log(e);
        }
    }

    return suggestions;
}

async function fetchSearchResultsFromWeb(query: string): Promise<string[]> {
    const res = await fetch(`https://pypi.org/search/?q=${encodeURIComponent(query)}`);
    const html = await res.text();
    const matches = [...html.matchAll(/<a class="package-snippet" href="\/project\/([^\/]+)\//g)];
    return matches.map(m => m[1]);
}

async function fetchPypiPackageInfo(name: string) {
    const res = await safeFetch<any>(`https://pypi.org/pypi/${name}/json`);
    if (!res.ok) return res;

    const data = res.data;

    return {
        ok: true,
        data: {
            version: data.info.version,
            summary: data.info.summary,
            upload_time: data.releases[data.info.version]?.[0]?.upload_time_iso_8601 || data.info.upload_time_iso_8601
        }
    } as const;
}
