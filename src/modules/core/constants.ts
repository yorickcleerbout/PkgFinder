import type { Registry } from './types.js';

export interface RegistryMeta {
    label: string;
    icon: string;
    baseUrl: string;
}

// Registry MetaData (Labels, Icons, etc)
export const registryMetaMap: Record<Registry, RegistryMeta> = {
    npm: {
        label: 'npm',
        icon: '🟢 npm',
        baseUrl: 'https://www.npmjs.com/package/'
    },
    py: {
        label: 'PyPI',
        icon: '🐍 PyPI',
        baseUrl: 'https://pypi.org/project/'
    },
    dart: {
        label: 'Dart',
        icon: '🎯 Dart',
        baseUrl: 'https://pub.dev/packages/'
    },
    crates: {
        label: 'Rust',
        icon: '🦀 Rust',
        baseUrl: 'https://crates.io/crates/'
    },
    php: {
        label: 'PHP',
        icon: '🐘 PHP',
        baseUrl: 'https://packagist.org/packages/'
    }
};