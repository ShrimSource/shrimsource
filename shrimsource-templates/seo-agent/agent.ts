import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeKeyword: Tool = {
    name: "analyzeKeyword",
    description: "Analyze an SEO keyword to produce a title, outline, and related keywords",
    async run({ state }: ToolContext) {
        const keyword = state["input"] as string
        const result = await chat(
            `You are an SEO expert. For the keyword "${keyword}", provide:
1. An SEO-optimized article title
2. A 4-point article outline
3. 5 related long-tail keywords

Return as JSON: { "title": "...", "outline": ["...", "...", "...", "..."], "seoKeywords": ["...", "...", "...", "...", "..."] }
Return only valid JSON, nothing else.`
        )
        try { return JSON.parse(result) } catch { return { title: keyword, outline: [], seoKeywords: [], raw: result } }
    }
}

const draftArticle: Tool = {
    name: "draftArticle",
    description: "Draft a full SEO-optimized article based on keyword analysis",
    async run({ state }: ToolContext) {
        const analysis = state["analysis"] as any
        const keyword = state["input"] as string
        return await chat(
            `Write an SEO-optimized article titled "${analysis.title || keyword}".

Outline to follow:
${(analysis.outline || []).join('\n')}

Target keywords to naturally include: ${(analysis.seoKeywords || [keyword]).join(', ')}

Requirements:
- 400-500 words
- Natural keyword integration (not stuffed)
- Clear, helpful content for the reader
- Markdown formatting with subheadings`
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
    useTool(agent, analyzeKeyword)
    useTool(agent, draftArticle)
    return agent
}
