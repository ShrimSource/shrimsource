import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Search for competitors
        { id: "competitors", tool: "searchCompetitors" },
        // 2. Classify them into market tiers
        { id: "map", tool: "classifyTiers", dependsOn: ["competitors"] }
    ],
    "market-map-pipeline"
)
