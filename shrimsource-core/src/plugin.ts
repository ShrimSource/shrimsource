import { Agent, Plugin } from "./types"

export function registerPlugin(agent: Agent, plugin: Plugin): Agent {
    if (agent.plugins.has(plugin.name)) {
        return agent
    }

    agent.plugins.add(plugin.name)

    for (const tool of plugin.tools ?? []) {
        agent.tools.set(tool.name, tool)
    }

    return agent
}