import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const generateOutline: Tool = {
    name: "generateOutline",
    description: "Generate a structured article outline",
    async run({ state }: ToolContext) {
        const topic = state["input"] as string
        return await chat(
            `Create a clear 3-point article outline for the topic: "${topic}". 
Return exactly 3 section titles as a JSON array of strings, e.g. ["Title 1", "Title 2", "Title 3"]. Return only the JSON array, nothing else.`
        )
    }
}

const generateParagraph: Tool = {
    name: "generateParagraph",
    description: "Write a detailed paragraph for one outline section",
    async run({ input, state }: ToolContext) {
        const { outlineIndex } = input as { outlineIndex: number }
        const outlineRaw = state["outline"] as string
        let outline: string[]
        try { outline = JSON.parse(outlineRaw) } catch { outline = [outlineRaw] }
        const point = outline[outlineIndex] ?? outlineRaw
        const topic = state["input"] as string
        return await chat(
            `Write a well-researched, engaging paragraph (150–200 words) for the article section titled "${point}" about "${topic}". Use clear language and include specific insights.`
        )
    }
}

const mergeArticle: Tool = {
    name: "mergeArticle",
    description: "Merge paragraphs into a polished article",
    async run({ state }: ToolContext) {
        const topic = state["input"] as string
        const para1 = state["para1"] as string
        const para2 = state["para2"] as string
        const para3 = state["para3"] as string
        return await chat(
            `Polish and format the following three sections into a cohesive article titled "${topic}". Add a brief intro sentence and a closing sentence. Keep it tight and readable:

Section 1: ${para1}

Section 2: ${para2}

Section 3: ${para3}`
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
    useTool(agent, generateOutline)
    useTool(agent, generateParagraph)
    useTool(agent, mergeArticle)
    return agent
}
