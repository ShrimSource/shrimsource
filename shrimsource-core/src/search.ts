import { TavilySearch } from './providers/search/tavily.js'
import { SearchResult, SearchOptions } from './capabilities/search/interface.js'

export type { SearchResult, SearchOptions }

/**
 * Search the internet with a single function call.
 * Uses Tavily by default. Reads SHRIM_SEARCH_KEY from environment.
 *
 * @example
 * const results = await search("OpenAI latest news")
 * // returns SearchResult[] with .title, .url, .snippet
 */
export async function search(
    query: string,
    options?: SearchOptions
): Promise<SearchResult[]> {
    const provider = new TavilySearch()
    return provider.search(query, options)
}

/**
 * Search and return results as a formatted string — useful for feeding
 * directly into a chat() prompt without manual formatting.
 */
export async function searchToText(
    query: string,
    options?: SearchOptions
): Promise<string> {
    const results = await search(query, options)
    if (results.length === 0) return 'No results found.'
    return results
        .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.snippet}`)
        .join('\n\n')
}
