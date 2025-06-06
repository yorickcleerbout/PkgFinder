import type { PkgSuggestion, RegistrySuggestionInput } from '../types.js';
import { buildSuggestion } from '../utils.js';
import { getFlairMode } from '../settings.js';

export async function fetchPubSuggestions(query: string): Promise<PkgSuggestion[]> {

    const res = await fetch(`https://pub.dev/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const packages = data.packages.slice(0, 5);
    const flairMode = await getFlairMode();

    const suggestions: PkgSuggestion[] = [];

    for (const pkg of packages) {
        const res = await fetch(`https://pub.dev/api/packages/${pkg.package}`);
        const data = await res.json();

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