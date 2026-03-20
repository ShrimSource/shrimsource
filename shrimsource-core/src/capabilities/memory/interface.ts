export interface MemoryProvider {
    /**
     * Save data (key-value or document).
     */
    save(key: string, data: any): Promise<void>;

    /**
     * Load data by key.
     */
    load<T>(key: string): Promise<T | null>;

    /**
     * Search memory (e.g., vector search if text/embeddings are used).
     */
    search?(query: string, limit?: number): Promise<any[]>;
}
