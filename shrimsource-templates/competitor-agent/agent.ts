import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const findCompetitors: Tool = {
    name: "findCompetitors",
    description: "Identify top competitors for a company",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        const result = await chat(
            `List the 4 most well-known direct competitors of "${domain}". Return only a JSON array of company names, e.g. ["Company A", "Company B", "Company C", "Company D"]. Return only valid JSON.`
        )
        try { return JSON.parse(result) } catch { return [result] }
    }
}

const compareFeatures: Tool = {
    name: "compareFeatures",
    description: "Compare features between the company and its competitors",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        const competitors = state["competitors"] as string[]
        return await chat(
            `Compare "${domain}" against its competitors: ${competitors.join(', ')}.
For each competitor, write one bullet point comparing their key differentiator vs ${domain}.
Be specific about strengths and weaknesses. Use this format:
- [Competitor]: [Key differentiator or advantage over/under ${domain}]`
        )
    }
}

const analyzePosition: Tool = {
    name: "analyzePosition",
    description: "Analyze overall market positioning",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        const comparison = state["features"] as string
        return await chat(
            `Based on this competitive analysis of "${domain}":
${comparison}

Write a 2-3 sentence strategic assessment of ${domain}'s market position: their main strength, biggest threat, and one strategic recommendation.`
        )
    }
}

const generateReport: Tool = {
    name: "generateReport",
    description: "Generate the final competitor analysis report in Markdown",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        const competitors = state["competitors"] as string[]
        const comparison = state["features"] as string
        const position = state["position"] as string
        return await chat(
            `Write a polished Markdown competitor analysis report for "${domain}".

Competitors identified: ${competitors.join(', ')}

Feature comparison:
${comparison}

Market position assessment:
${position}

Format with clear sections: Executive Summary, Competitor Overview, Feature Comparison, Market Position, Strategic Recommendations.`
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
    useTool(agent, findCompetitors)
    useTool(agent, compareFeatures)
    useTool(agent, analyzePosition)
    useTool(agent, generateReport)
    return agent
}
