import { describe, it, expect } from "vitest"
import { createWorkflow } from "../src/workflow"

describe("createWorkflow", () => {
    it("creates a valid workflow", () => {
        const wf = createWorkflow([
            { id: "a", tool: "toolA" },
            { id: "b", tool: "toolB", dependsOn: ["a"] }
        ])

        expect(wf.id).toBe("workflow")
        expect(wf.steps).toHaveLength(2)
    })

    it("accepts a custom workflow id", () => {
        const wf = createWorkflow(
            [{ id: "a", tool: "toolA" }],
            "my-workflow"
        )
        expect(wf.id).toBe("my-workflow")
    })

    it("throws on duplicate step ids", () => {
        expect(() =>
            createWorkflow([
                { id: "a", tool: "toolA" },
                { id: "a", tool: "toolB" }
            ])
        ).toThrow("Duplicate workflow step id: a")
    })

    it("throws on missing step id", () => {
        expect(() =>
            createWorkflow([{ id: "", tool: "toolA" }])
        ).toThrow("Each workflow step must have an id")
    })

    it("throws on missing tool field", () => {
        expect(() =>
            createWorkflow([{ id: "a", tool: "" }])
        ).toThrow('Workflow step "a" must have a tool')
    })

    it("throws on missing dependency", () => {
        expect(() =>
            createWorkflow([
                { id: "a", tool: "toolA", dependsOn: ["nonexistent"] }
            ])
        ).toThrow('Step "a" depends on missing step "nonexistent"')
    })
})
