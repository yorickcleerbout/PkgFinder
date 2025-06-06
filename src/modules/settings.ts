import type { FlairMode } from './types.js';

export async function getFlairMode(): Promise<FlairMode> {
    return new Promise(resolve => {
        chrome.storage.local.get(['flairMode'], result => {
            resolve((result.flairMode || 'detailed') as FlairMode);
        });
    });
}

export async function toggleFlairMode(): Promise<FlairMode> {
    const current = await getFlairMode();
    const next = current === 'detailed' ? 'compact' : 'detailed';

    return new Promise(resolve => {
        chrome.storage.local.set({ flairMode: next }, () => resolve(next));
    });
}