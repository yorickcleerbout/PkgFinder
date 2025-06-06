import { getRecentSearches, storeRecentSearch } from './modules/core/storage.js';
import { fetchSuggestionsByPrefix, resolvePackageUrl } from './modules/core/registryRouter.js';
import { toggleFlairMode } from './modules/core/settings.js';

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    const [prefix, ...queryParts] = text.trim().split(' ');
    const query = queryParts.join(' ') || prefix;

    if (!query) {
        const recent = await getRecentSearches();
        suggest(recent.map(q => ({
            content: q,
            description: `Recent search: ${q}`
        })));
        return;
    }

    const suggestions = await fetchSuggestionsByPrefix(prefix, query);
    suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(async (text) => {
    await storeRecentSearch(text);

    const [prefix, ...queryParts] = text.trim().split(' ');
    const query = queryParts.join(' ') || prefix;

    const url = resolvePackageUrl(prefix, query);
    await chrome.tabs.create({ url });
});

chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'toggle-flair-mode') {
        const mode = await toggleFlairMode();
        console.log(`Description display mode set to: ${mode}`);
    }
});
