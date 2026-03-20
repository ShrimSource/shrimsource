import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeProduct: Tool = {
    name: "analyzeProduct",
    description: "Analyze the SaaS product from a URL or description",
    async run({ state }: ToolContext) {
        const url = state["input"] as string
        return await chat(
            `Based on the URL or product name "${url}", describe what this SaaS product likely does: its main features, target audience, pricing model (if inferable), and onboarding approach. Be realistic and specific. 3-4 sentences.`
        )
    }
}

const generateRoast: Tool = {
    name: "generateRoast",
    description: "Generate a brutally honest SaaS roast with growth recommendations",
    async run({ state }: ToolContext) {
        const productAnalysis = state["product"] as string
        const url = state["input"] as string
        return await chat(
            `You are a brutally honest product critic and growth expert. Roast this SaaS product: "${url}"

Product description: ${productAnalysis}

Write a structured Markdown roast:

## 🔥 The Roast: ${url}

### What They're Getting Right ✅
(2-3 genuine strengths — be specific)

### Where They're Failing 💀
(3-4 specific, honest criticisms of their landing page, onboarding, messaging, or product — no sugar-coating)

### What Competitors Are Doing Better
(1-2 specific competitor examples with what they do better)

### Growth Prescriptions 💊
(3 specific, actionable recommendations they should implement immediately)

Keep it sharp, specific, and constructive — like a YC partner critique.`
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
    useTool(agent, analyzeProduct)
    useTool(agent, generateRoast)
    return agent
}
