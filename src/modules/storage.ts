export async function getRecentSearches(): Promise<string[]> {
    return new Promise(resolve => {
        chrome.storage.local.get(['pkg_recent'], result => {
            resolve(result.recent || []);
        });
    });
}

export async function storeRecentSearch(search: string): Promise<void> {
    const recent = await getRecentSearches();
    const updated = [search, ...recent.filter(s => s !== search)].slice(0, 5);
    return new Promise(resolve => {
        chrome.storage.local.set({ pkg_recent: updated }, resolve);
    });
}