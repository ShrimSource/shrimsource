import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        { id: "detect", tool: "detectBugs", parallel: true },
        { id: "style", tool: "checkStyle", parallel: true },
        { id: "report", tool: "generateReviewReport", dependsOn: ["detect", "style"] }
    ],
    "code-review-pipeline"
)
