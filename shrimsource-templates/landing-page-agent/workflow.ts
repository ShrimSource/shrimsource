import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// 工作流定义
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // 1. Extract value prop
        { id: "valueProp", tool: "extractValueProp" },
        // 2. Write the landing page copy
        { id: "copy", tool: "writeCopy", dependsOn: ["valueProp"] }
    ],
    "landing-page-pipeline"
)
