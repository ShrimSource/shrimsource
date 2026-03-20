import { StorageProvider } from "../../capabilities/storage/interface";

export class S3Storage implements StorageProvider {
    constructor(private apiKey?: string) {
        // Init S3 client
        this.apiKey = apiKey || process.env.STORAGE_KEY;
    }

    async upload(key: string, file: Uint8Array | Buffer | string): Promise<string> {
        console.log(`[S3 Dummy] Uploaded file to key: ${key}`);
        return `s3://dummy-bucket/${key}`;
    }

    async download(key: string): Promise<Uint8Array | Buffer | string | null> {
        console.log(`[S3 Dummy] Downloaded file from key: ${key}`);
        return null; // Return dummy data
    }

    async delete(key: string): Promise<void> {
        console.log(`[S3 Dummy] Deleted file key: ${key}`);
    }
}
