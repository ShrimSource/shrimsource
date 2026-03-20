import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

// registry.ts caches the result in a module-level variable.
// We must reset modules between tests that need fresh state.

const SAMPLE_REGISTRY = [
    {
        name: 'code-review-agent',
        description: 'Reviews pull requests',
        source: { type: 'github', repo: 'ShrimSource/shrimsource', subdir: 'shrimsource-templates/code-review-agent', branch: 'main' },
        capabilities: ['llm']
    },
    {
        name: 'web-scraper-agent',
        description: 'Scrapes web pages',
        source: { type: 'github', repo: 'ShrimSource/shrimsource', subdir: 'shrimsource-templates/web-scraper-agent', branch: 'main' },
        capabilities: ['llm', 'browser']
    }
]

// ─── helpers ────────────────────────────────────────────────────────────────

async function importFreshRegistry() {
    vi.resetModules()
    return import('../src/templates/registry.ts')
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe('getAllTemplates', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.unstubAllEnvs()
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllEnvs()
    })

    it('returns templates from local file when SHRIM_LOCAL_REGISTRY is set', async () => {
        const tmpDir = os.tmpdir()
        const tmpFile = path.join(tmpDir, `registry-test-${Date.now()}.json`)
        await fs.writeFile(tmpFile, JSON.stringify(SAMPLE_REGISTRY), 'utf-8')

        try {
            vi.stubEnv('SHRIM_LOCAL_REGISTRY', tmpFile)
            const { getAllTemplates } = await importFreshRegistry()
            const templates = await getAllTemplates()
            expect(templates).toHaveLength(2)
            expect(templates[0].name).toBe('code-review-agent')
        } finally {
            await fs.unlink(tmpFile)
        }
    })

    it('throws when SHRIM_LOCAL_REGISTRY points to a missing file', async () => {
        vi.stubEnv('SHRIM_LOCAL_REGISTRY', '/nonexistent/path/registry.json')
        const { getAllTemplates } = await importFreshRegistry()
        await expect(getAllTemplates()).rejects.toThrow('Failed to load local registry from')
    })

    it('returns cached result on second call (no double-fetch)', async () => {
        const tmpDir = os.tmpdir()
        const tmpFile = path.join(tmpDir, `registry-cache-${Date.now()}.json`)
        await fs.writeFile(tmpFile, JSON.stringify(SAMPLE_REGISTRY), 'utf-8')

        try {
            vi.stubEnv('SHRIM_LOCAL_REGISTRY', tmpFile)
            const { getAllTemplates } = await importFreshRegistry()

            const first = await getAllTemplates()
            // Overwrite the file after first read – second call should still return the cached data
            await fs.writeFile(tmpFile, JSON.stringify([]), 'utf-8')
            const second = await getAllTemplates()

            expect(second).toBe(first) // same reference = cache hit
        } finally {
            await fs.unlink(tmpFile)
        }
    })

    it('fetches from GitHub when no local override is set', async () => {
        vi.unstubAllEnvs()
        // Mock cross-fetch for the network branch
        vi.doMock('cross-fetch', () => ({
            default: vi.fn().mockResolvedValue({
                ok: true,
                json: async () => SAMPLE_REGISTRY
            })
        }))
        const { getAllTemplates } = await importFreshRegistry()
        const templates = await getAllTemplates()
        expect(templates).toHaveLength(2)
    })

    it('throws when remote fetch fails', async () => {
        vi.unstubAllEnvs()
        vi.doMock('cross-fetch', () => ({
            default: vi.fn().mockResolvedValue({
                ok: false,
                statusText: 'Not Found'
            })
        }))
        const { getAllTemplates } = await importFreshRegistry()
        await expect(getAllTemplates()).rejects.toThrow('Could not load template registry from GitHub')
    })
})

describe('findTemplateByName', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.unstubAllEnvs()
    })

    afterEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllEnvs()
    })

    async function importWithLocalRegistry() {
        const tmpDir = os.tmpdir()
        const tmpFile = path.join(tmpDir, `registry-find-${Date.now()}.json`)
        await fs.writeFile(tmpFile, JSON.stringify(SAMPLE_REGISTRY), 'utf-8')
        vi.stubEnv('SHRIM_LOCAL_REGISTRY', tmpFile)
        const mod = await importFreshRegistry()
        return { mod, tmpFile }
    }

    it('returns the matching template by name', async () => {
        const { mod, tmpFile } = await importWithLocalRegistry()
        try {
            const result = await mod.findTemplateByName('web-scraper-agent')
            expect(result).toBeDefined()
            expect(result!.name).toBe('web-scraper-agent')
        } finally {
            await fs.unlink(tmpFile)
        }
    })

    it('returns undefined for an unknown name', async () => {
        const { mod, tmpFile } = await importWithLocalRegistry()
        try {
            const result = await mod.findTemplateByName('does-not-exist')
            expect(result).toBeUndefined()
        } finally {
            await fs.unlink(tmpFile)
        }
    })
})
