import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

// ---------------------------------------------------------------------------
// Step 1: Define your tools
// Each tool is a discrete unit of work in your agent pipeline.
// ---------------------------------------------------------------------------

/**
 * TODO: Replace this with your first real tool.
 * A tool receives `state` (shared pipeline data) and `input` (optional step input).
 */
const step1: Tool = {
    name: "step1",
    description: "TODO: describe what this step does",
    async run({ state }: ToolContext) {
        const input = state["input"] as string

        // Example: use the LLM to process the input
        const result = await chat(`TODO: write your prompt here. Input: ${input}`)
        return result

        // Example: return structured data
        // return { key: "value", processed: true }
    }
}

/**
 * TODO: Add more tools as needed.
 * Tools can depend on each other via workflow.ts — see dependsOn.
 */
const step2: Tool = {
    name: "step2",
    description: "TODO: describe what this step does",
    async run({ state }: ToolContext) {
        const previousResult = state["step1"] as string

        const result = await chat(`TODO: use the previous result:\n\n${previousResult}`)
        return result
    }
}

// ---------------------------------------------------------------------------
// Step 2: Build your agent and register tools
// ---------------------------------------------------------------------------

export function buildAgent() {
    const agent = createAgent({
        onWorkflowStart: ({ workflowId }) => console.log(`\n[Start] ${workflowId}`),
        onStepStart: ({ stepId }) => console.log(`  → ${stepId}`),
        onStepEnd: ({ stepId }) => console.log(`  ✓ ${stepId}`),
        onStepError: ({ stepId, error }) => console.error(`  ✗ ${stepId}: ${error?.message}`),
        onWorkflowEnd: ({ workflowId }) => console.log(`[Done] ${workflowId}\n`)
    })

    // Register all your tools here
    useTool(agent, step1)
    useTool(agent, step2)

    return agent
}
