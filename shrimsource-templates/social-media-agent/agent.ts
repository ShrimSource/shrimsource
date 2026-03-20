import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const extractKeyPoints: Tool = {
    name: "extractKeyPoints",
    description: "Extract 3 viral hook angles from the content",
    async run({ state }: ToolContext) {
        const content = state["input"] as string
        const result = await chat(
            `From this content/topic: "${content}"
Extract 3 compelling hook angles that would perform well on social media. For each, give the hook in one sentence. Return as JSON array of strings: ["hook1", "hook2", "hook3"]. Return only valid JSON.`
        )
        try { return JSON.parse(result) } catch { return result }
    }
}

const generateTweets: Tool = {
    name: "generateTweets",
    description: "Generate a Twitter/X thread for the content",
    async run({ state }: ToolContext) {
        const content = state["input"] as string
        const hooksRaw = state["keyPoints"] as any
        const hooks = Array.isArray(hooksRaw) ? hooksRaw.join(', ') : String(hooksRaw)
        return await chat(
            `Write a 5-tweet Twitter/X thread about: "${content}"
Use this hook angle for the opening tweet: ${hooks.split(',')[0]}

Format:
1/ [Opening hook tweet — attention grabbing, under 280 chars]
2/ [Supporting point]
3/ [Key insight or data point]
4/ [Practical takeaway]
5/ [CTA or closing thought with engagement question]

Each tweet under 280 characters. Make it genuinely interesting and shareable.`
        )
    }
}

const generateLinkedInPost: Tool = {
    name: "generateLinkedInPost",
    description: "Generate a LinkedIn post optimized for professional engagement",
    async run({ state }: ToolContext) {
        const content = state["input"] as string
        const hooksRaw = state["keyPoints"] as any
        const hooks = Array.isArray(hooksRaw) ? hooksRaw.join(', ') : String(hooksRaw)
        return await chat(
            `Write a LinkedIn post about: "${content}"
Use this angle: ${Array.isArray(hooksRaw) ? hooksRaw[1] || hooksRaw[0] : String(hooksRaw).split(',')[1] || String(hooksRaw)}

Requirements:
- Opening line that stops the scroll (no "I'm excited to share...")
- Personal story or insight in 2-3 short paragraphs
- 3 key takeaways as bullet points
- Closing question to drive comments
- 3-5 relevant hashtags
- 150-250 words total

Write in a professional but conversational tone.`
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
    useTool(agent, extractKeyPoints)
    useTool(agent, generateTweets)
    useTool(agent, generateLinkedInPost)
    return agent
}
