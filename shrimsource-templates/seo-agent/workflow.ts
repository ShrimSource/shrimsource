import { createWorkflow } from "shrimsource"

export const workflow = createWorkflow(
    [
        { id: "analysis", tool: "analyzeKeyword" },
        { id: "draft", tool: "draftArticle", dependsOn: ["analysis"] }
    ],
    "seo-pipeline"
)
