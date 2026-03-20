import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { LocalFileStorage } from "../src/providers/storage/local"
import { createFileTools } from "../src/tools/fileTool"
import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as os from "node:os"

describe("storage", () => {
    let tempDir: string
    let storage: LocalFileStorage

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "shrim-storage-test-"))
        storage = new LocalFileStorage(tempDir)
    })

    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true })
    })

    describe("LocalFileStorage", () => {
        it("should upload and download a string file", async () => {
            const key = "test.txt"
            const content = "hello world"
            
            const url = await storage.upload(key, content)
            expect(url).toContain(key)
            
            const downloaded = await storage.download(key)
            expect(downloaded?.toString()).toBe(content)
        })

        it("should delete a file", async () => {
            const key = "delete-me.txt"
            await storage.upload(key, "content")
            
            await storage.delete(key)
            const downloaded = await storage.download(key)
            expect(downloaded).toBeNull()
        })

        it("should prevent directory traversal", async () => {
            const key = "../outside.txt"
            await expect(storage.upload(key, "content")).rejects.toThrow("Invalid storage key")
        })
    })

    describe("fileTool tools", () => {
        it("should expose upload, download and delete tools", () => {
            const tools = createFileTools(storage)
            const names = tools.map(t => t.name)
            expect(names).toContain("storage_upload")
            expect(names).toContain("storage_download")
            expect(names).toContain("storage_delete")
        })

        it("should successfully run storage_upload and storage_download", async () => {
            const tools = createFileTools(storage)
            const uploadTool = tools.find(t => t.name === "storage_upload")!
            const downloadTool = tools.find(t => t.name === "storage_download")!

            await uploadTool.run({ 
                state: {}, 
                input: { key: "tool-test.txt", content: "tool content" },
                memory: {} as any,
                stepId: "upload",
                workflowId: "test"
            });

            const result = await downloadTool.run({
                state: {},
                input: { key: "tool-test.txt" },
                memory: {} as any,
                stepId: "download",
                workflowId: "test"
            }) as { content: string };

            expect(result.content).toBe("tool content");
        })
    })
})
