import { createMemory } from "./memory"
import { Agent, RuntimeHooks } from "./types"

export function createAgent(hooks: RuntimeHooks = {}): Agent {
    return {
        tools: new Map(),
        memory: createMemory(),
        plugins: new Set(),
        hooks
    }
}