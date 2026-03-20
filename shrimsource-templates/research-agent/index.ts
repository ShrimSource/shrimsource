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

    const targetDomain = await rl.question("Input Company Domain: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, targetDomain)

    // 输出最终报告
    console.log("=== 生成结果 ===")
    console.log(result.state["report"])
    console.log(`\n已完成步骤: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
