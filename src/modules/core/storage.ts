export async function getRecentSearches(registry?: string): Promise<string[]> {
    return new Promise(resolve => {
        chrome.storage.local.get(['pkg_recent'], result => {
            const recentRaw = result.pkg_recent ?? {};
            const recent = recentRaw as Record<string, string[]>;

            if (registry) {
                resolve(recent[registry] ?? []);
            } else {
                // Flatten all history arrays
                const merged: string[] = Object.values(recent)
                    .flat()
                    .filter((v): v is string => true);
                resolve(merged);
            }
        });
    });
}

export async function storeRecentSearch(search: string): Promise<void> {
    const [prefix] = search.trim().split(' ');
    const all = await new Promise<Record<string, string[]>>(resolve =>
        chrome.storage.local.get('pkg_recent', res => resolve(res.pkg_recent || {}))
    );

    const existing = all[prefix] || [];
    const updated = [search, ...existing.filter(s => s !== search)].slice(0, 5);

    return new Promise(resolve => {
        chrome.storage.local.set({ pkg_recent: { ...all, [prefix]: updated } }, resolve);
    });
}