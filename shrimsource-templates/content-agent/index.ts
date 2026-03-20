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

    const topic = await rl.question("输入主题: ")
    rl.close()

    const result = await runWorkflow(agent, workflow, topic)

    // 输出最终文章
    console.log("=== 生成结果 ===")
    console.log(result.state["merge"])
    console.log(`\n已完成步骤: ${result.completedSteps.join(", ")}`)
}

main().catch(console.error)
