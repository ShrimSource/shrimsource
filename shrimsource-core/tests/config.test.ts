import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { getLLMConfig } from "../src/config"

describe("config", () => {
    const originalEnv = process.env

    beforeEach(() => {
        process.env = { ...originalEnv }
    })

    afterEach(() => {
        process.env = originalEnv
    })

    it("should read LLM_ variables when present", () => {
        process.env.LLM_MODEL = "llm-model-abc"
        process.env.LLM_BASE_URL = "http://localhost:8080"
        process.env.LLM_API_KEY = "llm-key-123"

        const config = getLLMConfig()
        expect(config.model).toBe("llm-model-abc")
        expect(config.baseUrl).toBe("http://localhost:8080")
        expect(config.apiKey).toBe("llm-key-123")
    })
})
