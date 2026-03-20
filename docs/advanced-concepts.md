# Advanced Concepts 🧠

Go beyond simple workflows with plugins, memory management, and lifecycle hooks.

## 1. Plugin System

Plugins allow you to bundle sets of tools and register them with an agent in one go.

### Defining a Plugin
```ts
import { Plugin, Tool } from "shrimsource"

const myTools: Tool[] = [ /* ... */ ]

export const myPlugin: Plugin = {
  name: "my-custom-plugin",
  version: "1.0.0",
  tools: myTools
}
```

### Registering a Plugin
```ts
import { registerPlugin, createAgent } from "shrimsource"

const agent = createAgent()
registerPlugin(agent, myPlugin)
```

---

## 2. Agent Memory

Shrimsource agents have transitionary and persistent memory options.

### Tool Memory
Every tool has access to `memory` in its `ToolContext`. This is a `Map` that persists across steps in a single workflow execution.

```ts
async run({ memory }: ToolContext) {
  memory.set("seen_data", true)
}
```

### Persistent State
You can pass an initial state to `runWorkflow` to resume from a previous execution or inject global context.

```ts
const prevState = { user_id: 123 }
const result = await runWorkflow(agent, workflow, input, { state: prevState })
```

---

## 3. Lifecycle Hooks

Lifecycle hooks allow you to observe and react to the agent's execution.

| Hook | When it runs |
|---|---|
| `onWorkflowStart` | At the beginning of `runWorkflow` |
| `onStepStart` | Before each tool execution |
| `onStepEnd` | After a tool successfully finishes |
| `onStepError` | When a tool throws an error |
| `onWorkflowEnd` | After the entire workflow completes |

### Example Logging Hook
```ts
const agent = createAgent({
  onStepStart: ({ stepId }) => console.log(`Starting ${stepId}...`),
  onStepError: ({ stepId, error }) => console.error(`Error in ${stepId}: ${error.message}`)
})
```
