import { getRecentSearches, storeRecentSearch } from './modules/core/storage.js';
import { fetchSuggestionsByPrefix, resolvePackageUrl } from './modules/core/registryRouter.js';
import { toggleFlairMode } from './modules/core/settings.js';

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    const parts = text.trim().split(' ');
    const [prefix, ...queryParts] = parts;
    const query = queryParts.join(' ');
    const hasQuery = query.trim().length > 0;
    const hasPrefixOnly = parts.length === 1 && prefix.length > 0;

    if (!hasQuery && hasPrefixOnly) {
        const recent = await getRecentSearches(prefix);
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

    if (url) {
        await chrome.tabs.create({ url });
    } else {
        console.warn(`Unknown registry prefix: '${prefix}'. No redirect performed.`);
    }
});

chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'toggle-flair-mode') {
        const mode = await toggleFlairMode();
        console.log(`Description display mode set to: ${mode}`);
    }
});
