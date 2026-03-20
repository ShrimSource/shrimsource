import { runWorkflow } from "shrimsource"
import { buildAgent } from "./agent.js"
import { workflow } from "./workflow.js"
import * as readline from "node:readline/promises"

// ---------------------------------------------------------------------------
// Entry Point
// ---------------------------------------------------------------------------

async function main() {
    const agent = buildAgent()

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const company = await rl.question("Company: ")
    const product = await rl.question("Product: ")
    rl.close()

    const inputData = { company, product }

    const result = await runWorkflow(agent, workflow, inputData)

    console.log("=== Generated Output ===")
    console.log(result.state["draft"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
