export interface StorageProvider {
    /**
     * Upload a file to storage.
     */
    upload(key: string, file: Uint8Array | Buffer | string): Promise<string>;

    /**
     * Download a file from storage.
     */
    download(key: string): Promise<Uint8Array | Buffer | string | null>;

    /**
     * Delete a file from storage.
     */
    delete(key: string): Promise<void>;
}
