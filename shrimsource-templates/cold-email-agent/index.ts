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

    const targetCompany = await rl.question("Input Target Company: ")
    const yourProduct = await rl.question("Input Your Product: ")
    rl.close()

    const inputDict = { company: targetCompany, product: yourProduct }
    const result = await runWorkflow(agent, workflow, inputDict)

    console.log("\n=== Output ===")
    console.log(result.state["email"])
    console.log(`\nCompleted steps: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
