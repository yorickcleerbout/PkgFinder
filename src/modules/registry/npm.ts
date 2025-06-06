import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';
import { safeFetch } from '../core/net.js';


export async function fetchNpmSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();

    const result = await safeFetch<{ objects: any[] }>(
        `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`
    );

    if (!result.ok) {
        console.error('npm fetch failed:', result.error);
        return [];
    }

    if (!Array.isArray(result.data.objects)) {
        console.warn('Unexpected npm response structure:', result.data);
        return [];
    }

    return result.data.objects.map((pkg: any) => {
        const input: RegistrySuggestionInput = {
            registry: 'npm',
            name: pkg.package.name,
            summary: pkg.package.description,
            version: pkg.package.version,
            updated: pkg.package.date,
            flairMode
        };

        return buildSuggestion(input);
    });
}
