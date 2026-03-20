import { StorageProvider } from "../../capabilities/storage/interface.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

/**
 * Local filesystem implementation of StorageProvider.
 */
export class LocalFileStorage implements StorageProvider {
    private baseDir: string;

    constructor(baseDir?: string) {
        // Default to a 'storage' directory in current working directory if not specified
        this.baseDir = baseDir || path.join(process.cwd(), "storage");
    }

    private getFullPath(key: string): string {
        // Prevent directory traversal attacks by resolving and checking the path
        const resolvedPath = path.resolve(this.baseDir, key);
        if (!resolvedPath.startsWith(path.resolve(this.baseDir))) {
            throw new Error(`Invalid storage key: ${key}. Access outside of storage directory is denied.`);
        }
        return resolvedPath;
    }

    async upload(key: string, file: Uint8Array | Buffer | string): Promise<string> {
        const fullPath = this.getFullPath(key);
        const dir = path.dirname(fullPath);

        // Ensure directory exists
        await fs.mkdir(dir, { recursive: true });

        // Write file
        await fs.writeFile(fullPath, file);
        
        return `file://${fullPath}`;
    }

    async download(key: string): Promise<Uint8Array | Buffer | string | null> {
        const fullPath = this.getFullPath(key);
        try {
            const data = await fs.readFile(fullPath);
            return data;
        } catch (error: any) {
            if (error.code === "ENOENT") {
                return null;
            }
            throw error;
        }
    }

    async delete(key: string): Promise<void> {
        const fullPath = this.getFullPath(key);
        try {
            await fs.unlink(fullPath);
        } catch (error: any) {
            if (error.code !== "ENOENT") {
                throw error;
            }
        }
    }
}
