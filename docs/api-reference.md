# Detailed API Reference 📖

A comprehensive guide to the internal types and interfaces used in Shrimsource.

## Core Types

### `ToolContext`
The object passed to every tool's `run` function.
```ts
type ToolContext = {
  input: any;           // The initial input provided to the workflow
  state: AgentState;    // Results of all previous steps: Record<string, any>
  memory: AgentMemory;  // Shared memory for this execution: Map<string, any>
  stepId: string;       // ID of the current step
  workflowId: string;   // ID of the running workflow
}
```

### `WorkflowStep`
Configuration for a single step in a workflow.
```ts
type WorkflowStep = {
  id: string;           // Key used to store result in state
  tool: string;         // Name of the registered tool to use
  input?: any;          // Static input to pass to the tool
  parallel?: boolean;   // Run in parallel with other steps at this level
  dependsOn?: string[]; // Wait for these step IDs to complete first
  retry?: number;       // Number of retries on failure
  timeoutMs?: number;   // Max execution time
}
```

### `WorkflowRunResult`
The final state after a workflow completes.
```ts
type WorkflowRunResult = {
  workflowId: string;
  state: AgentState;      // Final combined results of all steps
  completedSteps: string[]; // List of IDs that successfully ran
}
```

---

## Runtime Interfaces

### `Agent`
The primary container for tools, memory, and hooks.
```ts
type Agent = {
  tools: Map<string, Tool>;
  memory: AgentMemory;
  plugins: Set<string>;
  hooks: RuntimeHooks;
}
```

### `StorageProvider`
Interface for implementing custom storage backends (e.g., Local, S3, Azure).
```ts
interface StorageProvider {
  upload(key: string, file: Uint8Array | Buffer | string): Promise<string>;
  download(key: string): Promise<Uint8Array | Buffer | string | null>;
  delete(key: string): Promise<void>;
}
```
