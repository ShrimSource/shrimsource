import {
    Agent,
    RunWorkflowOptions,
    Workflow,
    WorkflowRunResult,
    WorkflowStep
} from "./types"
import { retry, withTimeout } from "./utils"

function canRunStep(step: WorkflowStep, completed: Set<string>): boolean {
    return (step.dependsOn ?? []).every((dep) => completed.has(dep))
}

async function executeStep(
    agent: Agent,
    workflow: Workflow,
    step: WorkflowStep,
    state: Record<string, unknown>
): Promise<unknown> {
    const tool = agent.tools.get(step.tool)

    if (!tool) {
        throw new Error(`Tool not found: ${step.tool}`)
    }

    await agent.hooks.onStepStart?.({
        workflowId: workflow.id,
        stepId: step.id,
        tool: step.tool
    })

    try {
        const result = await retry(
            () =>
                withTimeout(
                    tool.run({
                        input: step.input ?? state,
                        state,
                        memory: agent.memory,
                        stepId: step.id,
                        workflowId: workflow.id
                    }),
                    step.timeoutMs
                ),
            step.retry ?? 0
        )

        state[step.id] = result

        await agent.hooks.onStepEnd?.({
            workflowId: workflow.id,
            stepId: step.id,
            tool: step.tool,
            result
        })

        return result
    } catch (error) {
        const normalized =
            error instanceof Error ? error : new Error(String(error))

        await agent.hooks.onStepError?.({
            workflowId: workflow.id,
            stepId: step.id,
            tool: step.tool,
            error: normalized
        })

        throw normalized
    }
}

export async function runWorkflow(
    agent: Agent,
    workflow: Workflow,
    input: unknown,
    options: RunWorkflowOptions = {}
): Promise<WorkflowRunResult> {
    const state: Record<string, unknown> = {
        input,
        ...(options.state ?? {})
    }

    const completed = new Set<string>()
    const pending = new Map(workflow.steps.map((step) => [step.id, step]))

    await agent.hooks.onWorkflowStart?.({
        workflowId: workflow.id
    })

    while (pending.size > 0) {
        const runnable: WorkflowStep[] = []

        for (const step of pending.values()) {
            if (canRunStep(step, completed)) {
                runnable.push(step)
            }
        }

        if (runnable.length === 0) {
            throw new Error(
                "Workflow deadlock detected. Check dependsOn relationships."
            )
        }

        const parallelSteps = runnable.filter((step) => step.parallel)
        const sequentialSteps = runnable.filter((step) => !step.parallel)

        for (const step of sequentialSteps) {
            await executeStep(agent, workflow, step, state)
            completed.add(step.id)
            pending.delete(step.id)
        }

        if (parallelSteps.length > 0) {
            await Promise.all(
                parallelSteps.map((step) =>
                    executeStep(agent, workflow, step, state)
                )
            )

            for (const step of parallelSteps) {
                completed.add(step.id)
                pending.delete(step.id)
            }
        }
    }

    await agent.hooks.onWorkflowEnd?.({
        workflowId: workflow.id
    })

    return {
        workflowId: workflow.id,
        state,
        completedSteps: [...completed]
    }
}