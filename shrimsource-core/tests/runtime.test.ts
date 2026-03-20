import { describe, it, expect, vi } from "vitest"
import { createAgent } from "../src/agent"
import { useTool } from "../src/tool"
import { createWorkflow } from "../src/workflow"
import { runWorkflow } from "../src/runtime"
import { Tool } from "../src/types"

function makeTool(name: string, fn: (...args: any[]) => any): Tool {
    return { name, run: fn }
}

describe("runWorkflow", () => {
    it("runs a single sequential step", async () => {
        const agent = createAgent()
        useTool(agent, makeTool("echo", async ({ input }) => input))

        const wf = createWorkflow([
            { id: "step1", tool: "echo", input: "hello" }
        ])

        const result = await runWorkflow(agent, wf, null)
        expect(result.state["step1"]).toBe("hello")
        expect(result.completedSteps).toEqual(["step1"])
    })

    it("passes workflow input into state", async () => {
        const agent = createAgent()
        useTool(agent, makeTool("read", async ({ state }) => state["input"]))

        const wf = createWorkflow([{ id: "s1", tool: "read" }])
        const result = await runWorkflow(agent, wf, "payload")
        expect(result.state["s1"]).toBe("payload")
    })

    it("runs steps in dependency order", async () => {
        const order: string[] = []
        const agent = createAgent()

        useTool(agent, makeTool("track", async ({ stepId }) => {
            order.push(stepId)
            return stepId
        }))

        const wf = createWorkflow([
            { id: "b", tool: "track", dependsOn: ["a"] },
            { id: "a", tool: "track" }
        ])

        await runWorkflow(agent, wf, null)
        expect(order).toEqual(["a", "b"])
    })

    it("runs parallel steps concurrently", async () => {
        const agent = createAgent()

        useTool(agent, makeTool("wait", async ({ input }) => {
            await new Promise((r) => setTimeout(r, 10))
            return input
        }))

        const wf = createWorkflow([
            { id: "p1", tool: "wait", input: 1, parallel: true },
            { id: "p2", tool: "wait", input: 2, parallel: true }
        ])

        const result = await runWorkflow(agent, wf, null)
        expect(result.state["p1"]).toBe(1)
        expect(result.state["p2"]).toBe(2)
        expect(result.completedSteps).toContain("p1")
        expect(result.completedSteps).toContain("p2")
    })

    it("detects workflow deadlock", async () => {
        const agent = createAgent()
        useTool(agent, makeTool("noop", async () => null))

        const wf = createWorkflow([
            { id: "a", tool: "noop", dependsOn: ["b"] },
            { id: "b", tool: "noop", dependsOn: ["a"] }
        ])

        await expect(runWorkflow(agent, wf, null)).rejects.toThrow(
            "Workflow deadlock detected"
        )
    })

    it("throws when tool is not found", async () => {
        const agent = createAgent()

        const wf = createWorkflow([{ id: "s1", tool: "missing" }])

        await expect(runWorkflow(agent, wf, null)).rejects.toThrow(
            "Tool not found: missing"
        )
    })

    it("retries a failing step", async () => {
        const agent = createAgent()
        let attempts = 0

        useTool(agent, makeTool("flaky", async () => {
            attempts++
            if (attempts < 3) throw new Error("fail")
            return "ok"
        }))

        const wf = createWorkflow([
            { id: "s1", tool: "flaky", retry: 3 }
        ])

        const result = await runWorkflow(agent, wf, null)
        expect(result.state["s1"]).toBe("ok")
        expect(attempts).toBe(3)
    })

    it("times out a slow step", async () => {
        const agent = createAgent()

        useTool(agent, makeTool("slow", async () => {
            await new Promise((r) => setTimeout(r, 5000))
            return "done"
        }))

        const wf = createWorkflow([
            { id: "s1", tool: "slow", timeoutMs: 50 }
        ])

        await expect(runWorkflow(agent, wf, null)).rejects.toThrow(
            "timed out"
        )
    })

    it("invokes lifecycle hooks", async () => {
        const onWorkflowStart = vi.fn()
        const onWorkflowEnd = vi.fn()
        const onStepStart = vi.fn()
        const onStepEnd = vi.fn()

        const agent = createAgent({
            onWorkflowStart,
            onWorkflowEnd,
            onStepStart,
            onStepEnd
        })

        useTool(agent, makeTool("noop", async () => "done"))

        const wf = createWorkflow([{ id: "s1", tool: "noop" }])
        await runWorkflow(agent, wf, null)

        expect(onWorkflowStart).toHaveBeenCalledOnce()
        expect(onWorkflowEnd).toHaveBeenCalledOnce()
        expect(onStepStart).toHaveBeenCalledOnce()
        expect(onStepEnd).toHaveBeenCalledOnce()

        expect(onStepStart).toHaveBeenCalledWith(
            expect.objectContaining({ stepId: "s1", tool: "noop" })
        )
    })

    it("invokes onStepError hook on failure", async () => {
        const onStepError = vi.fn()
        const agent = createAgent({ onStepError })

        useTool(agent, makeTool("fail", async () => {
            throw new Error("boom")
        }))

        const wf = createWorkflow([{ id: "s1", tool: "fail" }])

        await expect(runWorkflow(agent, wf, null)).rejects.toThrow("boom")
        expect(onStepError).toHaveBeenCalledOnce()
        expect(onStepError).toHaveBeenCalledWith(
            expect.objectContaining({
                stepId: "s1",
                error: expect.any(Error)
            })
        )
    })
})
