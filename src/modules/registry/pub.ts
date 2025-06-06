import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';
import {safeFetch} from '../core/net.js';

export async function fetchPubSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();

    const result = await safeFetch<{ packages: { package: string }[] }>(
        `https://pub.dev/api/search?q=${encodeURIComponent(query)}`
    );

    if (!result.ok) {
        console.error('pub.dev search failed:', result.error);
        return [];
    }


    // const res = await fetch(`https://pub.dev/api/search?q=${encodeURIComponent(query)}`);
    // const data = await res.json();

    const packages = result.data.packages.slice(0, 5);

    const suggestions: PkgSuggestion[] = [];

    for (const pkg of packages) {
        // const res = await fetch(`https://pub.dev/api/packages/${pkg.package}`);
        // const data = await res.json();
        const detailResult = await safeFetch<any>(`https://pub.dev/api/packages/${pkg.package}`);

        if (!detailResult.ok) {
            console.warn(`Skipping ${pkg.package} due to fetch error:`, detailResult.error);
            continue;
        }

        const data = detailResult.data;

        const input: RegistrySuggestionInput = {
            registry: 'dart',
            name: data.name,
            summary: data.latest.pubspec.description,
            version: data.latest.version,
            updated: data.latest.published,
            flairMode
        };

        suggestions.push(buildSuggestion(input));
    }

    return suggestions;
}