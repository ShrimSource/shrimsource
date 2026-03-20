import { createWorkflow } from "shrimsource"

// ---------------------------------------------------------------------------
// Workflow Definition
// ---------------------------------------------------------------------------
// A workflow defines the order and dependencies of your tools.
//
// Each step has:
//   id        - Unique identifier (used for dependsOn and state access)
//   tool      - Name of the tool to run (must match Tool.name in agent.ts)
//   dependsOn - (optional) Array of step IDs that must complete first
//   parallel  - (optional) Run this step in parallel with others at same level
//   retry     - (optional) Number of times to retry on failure (default: 0)
//   timeoutMs - (optional) Max milliseconds before step is cancelled
//
// The result of each step is stored in state[stepId]
//
// Example patterns:
//   Sequential:  A → B → C
//   Parallel:    A, B run together → C waits for both
//   Fan-out:     A → B, C, D each depend on A
// ---------------------------------------------------------------------------

export const workflow = createWorkflow(
    [
        // Step 1: runs first
        { id: "step1", tool: "step1" },

        // Step 2: runs after step1 completes
        // Access step1's output in agent.ts via: state["step1"]
        { id: "step2", tool: "step2", dependsOn: ["step1"] },

        // TODO: add more steps here
        // { id: "step3", tool: "step3", dependsOn: ["step1", "step2"] },
        // { id: "step3", tool: "step3", parallel: true },
    ],
    "my-agent-pipeline" // TODO: rename this to something descriptive
)
