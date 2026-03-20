import { Tool } from "../types";
import { BrowserProvider } from "../capabilities/browser/interface";

export function createScrapeTool(provider: BrowserProvider): Tool {
    return {
        name: "scrape",
        description: "Scrape text content from a website URL",
        run: async ({ input }) => {
            const url = (input as { url: string }).url;
            return await provider.scrape(url);
        }
    };
}
