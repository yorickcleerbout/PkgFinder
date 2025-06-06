import { escapeOmniboxText } from './utils.js';

export interface PypiSuggestion {
    content: string;
    description: string;
}

export async function fetchPypiSuggestions(query: string): Promise<PypiSuggestion[]> {
    const names = await fetchSearchResultsFromWeb(query);

    const suggestions: PypiSuggestion[] = [];

    for (const name of names.slice(0, 5)) {
        try {
            const info = await fetchPypiPackageInfo(name);
            const { version, summary, upload_time } = info;

            suggestions.push({
                content: `pypi ${name}`,
                description: escapeOmniboxText(`${name} — ${summary || 'No description'} (v${version}, updated ${new Date(upload_time).toLocaleDateString()})`)
            });
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
    const res = await fetch(`https://pypi.org/pypi/${name}/json`);
    const data = await res.json();

    return {
        version: data.info.version,
        summary: data.info.summary,
        upload_time: data.releases[data.info.version]?.[0]?.upload_time_iso_8601 || data.info.upload_time_iso_8601
    };
}
