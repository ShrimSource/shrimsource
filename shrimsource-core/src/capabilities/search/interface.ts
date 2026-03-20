export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}

export interface SearchOptions {
    limit?: number;
    [key: string]: any;
}

export interface SearchProvider {
    /**
     * Search the internet for the given query.
     */
    search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
}
