import { fetchNpmSuggestions } from '../registry/npm';
import { fetchPypiSuggestions } from '../registry/pypi';
import { fetchPubSuggestions } from '../registry/pub';

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
