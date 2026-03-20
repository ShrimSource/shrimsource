import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const searchCompany: Tool = {
    name: "searchCompany",
    description: "Gather basic company information based on domain",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        return { domain, name: domain.split('.')[0].toUpperCase() }
    }
}

const scrapeWebsite: Tool = {
    name: "scrapeWebsite",
    description: "Summarize what a company does based on their domain",
    async run({ state }: ToolContext) {
        const domain = state["input"] as string
        return await chat(
            `Based on the company domain "${domain}", write a 2-sentence description of what this company likely does and what products or services they offer.`
        )
    }
}

const summarizeProduct: Tool = {
    name: "summarizeProduct",
    description: "Summarize the company's core product offering",
    async run({ state }: ToolContext) {
        const websiteContent = state["scrape"] as string
        return await chat(
            `Summarize the following company description into a single crisp sentence about their core product offering:\n\n${websiteContent}`
        )
    }
}

const generateReport: Tool = {
    name: "generateReport",
    description: "Generate a comprehensive company research report",
    async run({ state }: ToolContext) {
        const companyInfo = state["search"] as any
        const productSummary = state["summarize"] as string
        const domain = state["input"] as string
        return await chat(
            `Write a professional company research report in Markdown for "${domain}". Include:
- Company Overview section
- Product Analysis: ${productSummary}
- Key Strengths
- Potential Risks

Keep it concise but insightful.`
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
    useTool(agent, searchCompany)
    useTool(agent, scrapeWebsite)
    useTool(agent, summarizeProduct)
    useTool(agent, generateReport)
    return agent
}
