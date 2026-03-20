import { SearchProvider, SearchOptions, SearchResult } from "../../capabilities/search/interface";

export class TavilySearch implements SearchProvider {
    constructor(private apiKey?: string) {
        this.apiKey = apiKey || process.env.SHRIM_SEARCH_KEY;
    }

    async search(query: string, options?: SearchOptions): Promise<SearchResult[]> {
        if (!this.apiKey) {
            throw new Error("Tavily API key not found. Please set SHRIM_SEARCH_KEY.");
        }

        const res = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: this.apiKey,
                query: query,
                search_depth: options?.depth || 'basic',
                max_results: options?.limit || 5
            })
        });

        if (!res.ok) {
            const err = await res.text().catch(() => "");
            throw new Error(`Tavily search failed (${res.status}): ${err}`);
        }

        const data = await res.json() as any;
        return (data.results || []).map((r: any) => ({
            title: r.title,
            url: r.url,
            snippet: r.content
        }));
    }
}
