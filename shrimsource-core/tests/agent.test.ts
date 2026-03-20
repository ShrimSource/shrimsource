import { describe, it, expect, vi } from "vitest"
import { createAgent } from "../src/agent"
import { useTool } from "../src/tool"
import { registerPlugin } from "../src/plugin"
import { Agent, Tool, Plugin } from "../src/types"

describe("createAgent", () => {
    it("creates an agent with empty tools, memory, and plugins", () => {
        const agent = createAgent()
        expect(agent.tools.size).toBe(0)
        expect(agent.memory.size).toBe(0)
        expect(agent.plugins.size).toBe(0)
    })

    it("accepts hooks", () => {
        const onStepStart = vi.fn()
        const agent = createAgent({ onStepStart })
        expect(agent.hooks.onStepStart).toBe(onStepStart)
    })
})

describe("useTool", () => {
    it("registers a tool on the agent", () => {
        const agent = createAgent()
        const tool: Tool = {
            name: "myTool",
            run: async () => "result"
        }

        useTool(agent, tool)
        expect(agent.tools.has("myTool")).toBe(true)
        expect(agent.tools.get("myTool")).toBe(tool)
    })

    it("overwrites a tool with the same name", () => {
        const agent = createAgent()
        const tool1: Tool = { name: "x", run: async () => "a" }
        const tool2: Tool = { name: "x", run: async () => "b" }

        useTool(agent, tool1)
        useTool(agent, tool2)
        expect(agent.tools.get("x")).toBe(tool2)
    })
})

describe("registerPlugin", () => {
    it("registers plugin tools on the agent", () => {
        const agent = createAgent()
        const plugin: Plugin = {
            name: "testPlugin",
            tools: [
                { name: "t1", run: async () => 1 },
                { name: "t2", run: async () => 2 }
            ]
        }

        registerPlugin(agent, plugin)
        expect(agent.plugins.has("testPlugin")).toBe(true)
        expect(agent.tools.has("t1")).toBe(true)
        expect(agent.tools.has("t2")).toBe(true)
    })

    it("skips duplicate plugin registration", () => {
        const agent = createAgent()
        const plugin: Plugin = {
            name: "dup",
            tools: [{ name: "t", run: async () => 1 }]
        }

        registerPlugin(agent, plugin)
        agent.tools.delete("t") // remove tool manually

        registerPlugin(agent, plugin) // should skip since name already registered
        expect(agent.tools.has("t")).toBe(false) // tool was NOT re-added
    })
})
