import { getRecentSearches } from './modules/storage.js';
import { fetchSuggestionsByPrefix } from './modules/registryRouter.js';

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
