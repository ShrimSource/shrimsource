import { runWorkflow } from "shrimsource"
import { buildAgent } from "./agent.js"
import { workflow } from "./workflow.js"
import * as readline from "node:readline/promises"

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------

async function main() {
    const agent = buildAgent()

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const productIdea = await rl.question("Input Product Idea: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, productIdea)

    console.log("=== Output ===")
    console.log(result.state["copy"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
