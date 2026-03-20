import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Analyze Market
        { id: "market", tool: "analyzeMarket" },
        // 2. Generate Ideas based on analysis
        { id: "ideas", tool: "generateIdeas", dependsOn: ["market"] }
    ],
    "startup-idea-pipeline"
)
