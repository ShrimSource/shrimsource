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

    const targetKeyword = await rl.question("Input Keyword: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, targetKeyword)

    console.log("=== Generated Output ===")
    console.log(result.state["draft"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
