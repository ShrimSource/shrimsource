import { Tool } from "../types";
import { MemoryProvider } from "../capabilities/memory/interface";

export function createMemoryTools(provider: MemoryProvider): Tool[] {
    return [
        {
            name: "memory_save",
            description: "Save information to memory",
            run: async ({ input }) => {
                const { key, data } = input as { key: string; data: any };
                await provider.save(key, data);
                return { status: "success", key };
            }
        },
        {
            name: "memory_search",
            description: "Search memory for relevant context",
            run: async ({ input }) => {
                const { query } = input as { query: string };
                if (provider.search) {
                    return await provider.search(query);
                }
                return [];
            }
        }
    ];
}
