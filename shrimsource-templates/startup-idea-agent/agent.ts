import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeMarket: Tool = {
    name: "analyzeMarket",
    description: "Analyze the market landscape for a given problem domain",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        return await chat(
            `Analyze the current market landscape for "${domain}". Cover:
- Who are the target customers (be specific with segments)
- Current market size and growth rate (estimate)
- Top 2-3 existing solutions and their limitations
- Emerging trends shaping this space

Be specific and realistic. 3-5 sentences.`
        )
    }
}

const generateIdeas: Tool = {
    name: "generateIdeas",
    description: "Generate 5 validated startup ideas for the market",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        const marketAnalysis = state["market"] as string
        return await chat(
            `Based on this market analysis of "${domain}":
${marketAnalysis}

Generate 5 specific, differentiated startup ideas. For each idea provide:

### Idea N: [Name]
**One-liner:** [What it does in one sentence]
**Target customer:** [Specific segment]
**Pain point solved:** [Specific problem]
**Unfair advantage:** [Why this can win]
**Monetization:** [How it makes money]

Be creative but realistic. Avoid obvious ideas. Focus on underserved niches or new angles.`
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
    useTool(agent, analyzeMarket)
    useTool(agent, generateIdeas)
    return agent
}
