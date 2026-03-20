import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const extractValueProp: Tool = {
    name: "extractValueProp",
    description: "Extract the core value proposition from the product idea",
    async run({ state }: ToolContext) {
        const idea = state["input"] as string
        return await chat(
            `Analyze this product idea: "${idea}"

Identify and return as JSON:
{ "target": "who is this for", "problem": "what problem does it solve", "solution": "how it solves it", "differentiator": "what makes it unique" }

Return only valid JSON.`
        )
    }
}

const writeCopy: Tool = {
    name: "writeCopy",
    description: "Write complete landing page copy",
    async run({ state }: ToolContext) {
        const valuePropRaw = state["valueProp"] as string
        let vp: any = {}
        try { vp = JSON.parse(valuePropRaw) } catch { vp = { target: "users", problem: valuePropRaw, solution: valuePropRaw } }
        const idea = state["input"] as string
        return await chat(
            `Write high-converting landing page copy for: "${idea}"

Target audience: ${vp.target}
Problem solved: ${vp.problem}
Solution: ${vp.solution}
Differentiator: ${vp.differentiator}

Write:
## Headline (8 words max, benefit-focused)
## Subheadline (1 sentence, clarifies the headline)
## 3 Feature Bullets (concise, outcome-focused)
## CTA Button Text (5 words max)
## Social Proof Line (one realistic testimonial)

Use Markdown formatting.`
        )
    }
}

export function buildAgent() {
    const agent = createAgent({
        onWorkflowStart: ({ workflowId }) => console.log(`\n[Start] ${workflowId}`),
        onStepStart: ({ stepId }) => console.log(`  → ${stepId}`),
        onStepEnd: ({ stepId }) => console.log(`  ✓ ${stepId}`),
        onStepError: ({ stepId, error }) => console.error(`  ✗ ${stepId}: ${error?.message}`),
        onWorkflowEnd: ({ workflowId }) => console.log(`[Done] ${workflowId}\n`)
    })
    useTool(agent, extractValueProp)
    useTool(agent, writeCopy)
    return agent
}
