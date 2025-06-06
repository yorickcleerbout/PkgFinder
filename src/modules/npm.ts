import { escapeOmniboxText } from './utils.js';

export interface NpmSuggestion {
    content: string;
    description: string;
}

export async function fetchNpmSuggestions(query: string): Promise<NpmSuggestion[]> {
    const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`);
    const data = await res.json();

    return data.objects.map((pkg: any) => {
        const name = pkg.package.name;
        const description = pkg.package.description || 'No description';
        const version = pkg.package.version;
        const date = new Date(pkg.package.date).toLocaleDateString();

        return {
            content: `npm ${name}`,
            description: escapeOmniboxText(`${name} — ${description} (v${version}, updated ${date})`)
        };
    });
}
