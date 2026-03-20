import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Analyze constraints and product form
        { id: "product", tool: "analyzeProduct" },
        // 2. Roast the product and suggest growth
        { id: "roast", tool: "generateRoast", dependsOn: ["product"] }
    ],
    "saas-roast-pipeline"
)
