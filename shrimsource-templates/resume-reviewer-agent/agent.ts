import { createAgent, useTool } from "shrimsource"
import type { Tool, ToolContext } from "shrimsource"
import { chat } from "shrimsource"

const extractSkills: Tool = {
    name: "extractSkills",
    description: "Extract and assess skills and experience from the resume",
    async run({ state }: ToolContext) {
        const input = state["input"] as { resume: string, jobDescription: string }
        return await chat(
            `From this resume, extract key technical skills, years of experience, notable achievements, and job titles. Resume:\n\n${input.resume}`
        )
    }
}

const compareWithJD: Tool = {
    name: "compareWithJD",
    description: "Compare resume against job description and score the match",
    async run({ state }: ToolContext) {
        const input = state["input"] as { resume: string, jobDescription: string }
        const skills = state["skills"] as string
        return await chat(
            `Compare this candidate's profile against the job description.

Candidate profile: ${skills}

Job description: ${input.jobDescription}

Provide: an overall match score (0-100), top 3 matching strengths, top 3 gaps or missing qualifications. Be specific.`
        )
    }
}

const generateRoastAndTips: Tool = {
    name: "generateRoastAndTips",
    description: "Generate honest, direct feedback and actionable improvement tips",
    async run({ state }: ToolContext) {
        const input = state["input"] as { resume: string, jobDescription: string }
        const comparison = state["comparison"] as string
        return await chat(
            `You are a brutally honest but constructive career coach reviewing a resume for a job application.

Match assessment: ${comparison}

Resume: ${input.resume}

Write two sections:

## 🔥 Honest Roast
3-4 sentences of direct, specific criticism of the resume's weaknesses. Point out vague language, missing quantification, or missed opportunities. Be direct but not cruel.

## 💡 Actionable Tips
Provide 5 specific, concrete improvements the candidate can make today. Each should be a 1-2 sentence action item with an example rewrite where applicable.`
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
    useTool(agent, extractSkills)
    useTool(agent, compareWithJD)
    useTool(agent, generateRoastAndTips)
    return agent
}
