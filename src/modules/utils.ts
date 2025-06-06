import { RegistrySuggestionInput, PkgSuggestion } from './types.js';

export function escapeOmniboxText(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&quot;');
}

const icons: Record<RegistrySuggestionInput['registry'], string> = {
    npm: '🟢 npm',
    pypi: '🐍 PyPI',
    dart: '🎯 Dart'
};

export function buildSuggestion(input: RegistrySuggestionInput): PkgSuggestion {
    const { registry, name, summary, version, updated, flairMode } = input;
    const summarySafe = escapeOmniboxText(summary || 'No description');
    const date = new Date(updated).toLocaleDateString();

    const description = flairMode === 'detailed' ? `${icons[registry]} | 📦 ${name} — ${summarySafe} 🆕 v${version} 📅 ${date}` : `${icons[registry]} | ${name} v${version}`;

    return {
        content: `${registry} ${name}`,
        description
    };
}