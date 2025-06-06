// All supported registries
export type Registry = 'npm' | 'py' | 'dart';

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

// Generic success/failure container
export type Result<T> = Success<T> | Failure;

export interface Success<T> {
    ok: true;
    data: T;
}

export interface Failure {
    ok: false;
    error: Error;
}
