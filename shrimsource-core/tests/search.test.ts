import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { search, searchToText } from "../src/search"

// Mock the TavilySearch provider
vi.mock("../src/providers/search/tavily", () => {
    const mockSearch = vi.fn()
    const TavilySearch = vi.fn(() => ({ search: mockSearch }))
    return { TavilySearch, __mockSearch: mockSearch }
})

const { __mockSearch } = await import("../src/providers/search/tavily") as any

const MOCK_RESULTS = [
    { title: "OpenAI launches GPT-5", url: "https://example.com/1", snippet: "OpenAI has launched its newest model..." },
    { title: "Anthropic raises $2B", url: "https://example.com/2", snippet: "Anthropic secures major funding round..." },
]

describe("search", () => {
    const originalEnv = process.env

    beforeEach(() => {
        process.env = { ...originalEnv }
        vi.clearAllMocks()
    })

    afterEach(() => {
        process.env = originalEnv
    })

    describe("search()", () => {
        it("returns search results from the provider", async () => {
            __mockSearch.mockResolvedValueOnce(MOCK_RESULTS)

            const results = await search("AI news 2024")

            expect(results).toEqual(MOCK_RESULTS)
            expect(__mockSearch).toHaveBeenCalledWith("AI news 2024", undefined)
        })

        it("passes options through to the provider", async () => {
            __mockSearch.mockResolvedValueOnce([MOCK_RESULTS[0]])

            await search("test query", { limit: 1 })

            expect(__mockSearch).toHaveBeenCalledWith("test query", { limit: 1 })
        })

        it("returns empty array when provider returns no results", async () => {
            __mockSearch.mockResolvedValueOnce([])

            const results = await search("obscure query")

            expect(results).toEqual([])
        })

        it("propagates errors from the provider", async () => {
            __mockSearch.mockRejectedValueOnce(new Error("Tavily API key not found. Please set SHRIM_SEARCH_KEY."))

            await expect(search("test")).rejects.toThrow("SHRIM_SEARCH_KEY")
        })
    })

    describe("searchToText()", () => {
        it("formats results as numbered text blocks", async () => {
            __mockSearch.mockResolvedValueOnce(MOCK_RESULTS)

            const text = await searchToText("AI news 2024")

            expect(text).toContain("[1] OpenAI launches GPT-5")
            expect(text).toContain("https://example.com/1")
            expect(text).toContain("OpenAI has launched its newest model...")
            expect(text).toContain("[2] Anthropic raises $2B")
        })

        it("returns 'No results found.' when results are empty", async () => {
            __mockSearch.mockResolvedValueOnce([])

            const text = await searchToText("empty query")

            expect(text).toBe("No results found.")
        })

        it("separates results with double newlines", async () => {
            __mockSearch.mockResolvedValueOnce(MOCK_RESULTS)

            const text = await searchToText("test")
            const blocks = text.split("\n\n")

            expect(blocks).toHaveLength(2)
        })
    })
})
