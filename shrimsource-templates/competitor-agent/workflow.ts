import { createWorkflow } from "shrimsource"

export const workflow = createWorkflow(
    [
        { id: "competitors", tool: "findCompetitors" },
        { id: "features", tool: "compareFeatures", dependsOn: ["competitors"] },
        { id: "position", tool: "analyzePosition", parallel: true },
        { id: "report", tool: "generateReport", dependsOn: ["features", "position"] }
    ],
    "competitor-pipeline"
)
