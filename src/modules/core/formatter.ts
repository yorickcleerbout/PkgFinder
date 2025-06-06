import { RegistrySuggestionInput, PkgSuggestion } from './types.js';
import { registryMetaMap } from './constants.js';

export function escapeOmniboxText(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&quot;');
}

export function buildSuggestion(input: RegistrySuggestionInput): PkgSuggestion {
    const { registry, name, summary, version, updated, flairMode } = input;
    const summarySafe = escapeOmniboxText(summary || 'No description');
    const date = new Date(updated).toLocaleDateString();

    const icon = registryMetaMap[registry].icon;

    const description = flairMode === 'detailed' ? `${icon} | 📦 ${name} — ${summarySafe} 🆕 v${version} 📅 ${date}` : `${icon} | ${name} v${version}`;

    return {
        content: `${registry} ${name}`,
        description
    };
}