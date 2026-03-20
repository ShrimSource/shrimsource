import { Agent, Tool } from "./types"

export function useTool(agent: Agent, tool: Tool): Agent {
    agent.tools.set(tool.name, tool)
    return agent
}