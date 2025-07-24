import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';
import { safeFetch } from '../core/net.js';

export async function fetchCratesSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();

    const result = await safeFetch<{ crates: any[] }>(
        `https://crates.io/api/v1/crates?page=1&per_page=5&q=${encodeURIComponent(query)}`
    );

    if (!result.ok) {
        console.error('crates.io fetch failed:', result.error);
        return [];
    }

    const crates = result.data.crates;

    return crates.map((crate: any) => {
        const input: RegistrySuggestionInput = {
            registry: 'crates',
            name: crate.id,
            summary: crate.description,
            version: crate.newest_version,
            updated: crate.updated_at,
            flairMode
        };

        return buildSuggestion(input);
    });
}