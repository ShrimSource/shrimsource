export interface EmbedOptions {
    model?: string;
    [key: string]: any;
}

export interface EmbedProvider {
    /**
     * Create embeddings for the given text.
     */
    embed(text: string | string[], options?: EmbedOptions): Promise<number[][]>;
}
