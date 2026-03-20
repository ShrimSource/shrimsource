import { EmbedProvider, EmbedOptions } from "../../capabilities/embed/interface";

export class OpenAIEmbed implements EmbedProvider {
    constructor(private apiKey?: string) {
        this.apiKey = apiKey || process.env.SHRIM_EMBED_KEY;
    }

    async embed(text: string | string[], options?: EmbedOptions): Promise<number[][]> {
        let texts = Array.isArray(text) ? text : [text];

        if (!this.apiKey) {
            throw new Error("OpenAI API key not found. Please set SHRIM_EMBED_KEY.");
        }

        const res = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: texts,
                model: options?.model || 'text-embedding-3-small'
            })
        });

        if (!res.ok) {
            const err = await res.text().catch(() => "");
            throw new Error(`OpenAI embed failed (${res.status}): ${err}`);
        }

        const data = await res.json() as any;
        return data.data.map((d: any) => d.embedding);
    }
}
