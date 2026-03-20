import { describe, it, expect, vi, beforeEach } from "vitest"

// ---------------------------------------------------------------------------
// How to test your agent tools
//
// The key pattern: mock the "shrimsource" module so your tools don't make
// real API calls during tests. You control what chat() returns.
// ---------------------------------------------------------------------------

// Step 1: Mock the shrimsource module
vi.mock("shrimsource", () => {
    return {
        createAgent: vi.fn(() => ({
            tools: new Map(),
            use: vi.fn()
        })),
        useTool: vi.fn((agent, tool) => {
            (agent as any).tools.set(tool.name, tool)
        }),
        createWorkflow: vi.fn((steps, id) => ({ steps, id })),
        runWorkflow: vi.fn(),
        chat: vi.fn(),
        search: vi.fn(),
        searchToText: vi.fn(),
    }
})

// Step 2: Import AFTER mocking
import { chat } from "shrimsource"
import { buildAgent } from "../agent.js"

// Step 3: Helper to get the runnable agent
const mockedChat = chat as ReturnType<typeof vi.fn>

describe("blank-agent tools", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    // -------------------------------------------------------------------------
    // Test step1
    // -------------------------------------------------------------------------
    describe("step1", () => {
        it("calls chat() with the user input and returns the result", async () => {
            mockedChat.mockResolvedValueOnce("processed output from LLM")

            const agent = buildAgent()

            // Simulate what runWorkflow provides: state["input"]
            const state: Record<string, unknown> = { input: "hello world" }

            // Find the step1 tool by its name and run it directly
            const tool = (agent as any).tools?.get("step1")
            if (!tool) throw new Error("step1 tool not registered")

            const result = await tool.run({ state, input: {} })

            expect(result).toBe("processed output from LLM")
            expect(mockedChat).toHaveBeenCalledOnce()
            expect(mockedChat).toHaveBeenCalledWith(
                expect.stringContaining("hello world")
            )
        })

        it("uses the input from state", async () => {
            mockedChat.mockResolvedValueOnce("LLM says: ok")

            const agent = buildAgent()
            const state: Record<string, unknown> = { input: "my custom input" }
            const tool = (agent as any).tools?.get("step1")

            await tool.run({ state, input: {} })

            const callArg = mockedChat.mock.calls[0][0] as string
            expect(callArg).toContain("my custom input")
        })
    })

    // -------------------------------------------------------------------------
    // Test step2
    // -------------------------------------------------------------------------
    describe("step2", () => {
        it("uses the result from step1 in its prompt", async () => {
            mockedChat.mockResolvedValueOnce("final output")

            const agent = buildAgent()
            const state: Record<string, unknown> = {
                input: "original input",
                step1: "step1 produced this result"
            }
            const tool = (agent as any).tools?.get("step2")
            if (!tool) throw new Error("step2 tool not registered")

            const result = await tool.run({ state, input: {} })

            expect(result).toBe("final output")
            // step2 should reference the step1 result in its prompt
            const callArg = mockedChat.mock.calls[0][0] as string
            expect(callArg).toContain("step1 produced this result")
        })

        it("returns the LLM response as-is", async () => {
            mockedChat.mockResolvedValueOnce("the final answer")

            const agent = buildAgent()
            const state: Record<string, unknown> = { input: "", step1: "context" }
            const tool = (agent as any).tools?.get("step2")

            const result = await tool.run({ state, input: {} })

            expect(result).toBe("the final answer")
        })
    })

    // -------------------------------------------------------------------------
    // Test agent structure
    // -------------------------------------------------------------------------
    describe("buildAgent()", () => {
        it("registers step1 and step2 tools", () => {
            const agent = buildAgent()
            const tools = (agent as any).tools

            expect(tools?.has("step1")).toBe(true)
            expect(tools?.has("step2")).toBe(true)
        })
    })
})
