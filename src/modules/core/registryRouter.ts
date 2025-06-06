import { registryMetaMap } from './constants.js';
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

export function resolvePackageUrl(prefix: string, query: string): string | undefined {
    const normalized = normalizePrefix(prefix);
    const meta = registryMetaMap[normalized];

    if (meta) {
        return `${meta.baseUrl}${encodeURIComponent(query)}`;
    }

    return undefined;
}

export function normalizePrefix(prefix: string): keyof typeof registryMetaMap {
    switch (prefix.toLowerCase()) {
        case 'pypi': return 'py';
        case 'pub': return 'dart';
        default: return prefix.toLowerCase() as keyof typeof registryMetaMap;
    }
}