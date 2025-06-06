import { fetchNpmSuggestions } from '../registry/npm.js';
import { fetchPypiSuggestions } from '../registry/pypi.js';
import { fetchPubSuggestions } from '../registry/pub.js';

export async function fetchSuggestionsByPrefix(prefix: string, query: string) {
    switch (prefix.toLowerCase()) {
        case 'npm':
            return await fetchNpmSuggestions(query);
        case 'pypi':
            return await fetchPypiSuggestions(query);
        case 'dart':
        case 'pub':
            return await fetchPubSuggestions(query);
        default:
            return [];
    }
}
