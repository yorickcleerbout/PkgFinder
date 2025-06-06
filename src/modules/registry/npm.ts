import type { PkgSuggestion, RegistrySuggestionInput } from '../core/types.js';
import { buildSuggestion } from '../core/formatter.js';
import { getFlairMode } from '../core/settings.js';


export async function fetchNpmSuggestions(query: string): Promise<PkgSuggestion[]> {
    const flairMode = await getFlairMode();
    const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`);
    const data = await res.json();

    return data.objects.map((pkg: any) => {
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
