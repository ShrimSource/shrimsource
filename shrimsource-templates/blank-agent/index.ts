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

    // TODO: Update this prompt to ask for the right input
    const input = await rl.question("Enter your input: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, input)

    // TODO: Update this to display the right output state key
    // By default we show the last step's result ("step2")
    console.log("\n=== Result ===")
    console.log(result.state["step2"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
