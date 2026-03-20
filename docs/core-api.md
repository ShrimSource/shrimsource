# Core API Reference 🛠️

Shrimsource provides a high-level API to simplify AI agent development.

## High-Level Helpers

These functions are available directly from the `shrimsource` package and are the easiest way to add AI and search to your agent.

### `chat(prompt: string): Promise<string>`
Calls the configured LLM with the given prompt and returns the text response.
- **Environment**: Reads `LLM_MODEL`, `LLM_BASE_URL`, and `LLM_API_KEY`.
- **Default Model**: `openai/gpt-4o-mini` (via OpenRouter).

### `search(query: string, options?: SearchOptions): Promise<SearchResult[]>`
Performs a web search using the configured search provider (Tavily).
- **Return Type**: An array of `SearchResult` objects `{ title, url, snippet }`.
- **Environment**: Reads `SHRIM_SEARCH_KEY`.

### `searchToText(query: string, options?: SearchOptions): Promise<string>`
A convenience wrapper that searches and formats the results into a single numbered string — perfect for immediate inclusion in a `chat()` prompt.

---

## Agent Construction

### `createAgent(hooks?: AgentHooks)`
Creates a new `Agent` instance. Use hooks like `onStepStart` or `onWorkflowEnd` to add logging or telemetry.

### `useTool(agent: Agent, tool: Tool)`
Registers a tool with an agent. A `Tool` is an object with a `name`, `description`, and a `run` function.

---

## Workflow Orchestration

### `createWorkflow(steps: WorkflowStep[], id: string)`
Defines the execution graph for your agent.
- **WorkflowStep Options**:
  - `id`: Unique identifier for the step (used to store results in `state`).
  - `tool`: Name of the registered tool to execute.
  - `dependsOn`: Array of step IDs that must finish before this step starts.
  - `parallel`: If true, runs the step in parallel with others at the same dependency level.
  - `retry`: Number of retry attempts on failure.
  - `timeoutMs`: Max execution time per step.

### `runWorkflow(agent: Agent, workflow: Workflow, input: any)`
Executes the workflow using the specified agent.
- **Return Value**: An object containing the final `state` (all step outputs) and a list of `completedSteps`.
