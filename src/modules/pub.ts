import { escapeOmniboxText } from './utils.js';

export interface PubSuggestion {
    content: string;
    description: string;
}

export async function fetchPubSuggestions(query: string): Promise<PubSuggestion[]> {
    const res = await fetch(`https://pub.dev/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const packages = data.packages.slice(0, 5);
    const suggestions: PubSuggestion[] = [];

    for (const pkg of packages) {
        const info = await fetchPubPackageInfo(pkg.package);
        suggestions.push(info);
    }

    return suggestions;
}

async function fetchPubPackageInfo(name: string): Promise<PubSuggestion> {
    const res = await fetch(`https://pub.dev/api/packages/${name}`);
    const data = await res.json();

    const version = data.latest.version;
    const updated = new Date(data.latest.published).toLocaleDateString();
    const desc = data.latest.pubspec.description;

    return {
        content: `dart ${name}`,
        description: escapeOmniboxText(`${name} — ${desc} (v${version}, updated ${updated})`)
    };
}