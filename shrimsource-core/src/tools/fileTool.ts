import { Tool } from "../types";
import { StorageProvider } from "../capabilities/storage/interface";

export function createFileTools(provider: StorageProvider): Tool[] {
    return [
        {
            name: "storage_upload",
            description: "Upload content to file storage",
            run: async ({ input }) => {
                const { key, content } = input as { key: string; content: string | Buffer };
                const url = await provider.upload(key, content);
                return { status: "success", url };
            }
        },
        {
            name: "storage_download",
            description: "Download content from file storage",
            run: async ({ input }) => {
                const { key } = input as { key: string };
                const content = await provider.download(key);
                if (content === null) {
                    throw new Error(`File not found: ${key}`);
                }
                // Return as string if it's a buffer/uint8array
                const result = typeof content === "string" ? content : content.toString();
                return { status: "success", content: result };
            }
        },
        {
            name: "storage_delete",
            description: "Delete file from storage",
            run: async ({ input }) => {
                const { key } = input as { key: string };
                await provider.delete(key);
                return { status: "success", key };
            }
        }
    ];
}
