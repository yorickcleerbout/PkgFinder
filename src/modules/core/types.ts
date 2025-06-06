// All supported registries
export type Registry = 'npm' | 'pypi' | 'dart';

// Flair mode (compact or detailed)
export type FlairMode = 'compact' | 'detailed';

// Standard structure for omnibox suggestions
export interface RegistrySuggestionInput {
    registry: Registry;
    name: string;
    summary: string;
    version: string;
    updated: string;
    flairMode: FlairMode;
}

// Output suggestion shape
export interface PkgSuggestion {
    content: string;
    description: string;
}
