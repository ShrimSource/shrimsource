import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const gatherCompanyContext: Tool = {
    name: "gatherCompanyContext",
    description: "Gather context about the target company",
    async run({ state }: ToolContext) {
        const input = state["input"] as { company: string, product: string }
        return await chat(
            `Research the company "${input.company}". In 2-3 sentences, describe: what they do, a likely recent business event or milestone, and a pain point they probably face. Be specific and realistic.`
        )
    }
}

const draftEmail: Tool = {
    name: "draftEmail",
    description: "Draft a personalized cold email",
    async run({ state }: ToolContext) {
        const context = state["context"] as string
        const input = state["input"] as { company: string, product: string }
        return await chat(
            `Write a high-converting cold outreach email to "${input.company}" selling "${input.product}".

Company context: ${context}

Requirements:
- Subject line that gets opened
- Opening that references something specific about them
- Clear value proposition in 1-2 sentences
- Low-friction CTA (15-min call or quick reply)
- Under 150 words total
- Conversational, not salesy

Format as:
Subject: [subject line]

[email body]`
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
    useTool(agent, gatherCompanyContext)
    useTool(agent, draftEmail)
    return agent
}
