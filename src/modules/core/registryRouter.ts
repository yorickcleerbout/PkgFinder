import { fetchNpmSuggestions } from '../registry/npm.js';
import { fetchPypiSuggestions } from '../registry/pypi.js';
import { fetchPubSuggestions } from '../registry/pub.js';

export async function fetchSuggestionsByPrefix(prefix: string, query: string) {
    switch (prefix.toLowerCase()) {
        case 'npm':
            return await fetchNpmSuggestions(query);
        case 'py':
            return await fetchPypiSuggestions(query);
        case 'dart':
        case 'pub':
            return await fetchPubSuggestions(query);
        default:
            return [];
    }
}

export function resolvePackageUrl(prefix: string, query: string): string {
    switch (prefix.toLowerCase()) {
        case 'npm':
            return `https://www.npmjs.com/package/${query}`;
        case 'py':
            return `https://pypi.org/project/${query}`;
        case 'pub':
        case 'dart':
            return `https://pub.dev/packages/${query}`;
        default:
            return `https://www.npmjs.com/search?q=${encodeURIComponent(prefix + ' ' + query)}`;
    }
}
