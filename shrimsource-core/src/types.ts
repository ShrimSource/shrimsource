export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue }

export type AgentState = Record<string, unknown>

export type AgentMemory = Map<string, unknown>

export type ToolContext = {
    input: unknown
    state: AgentState
    memory: AgentMemory
    stepId: string
    workflowId: string
}

export type ToolResult = unknown

export type Tool = {
    name: string
    description?: string
    run: (ctx: ToolContext) => Promise<ToolResult>
}

export type Plugin = {
    name: string
    version?: string
    tools?: Tool[]
}

export type WorkflowStep = {
    id: string
    tool: string
    input?: unknown
    parallel?: boolean
    dependsOn?: string[]
    retry?: number
    timeoutMs?: number
}

export type Workflow = {
    id: string
    steps: WorkflowStep[]
}

export type RuntimeHookPayload = {
    workflowId: string
    stepId?: string
    tool?: string
    error?: Error
    result?: unknown
}

export type RuntimeHooks = {
    onWorkflowStart?: (payload: RuntimeHookPayload) => void | Promise<void>
    onWorkflowEnd?: (payload: RuntimeHookPayload) => void | Promise<void>
    onStepStart?: (payload: RuntimeHookPayload) => void | Promise<void>
    onStepEnd?: (payload: RuntimeHookPayload) => void | Promise<void>
    onStepError?: (payload: RuntimeHookPayload) => void | Promise<void>
}

export type Agent = {
    tools: Map<string, Tool>
    memory: AgentMemory
    plugins: Set<string>
    hooks: RuntimeHooks
}

export type RunWorkflowOptions = {
    state?: AgentState
}

export type WorkflowRunResult = {
    workflowId: string
    state: AgentState
    completedSteps: string[]
}