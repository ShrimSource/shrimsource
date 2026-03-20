import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getRequiredEnvKeys, serializeEnv, writeEnvFile } from '../src/services/env-service'

// ─── getRequiredEnvKeys ──────────────────────────────────────────────────────

describe('getRequiredEnvKeys', () => {
    it('returns all 4 LLM keys for ["llm"]', () => {
        const keys = getRequiredEnvKeys(['llm'])
        expect(keys).toContain('SHRIM_LLM_PROVIDER')
        expect(keys).toContain('LLM_API_KEY')
        expect(keys).toContain('LLM_MODEL')
        expect(keys).toContain('LLM_BASE_URL')
        expect(keys).toHaveLength(4)
    })

    it('returns empty array for empty capabilities', () => {
        expect(getRequiredEnvKeys([])).toEqual([])
    })

    it('returns only SHRIM_BROWSER_PROVIDER for ["browser"]', () => {
        const keys = getRequiredEnvKeys(['browser'])
        expect(keys).toEqual(['SHRIM_BROWSER_PROVIDER'])
    })

    it('returns union of keys without duplicates for multiple capabilities', () => {
        const keys = getRequiredEnvKeys(['llm', 'search'])
        // llm: 4 keys, search: 2 keys → 6 total, no overlap
        expect(keys).toContain('SHRIM_LLM_PROVIDER')
        expect(keys).toContain('SHRIM_SEARCH_PROVIDER')
        expect(keys).toContain('SHRIM_SEARCH_KEY')
        expect(keys.length).toBe(new Set(keys).size) // no duplicates
        expect(keys).toHaveLength(6)
    })

    it('returns deduplicated keys when two capabilities share env vars', () => {
        // same capability listed twice should not produce duplicates
        const once = getRequiredEnvKeys(['llm'])
        const twice = getRequiredEnvKeys(['llm', 'llm'] as any)
        expect(twice).toEqual(once)
    })

    it('handles all 7 capabilities without throwing', () => {
        const all = getRequiredEnvKeys(['llm', 'search', 'embed', 'db', 'email', 'storage', 'browser'])
        expect(all.length).toBeGreaterThan(0)
        expect(all.length).toBe(new Set(all).size) // no duplicates
    })
})

// ─── serializeEnv ────────────────────────────────────────────────────────────

describe('serializeEnv', () => {
    it('serializes key=value pairs separated by newlines', () => {
        const result = serializeEnv({ FOO: 'bar', BAZ: 'qux' })
        expect(result).toBe('FOO=bar\nBAZ=qux\n')
    })

    it('always ends with a trailing newline', () => {
        const result = serializeEnv({ A: '1' })
        expect(result.endsWith('\n')).toBe(true)
    })

    it('produces just a newline for an empty object', () => {
        // Object.entries({}) is empty → join('') → '' + '\n' = '\n'
        expect(serializeEnv({})).toBe('\n')
    })

    it('handles values containing spaces or special chars', () => {
        const result = serializeEnv({ KEY: 'value with spaces' })
        expect(result).toBe('KEY=value with spaces\n')
    })
})

// ─── writeEnvFile ─────────────────────────────────────────────────────────────

describe('writeEnvFile', () => {
    beforeEach(() => {
        vi.mock('../src/utils/fs', () => ({
            writeTextFile: vi.fn().mockResolvedValue(undefined),
            exists: vi.fn().mockResolvedValue(false),
            ensureDir: vi.fn().mockResolvedValue(undefined),
            copyDir: vi.fn().mockResolvedValue(undefined),
            writeJsonFile: vi.fn().mockResolvedValue(undefined),
            readJsonFile: vi.fn().mockResolvedValue({}),
        }))
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('writes to <projectDir>/.env with serialized content', async () => {
        const { writeTextFile } = await import('../src/utils/fs')
        await writeEnvFile('/my/project', { API_KEY: 'abc123', BASE_URL: 'https://api.example.com' })

        expect(writeTextFile).toHaveBeenCalledOnce()
        const [calledPath, calledContent] = (writeTextFile as any).mock.calls[0]
        expect(calledPath.replace(/\\/g, '/')).toBe('/my/project/.env')
        expect(calledContent).toBe('API_KEY=abc123\nBASE_URL=https://api.example.com\n')
    })

    it('calls writeTextFile exactly once even for empty values', async () => {
        const { writeTextFile } = await import('../src/utils/fs')
        await writeEnvFile('/some/dir', {})
        expect(writeTextFile).toHaveBeenCalledOnce()
    })
})
