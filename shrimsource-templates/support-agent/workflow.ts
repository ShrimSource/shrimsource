import { createWorkflow } from "shrimsource"

export const workflow = createWorkflow(
    [
        { id: "analyze", tool: "analyzeQuery" },
        { id: "kb", tool: "searchKnowledgeBase", dependsOn: ["analyze"] },
        { id: "reply", tool: "draftReply", dependsOn: ["analyze", "kb"] }
    ],
    "support-pipeline"
)
