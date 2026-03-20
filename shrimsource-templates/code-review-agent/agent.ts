import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const detectBugs: Tool = {
    name: "detectBugs",
    description: "Analyze code for bugs and vulnerabilities",
    async run({ state }: ToolContext) {
        const code = state["input"] as string
        return await chat(
            `You are a senior software engineer doing a code review. Analyze the following code for bugs, null pointer risks, edge cases, and potential runtime errors. List each issue found with a brief explanation:\n\n${code}`
        )
    }
}

const checkStyle: Tool = {
    name: "checkStyle",
    description: "Check code for style, readability, and best practice issues",
    async run({ state }: ToolContext) {
        const code = state["input"] as string
        return await chat(
            `You are a code style expert. Review the following code for naming conventions, readability, missing documentation, and best practice violations. Provide specific, actionable feedback:\n\n${code}`
        )
    }
}

const generateReviewReport: Tool = {
    name: "generateReviewReport",
    description: "Compile a final Markdown code review report",
    async run({ state }: ToolContext) {
        const bugs = state["bugs"] as string
        const style = state["style"] as string
        return await chat(
            `Create a concise, friendly Markdown code review report using the following findings:

## Bugs Found:
${bugs}

## Style Issues:
${style}

Format it with clear sections, emoji for severity (🔴 critical, 🟡 warning, 🟢 suggestion), and end with an overall recommendation.`
        )
    }
}

export function buildAgent() {
    const agent = createAgent({
        onWorkflowStart: ({ workflowId }) => console.log(`\n[Code Review] ${workflowId}`),
        onStepStart: ({ stepId }) => console.log(`  → ${stepId}`),
        onStepEnd: ({ stepId }) => console.log(`  ✓ ${stepId}`),
        onStepError: ({ stepId, error }) => console.error(`  ✗ ${stepId}: ${error?.message}`),
        onWorkflowEnd: ({ workflowId }) => console.log(`[Review Done] ${workflowId}\n`)
    })
    useTool(agent, detectBugs)
    useTool(agent, checkStyle)
    useTool(agent, generateReviewReport)
    return agent
}
