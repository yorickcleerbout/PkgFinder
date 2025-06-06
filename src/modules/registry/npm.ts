import { buildSuggestion } from '../utils.js';
import { getFlairMode } from '../settings.js';

export interface NpmSuggestion {
    content: string;
    description: string;
}

export async function fetchNpmSuggestions(query: string): Promise<NpmSuggestion[]> {
    const flairMode = await getFlairMode();
    const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`);
    const data = await res.json();

    return data.objects.map((pkg: any) =>
        buildSuggestion({
            registry: 'npm',
            name: pkg.package.name,
            summary: pkg.package.description,
            version: pkg.package.version,
            updated: pkg.package.date,
            flairMode
        })
    );
}
