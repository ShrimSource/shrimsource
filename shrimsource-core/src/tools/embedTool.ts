import { Tool } from "../types";
import { EmbedProvider } from "../capabilities/embed/interface";

export function createEmbedTool(provider: EmbedProvider): Tool {
    return {
        name: "embed",
        description: "Generate vector embeddings for text",
        run: async ({ input }) => {
            const text = (input as { text: string }).text;
            const embeddings = await provider.embed(text);
            return embeddings;
        }
    };
}
