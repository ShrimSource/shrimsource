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

    const targetDomain = await rl.question("Input Company Domain: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, targetDomain)

    console.log("=== Generated Output ===")
    console.log(result.state["report"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
