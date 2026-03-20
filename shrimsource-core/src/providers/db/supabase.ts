import { MemoryProvider } from "../../capabilities/memory/interface";

export class SupabaseMemory implements MemoryProvider {
    private client: any;

    constructor(dbUrl?: string, dbKey?: string) {
        const url = dbUrl || process.env.SHRIM_DB_URL;
        const key = dbKey || process.env.SHRIM_DB_KEY;

        if (url && key) {
            // this.client = createClient(url, key);
        } else {
            console.warn("Supabase credentials not found. Using dummy memory.");
        }
    }

    async save(key: string, data: any): Promise<void> {
        if (!this.client) {
            console.log(`[Supabase Dummy] Saved key: ${key}`);
            return;
        }
        // Real implementation:
        // await this.client.from('memory').upsert({ id: key, content: data });
    }

    async load<T>(key: string): Promise<T | null> {
        if (!this.client) {
            console.log(`[Supabase Dummy] Loaded key: ${key}`);
            return null;
        }
        return null;
    }

    async search(query: string, limit?: number): Promise<any[]> {
        if (!this.client) {
            console.log(`[Supabase Dummy] Searched for: ${query}`);
            return [];
        }
        return [];
        // Real Vector Search RPC implementation:
        // return await this.client.rpc('match_documents', { query_embedding: [...], match_threshold: 0.78, match_count: limit });
    }
}
