import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const fetchLatestNews: Tool = {
    name: "fetchLatestNews",
    description: "Generate relevant recent news topics for the newsletter",
    async run({ state }: ToolContext) {
        const topic = state["input"] as string
        const result = await chat(
            `Generate 3 realistic, plausible recent news headlines and brief summaries (1 sentence each) about "${topic}" from the past week. Return as JSON array: [{ "title": "...", "summary": "..." }]. Return only valid JSON.`
        )
        try { return JSON.parse(result) } catch { return result }
    }
}

const summarizeArticles: Tool = {
    name: "summarizeArticles",
    description: "Synthesize news items into newsletter-ready highlights",
    async run({ state }: ToolContext) {
        const newsRaw = state["news"] as any
        const topic = state["input"] as string
        const newsStr = typeof newsRaw === 'string' ? newsRaw : JSON.stringify(newsRaw)
        return await chat(
            `Synthesize these news items about "${topic}" into 3 concise newsletter-ready bullet points. Each should be 1-2 sentences, insightful, and written for a professional audience:\n\n${newsStr}`
        )
    }
}

const formatNewsletter: Tool = {
    name: "formatNewsletter",
    description: "Format and write the final newsletter edition",
    async run({ state }: ToolContext) {
        const topic = state["input"] as string
        const highlights = state["summary"] as string
        return await chat(
            `Write a professional weekly newsletter edition about "${topic}" in Markdown.

Key highlights to cover:
${highlights}

Structure:
## ✉️ [Topic] Weekly — [invented recent date]
### This Week's Highlights
[3 sections with the highlights, each with a header]
### 💡 Editor's Take
[1 paragraph with a key insight or prediction]
### 🔗 Worth Reading
[2-3 fictional but realistic resource links]

Keep the tone professional but engaging.`
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
    useTool(agent, fetchLatestNews)
    useTool(agent, summarizeArticles)
    useTool(agent, formatNewsletter)
    return agent
}
