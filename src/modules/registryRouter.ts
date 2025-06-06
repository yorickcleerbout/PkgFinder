import { fetchNpmSuggestions } from './npm.js';
import { fetchPypiSuggestions } from './pypi';
import { fetchPubSuggestions } from './pub';

export async function fetchSuggestionsByPrefix(prefix: string, query: string) {
    switch (prefix.toLowerCase()) {
        case 'npm':
            return fetchNpmSuggestions(query);
        case 'pypi':
            return fetchPypiSuggestions(query);
        case 'dart':
        case 'pub':
            return fetchPubSuggestions(query);
        default:
            return [];
    }
}
