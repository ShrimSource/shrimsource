import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const analyzeIdea: Tool = {
    name: "analyzeIdea",
    description: "Analyze the startup idea for market fit, size, and pain point",
    async run({ state }: ToolContext) {
        const idea = state["input"] as string
        return await chat(
            `Analyze this startup idea: "${idea}"
Provide a brief (3-4 sentence) analysis covering: the core pain point it solves, the target market and estimated size, why now is the right time, and one key risk. Be specific and realistic.`
        )
    }
}

const generateSlideOutline: Tool = {
    name: "generateSlideOutline",
    description: "Generate a compelling 10-slide pitch deck outline",
    async run({ state }: ToolContext) {
        const idea = state["input"] as string
        const analysis = state["analysis"] as string
        return await chat(
            `Create a compelling 10-slide pitch deck outline for this startup: "${idea}"

Context from analysis: ${analysis}

For each slide, provide the slide title AND 2-3 bullet points of specific content to include. Format as Markdown:

## Pitch Deck: [Startup Name/Idea]

### Slide 1: [Title]
- [bullet]
- [bullet]

... (continue for all 10 slides)

Standard structure: Problem, Solution, Why Now, Market Size, Product, Business Model, Go-to-Market, Traction/Roadmap, Team, The Ask.`
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
    useTool(agent, analyzeIdea)
    useTool(agent, generateSlideOutline)
    return agent
}
