import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const searchCompetitors: Tool = {
    name: "searchCompetitors",
    description: "Identify key players in the given market segment",
    async run({ state }: ToolContext) {
        const market = state["input"] as string
        const result = await chat(
            `List the 6 most notable companies in the "${market}" market. For each, provide their name, funding stage, and estimated market presence. Return as a JSON array: [{ "name": "...", "funding": "...", "presence": "high/medium/low" }]. Return only valid JSON.`
        )
        try { return JSON.parse(result) } catch { return result }
    }
}

const classifyTiers: Tool = {
    name: "classifyTiers",
    description: "Classify companies into market tiers and generate the market map",
    async run({ state }: ToolContext) {
        const companies = state["competitors"] as any[]
        const market = state["input"] as string
        const companiesStr = typeof companies === 'string' ? companies : JSON.stringify(companies)
        return await chat(
            `Based on these companies in the "${market}" market:
${companiesStr}

Create a structured market map in Markdown with:
## Market Map: ${market}
### Tier 1 — Market Leaders (list with brief note on why)
### Tier 2 — Challengers (list with brief note)
### Tier 3 — Emerging Players (list with brief note)
### Key Trends (3 bullet points about where the market is heading)`
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
    useTool(agent, searchCompetitors)
    useTool(agent, classifyTiers)
    return agent
}
