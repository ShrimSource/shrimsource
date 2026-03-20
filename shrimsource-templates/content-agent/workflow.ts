import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        { id: "outline", tool: "generateOutline" },
        { id: "para1", tool: "generateParagraph", input: { outlineIndex: 0 }, parallel: true, dependsOn: ["outline"], retry: 2, timeoutMs: 5000 },
        { id: "para2", tool: "generateParagraph", input: { outlineIndex: 1 }, parallel: true, dependsOn: ["outline"], retry: 2, timeoutMs: 5000 },
        { id: "para3", tool: "generateParagraph", input: { outlineIndex: 2 }, parallel: true, dependsOn: ["outline"], retry: 2, timeoutMs: 5000 },
        { id: "merge", tool: "mergeArticle", dependsOn: ["para1", "para2", "para3"] }
    ],
    "content-pipeline"
)
