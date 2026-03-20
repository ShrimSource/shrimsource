# Blank Agent Template

A minimal scaffold for building your own Shrimsource agent. Clone this template and follow the steps below to create your custom agent.

## Quick Start

```bash
cp .env.example .env       # Fill in your API keys
npm install
npm run agent
```

## How to Build Your Agent

### 1. Define your tools in `agent.ts`

Each tool is a step in your pipeline. Replace the TODO placeholders:

```ts
const myTool: Tool = {
    name: "myTool",
    description: "What this tool does",
    async run({ state, input }: ToolContext) {
        const userInput = state["input"] as string

        // Use the LLM
        const result = await chat(`Your prompt here: ${userInput}`)
        return result

        // Or use search
        // const context = await searchToText("query")

        // Or call an external API
        // const data = await fetch("https://api.example.com/...")
    }
}
```

### 2. Define your workflow in `workflow.ts`

Set the order and dependencies between your tools:

```ts
export const workflow = createWorkflow([
    { id: "gather", tool: "myGatherTool" },
    { id: "process", tool: "myProcessTool", dependsOn: ["gather"] },
    { id: "output", tool: "myOutputTool", dependsOn: ["process"] },
], "my-pipeline")
```

### 3. Update `index.ts`

Change the input prompt and the output state key to match your workflow.

### Available imports from `shrimsource`

| Function | Description |
|---|---|
| `chat(prompt)` | Call the LLM with a prompt, returns string |
| `search(query)` | Search the web with Tavily, returns `SearchResult[]` |
| `searchToText(query)` | Search and return formatted string for LLM prompts |
| `createAgent(hooks)` | Create a new agent with lifecycle hooks |
| `useTool(agent, tool)` | Register a tool with an agent |
| `createWorkflow(steps, id)` | Define the execution workflow |
| `runWorkflow(agent, workflow, input)` | Execute the workflow |

## Project Structure

```
blank-agent/
├── agent.ts      # Tool definitions (the actual work)
├── workflow.ts   # Step ordering and dependencies
├── index.ts      # Entry point (user input + run)
├── .env          # Your API keys (copy from .env.example)
└── package.json
```
