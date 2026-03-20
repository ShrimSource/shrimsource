import { Tool } from "../types";
import { SearchProvider } from "../capabilities/search/interface";

export function createSearchTool(provider: SearchProvider): Tool {
    return {
        name: "search",
        description: "Search the internet for real-time information",
        run: async ({ input }) => {
            const query = (input as { query: string }).query;
            const results = await provider.search(query);
            return results;
        }
    };
}
