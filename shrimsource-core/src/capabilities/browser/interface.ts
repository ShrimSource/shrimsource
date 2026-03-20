export interface BrowserOptions {
    timeoutMs?: number;
    [key: string]: any;
}

export interface BrowserProvider {
    /**
     * Fetch HTML content from a URL trivially.
     */
    fetch(url: string, options?: BrowserOptions): Promise<string>;

    /**
     * Use a real browser engine to render the page and extract text/HTML.
     */
    scrape(url: string, options?: BrowserOptions): Promise<string>;
}
