import { FlairMode } from './settings.js';

export function escapeOmniboxText(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&quot;');
}

// Suggestions Formatter
type Registry = 'npm' | 'pypi' | 'dart';

const icons: Record<Registry, string> = {
    npm: '🟢 npm',
    pypi: '🐍 PyPI',
    dart: '🎯 Dart'
};

interface SuggestionInput {
    registry: Registry;
    name: string;
    summary: string;
    version: string;
    updated: string;
    flairMode: FlairMode;
}

export function buildSuggestion({  registry, name, summary, version, updated, flairMode }: SuggestionInput): chrome.omnibox.SuggestResult {
    const summarySafe = escapeOmniboxText(summary || 'No description');
    const date = new Date(updated).toLocaleDateString();

    const description = flairMode === 'detailed'
        ? `${icons[registry]} | 📦 ${name} — ${summarySafe} 🆕 v${version} 📅 ${date}`
        : `${icons[registry]} | ${name} v${version}`;

    return {
        content: `${registry} ${name}`,
        description
    };
}