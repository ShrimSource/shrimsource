import { BrowserProvider, BrowserOptions } from "../../capabilities/browser/interface";

export class SimpleFetchBrowser implements BrowserProvider {
    async fetch(url: string, options?: BrowserOptions): Promise<string> {
        try {
            const response = await fetch(url, {
                signal: options?.timeoutMs ? AbortSignal.timeout(options.timeoutMs) : undefined
            });
            if (!response.ok) {
                throw new Error(`HTTP fetch failed: ${response.status} ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`SimpleFetchBrowser failed to fetch ${url}:`, error);
            throw error;
        }
    }

    async scrape(url: string, options?: BrowserOptions): Promise<string> {
        // Scrape implementation (e.g., parsing HTML into text)
        // For basic fetch we reuse the fetch method
        const html = await this.fetch(url, options);
        // Note: Real implementation would use cheerio or pure Regex/DOM parsing to strip tags
        return html;
    }
}
