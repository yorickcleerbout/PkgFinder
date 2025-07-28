import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';
import { safeFetch } from '../core/net.js';

export async function fetchPackagistSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();

    const result = await safeFetch<{ results: { name: string; description: string }[] }>(
        `https://packagist.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!result.ok) {
        console.error('Packagist fetch failed:', result.error);
        return [];
    }

    const data = result.data;

    if (!data || !Array.isArray(data.results)) {
        console.warn('Unexpected structure from Packagist:', data);
        return [];
    }

    const pkgs = data.results.slice(0, 5);
    const suggestions: PkgSuggestion[] = [];

    for (const pkg of pkgs) {
        const detailUrl = `https://repo.packagist.org/p2/${pkg.name}.json`;
        const detailResult = await safeFetch<any>(detailUrl);

        if (!detailResult.ok) {
            console.warn(`Skipping ${pkg.name} due to detail fetch error:`, detailResult.error);
            continue;
        }

        const packageData = detailResult.data.packages?.[pkg.name];
        let version = '';
        let updated = '';

        if (Array.isArray(packageData) && packageData.length > 0) {
            const latest = packageData[0];
            version = latest.version;
            updated = latest.time; // ISO timestamp
        }

        const input: RegistrySuggestionInput = {
            registry: 'php',
            name: pkg.name,
            summary: pkg.description,
            version,
            updated,
            flairMode
        };

        suggestions.push(buildSuggestion(input));
    }

    return suggestions;
}