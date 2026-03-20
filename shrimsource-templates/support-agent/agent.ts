import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeQuery: Tool = {
    name: "analyzeQuery",
    description: "Analyze the customer support query for intent, category, and urgency",
    async run({ state }: ToolContext) {
        const query = state["input"] as string
        const result = await chat(
            `Analyze this customer support query and classify it. Return JSON: { "intent": "...", "category": "...", "urgency": "high/medium/low", "sentiment": "frustrated/neutral/positive", "summary": "one sentence summary" }

Query: "${query}"

Return only valid JSON.`
        )
        try { return JSON.parse(result) } catch { return { intent: "general", category: "other", urgency: "low", sentiment: "neutral", summary: query } }
    }
}

const searchKnowledgeBase: Tool = {
    name: "searchKnowledgeBase",
    description: "Find the most relevant solution for the customer's issue",
    async run({ state }: ToolContext) {
        const analysis = state["analyze"] as any
        const query = state["input"] as string
        const analysisStr = typeof analysis === 'string' ? analysis : JSON.stringify(analysis)
        return await chat(
            `A customer has submitted a support ticket with the following details:
Query: "${query}"
Analysis: ${analysisStr}

What is the most likely solution or next step to resolve this issue? Provide a clear, specific answer as if you were looking it up in a knowledge base. Be helpful and accurate. 2-4 sentences.`
        )
    }
}

const draftReply: Tool = {
    name: "draftReply",
    description: "Draft a professional, empathetic support reply",
    async run({ state }: ToolContext) {
        const analysis = state["analyze"] as any
        const solution = state["kb"] as string
        const query = state["input"] as string
        const analysisStr = typeof analysis === 'string' ? analysis : JSON.stringify(analysis)
        return await chat(
            `Write a professional, empathetic customer support reply.

Customer query: "${query}"
Ticket analysis: ${analysisStr}
Solution/information to communicate: ${solution}

Requirements:
- Acknowledge their issue with empathy
- Provide the solution clearly and concisely
- Include next steps if applicable
- End with an offer to help further
- Professional but warm tone
- Under 150 words

Format as a ready-to-send support email response.`
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
    useTool(agent, analyzeQuery)
    useTool(agent, searchKnowledgeBase)
    useTool(agent, draftReply)
    return agent
}
