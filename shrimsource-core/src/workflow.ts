import { Workflow, WorkflowStep } from "./types"

function validateWorkflowSteps(steps: WorkflowStep[]): void {
    const ids = new Set<string>()

    for (const step of steps) {
        if (!step.id) {
            throw new Error("Each workflow step must have an id")
        }

        if (!step.tool) {
            throw new Error(`Workflow step "${step.id}" must have a tool`)
        }

        if (ids.has(step.id)) {
            throw new Error(`Duplicate workflow step id: ${step.id}`)
        }

        ids.add(step.id)
    }

    for (const step of steps) {
        for (const dep of step.dependsOn ?? []) {
            if (!ids.has(dep)) {
                throw new Error(`Step "${step.id}" depends on missing step "${dep}"`)
            }
        }
    }
}

export function createWorkflow(
    steps: WorkflowStep[],
    workflowId = "workflow"
): Workflow {
    validateWorkflowSteps(steps)

    return {
        id: workflowId,
        steps
    }
}