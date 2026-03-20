import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeCompany: Tool = {
    name: "analyzeCompany",
    description: "Analyze the target company",
    async run({ state }: ToolContext) {
        const input = state["input"] as { company: string, product: string }
        return await chat(
            `Give a brief 2-sentence analysis of the company "${input.company}": what industry they're in, and one relevant recent trend or challenge they face. Be specific.`
        )
    }
}

const analyzeProduct: Tool = {
    name: "analyzeProduct",
    description: "Identify key selling points of our product for this prospect",
    async run({ state }: ToolContext) {
        const input = state["input"] as { company: string, product: string }
        const companyAnalysis = state["company"] as string
        return await chat(
            `Given that "${input.company}" is described as: "${companyAnalysis}"

What are the top 3 compelling selling points of "${input.product}" for this specific company? Be concrete and tailored, not generic.`
        )
    }
}

const draftEmail: Tool = {
    name: "draftEmail",
    description: "Write a personalized outreach email",
    async run({ state }: ToolContext) {
        const companyAnalysis = state["company"] as string
        const sellingPoints = state["product"] as string
        const input = state["input"] as { company: string, product: string }
        return await chat(
            `Write a personalized sales outreach email to "${input.company}" about "${input.product}".

Company context: ${companyAnalysis}
Key selling points for them: ${sellingPoints}

Write a concise, professional email (under 150 words) with:
- A compelling subject line
- A specific opener referencing their context
- 1-2 sentences on value for them specifically
- A clear, low-pressure CTA

Format as:
Subject: [subject]

[body]`
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
    useTool(agent, analyzeCompany)
    useTool(agent, analyzeProduct)
    useTool(agent, draftEmail)
    return agent
}
