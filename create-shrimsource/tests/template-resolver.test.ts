import { describe, it, expect } from 'vitest'
import { resolveTemplateSource } from '../src/services/template-resolver'
import type { TemplateMeta } from '../src/templates/registry'

function makeMeta(source: TemplateMeta['source']): TemplateMeta {
    return {
        name: 'test-agent',
        description: 'test',
        source,
        capabilities: []
    }
}

describe('resolveTemplateSource', () => {
    describe('GitHub sources', () => {
        it('builds correct string without subdir (defaults to main branch)', () => {
            const meta = makeMeta({ type: 'github', repo: 'owner/repo' })
            expect(resolveTemplateSource(meta)).toBe('github:owner/repo#main')
        })

        it('appends subdir when provided', () => {
            const meta = makeMeta({ type: 'github', repo: 'owner/repo', subdir: 'templates/my-agent' })
            expect(resolveTemplateSource(meta)).toBe('github:owner/repo/templates/my-agent#main')
        })

        it('uses custom branch when provided', () => {
            const meta = makeMeta({ type: 'github', repo: 'owner/repo', branch: 'develop' })
            expect(resolveTemplateSource(meta)).toBe('github:owner/repo#develop')
        })

        it('uses custom branch AND subdir together', () => {
            const meta = makeMeta({ type: 'github', repo: 'org/proj', subdir: 'agents/hello', branch: 'v2' })
            expect(resolveTemplateSource(meta)).toBe('github:org/proj/agents/hello#v2')
        })
    })

    describe('Local file sources', () => {
        it('returns the dir path directly', () => {
            const meta = makeMeta({ type: 'file', dir: '/local/path/to/template' })
            expect(resolveTemplateSource(meta)).toBe('/local/path/to/template')
        })

        it('returns Windows-style paths unchanged', () => {
            const meta = makeMeta({ type: 'file', dir: 'C:\\templates\\my-agent' })
            expect(resolveTemplateSource(meta)).toBe('C:\\templates\\my-agent')
        })
    })

    describe('Unsupported source types', () => {
        it('throws on an unknown source type', () => {
            const meta = makeMeta({ type: 'unknown' } as any)
            expect(() => resolveTemplateSource(meta)).toThrow('Unsupported template source type: unknown')
        })
    })
})
