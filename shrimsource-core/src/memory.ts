import { AgentMemory } from "./types"

export function createMemory(): AgentMemory {
    return new Map<string, unknown>()
}