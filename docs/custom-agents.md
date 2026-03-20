# Custom Agents & Testing 🧪

Building your own AI agent is easy with Shrimsource. Follow this guide to create and test your custom agent from scratch.

## 1. Start with `blank-agent`

Use the CLI to scaffold a `blank-agent` project:

```bash
npx create-shrimsource
# Select "blank-agent" from the list
```

The `blank-agent` template provides a minimal, clean starting point with:
- A predefined `agent.ts` with two placeholder tools.
- A basic `workflow.ts` orchestration.
- A complete unit testing setup with Vitest.

---

## 2. Writing Your Own Tools

In `agent.ts`, you define the tools your agent can use.

### Tool Structure
```ts
import { Tool, ToolContext, chat } from "shrimsource"

export const myTool: Tool = {
  name: "myTool",
  description: "Briefly explain what this does",
  async run({ state, input }: ToolContext) {
    const userInput = state["input"] as string
    
    // Call the AI
    const result = await chat(`Helpful prompt here: ${userInput}`)
    return result
  }
}
```

### Context properties
- `state`: Use this to access the outputs of previous workflow steps (e.g., `state["prevStepId"]`).
- `input`: The initial input provided when `runWorkflow` was called.
- `memory`: Access the agent's short-term or long-term memory.

---

## 3. Unit Testing Your Agent

Testing is critical for reliable agent behavior. Shrimsource templates use **Vitest** for testing.

### Mocking `shrimsource`
When testing, you'll want to mock the AI and search calls to avoid real API costs and non-deterministic results.

```ts
import { vi, describe, it, expect } from "vitest"

// Mock the core package
vi.mock("shrimsource", () => ({
  chat: vi.fn(),
  search: vi.fn(),
  // ... other mocks
}))

import { chat } from "shrimsource"
import { buildAgent } from "../agent.js"

describe("My Agent", () => {
  it("should work correctly", async () => {
    // Mock the LLM response
    (chat as any).mockResolvedValueOnce("mocked response")

    const agent = buildAgent()
    const tool = (agent as any).tools.get("myTool")
    
    const result = await tool.run({ state: { input: "test" } })
    expect(result).toBe("mocked response")
  })
})
```

### Running Tests
```bash
npm test
```

## 4. Best Practices

1. **Atomic Tools**: Keep individual tools focused on a single task.
2. **Clear Descriptions**: The `description` of a tool is used by the agent system (and future planners) to know when to call it — make it descriptive!
3. **Structured Workflows**: Use `parallel: true` for independent tasks to speed up execution.
4. **Retry Logic**: For network-heavy tasks (like scraping or searching), use the `retry` option in your workflow definition.
