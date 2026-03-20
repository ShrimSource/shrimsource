import { createWorkflow } from "shrimsource"

export const workflow = createWorkflow(
    [
        { id: "company", tool: "analyzeCompany" },
        { id: "product", tool: "analyzeProduct", parallel: true },
        { id: "draft", tool: "draftEmail", dependsOn: ["company", "product"] }
    ],
    "sales-pipeline"
)
