import { runWorkflow } from "shrimsource"
import { buildAgent } from "./agent"
import { workflow } from "./workflow"
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

    const topic = await rl.question("输入需要 Review 的代码或 PR 链接: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, topic)

    // 输出最终结果
    console.log("=== Review 结果 ===")
    console.log(result.state["report"])
    console.log(`\n已完成步骤: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
