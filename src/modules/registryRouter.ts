import { fetchNpmSuggestions } from './npm.js';

export async function fetchSuggestionsByPrefix(prefix: string, query: string) {
    switch (prefix.toLowerCase()) {
        case 'npm':
            return fetchNpmSuggestions(query);
        default:
            return [];
    }
}
