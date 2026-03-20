import { runWorkflow } from "shrimsource"
import { buildAgent } from "./agent.js"
import { workflow } from "./workflow.js"
import * as readline from "node:readline/promises"

async function main() {
    const agent = buildAgent()

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const customerQuery = await rl.question("Customer Query: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, customerQuery)

    console.log("=== Generated Output ===")
    console.log(result.state["reply"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
