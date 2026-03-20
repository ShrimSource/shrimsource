import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

// Mock the openai module BEFORE importing llm
vi.mock("openai", () => {
    const mockCreate = vi.fn()
    const MockOpenAI = vi.fn(() => ({
        chat: {
            completions: {
                create: mockCreate
            }
        }
    }))
    return { default: MockOpenAI, __mockCreate: mockCreate }
})

const { __mockCreate } = await import("openai") as any
import { chat, createLLMClient } from "../src/llm"

describe("llm", () => {
    const originalEnv = process.env

    beforeEach(() => {
        process.env = { ...originalEnv }
        vi.clearAllMocks()
    })

    afterEach(() => {
        process.env = originalEnv
    })

    describe("createLLMClient()", () => {
        it("uses LLM_API_KEY and LLM_BASE_URL from env", async () => {
            const OpenAI = (await import("openai")).default as any
            process.env.LLM_API_KEY = "test-key-123"
            process.env.LLM_BASE_URL = "https://openrouter.ai/api/v1"

            createLLMClient()

            expect(OpenAI).toHaveBeenCalledWith({
                apiKey: "test-key-123",
                baseURL: "https://openrouter.ai/api/v1",
            })
        })

        it("falls back to OpenRouter URL when LLM_BASE_URL is not set", async () => {
            const OpenAI = (await import("openai")).default as any
            delete process.env.LLM_BASE_URL
            delete process.env.LLM_API_KEY

            createLLMClient()

            expect(OpenAI).toHaveBeenCalledWith(expect.objectContaining({
                baseURL: "https://openrouter.ai/api/v1",
            }))
        })
    })

    describe("chat()", () => {
        it("sends the prompt as a user message and returns the content", async () => {
            __mockCreate.mockResolvedValueOnce({
                choices: [{ message: { content: "Hello from LLM" } }]
            })

            const result = await chat("Say hello")
            expect(result).toBe("Hello from LLM")
            expect(__mockCreate).toHaveBeenCalledWith(expect.objectContaining({
                messages: [{ role: "user", content: "Say hello" }],
            }))
        })

        it("uses LLM_MODEL from env", async () => {
            process.env.LLM_MODEL = "anthropic/claude-3.5-sonnet"
            __mockCreate.mockResolvedValueOnce({
                choices: [{ message: { content: "response" } }]
            })

            await chat("test prompt")

            expect(__mockCreate).toHaveBeenCalledWith(expect.objectContaining({
                model: "anthropic/claude-3.5-sonnet",
            }))
        })

        it("falls back to gpt-4o-mini when LLM_MODEL is not set", async () => {
            delete process.env.LLM_MODEL
            __mockCreate.mockResolvedValueOnce({
                choices: [{ message: { content: "ok" } }]
            })

            await chat("test")

            expect(__mockCreate).toHaveBeenCalledWith(expect.objectContaining({
                model: "openai/gpt-4o-mini",
            }))
        })

        it("returns empty string when content is null", async () => {
            __mockCreate.mockResolvedValueOnce({
                choices: [{ message: { content: null } }]
            })

            const result = await chat("test")
            expect(result).toBe("")
        })
    })
})
