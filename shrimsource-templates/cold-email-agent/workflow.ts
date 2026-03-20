import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Gather context on the target company
        { id: "context", tool: "gatherCompanyContext" },
        // 2. Draft the personalized cold email
        { id: "email", tool: "draftEmail", dependsOn: ["context"] }
    ],
    "cold-email-pipeline"
)
