# Filesystem & Storage 📂

Shrimsource includes a robust `LocalFileStorage` provider and corresponding tools for agent-driven file I/O.

## `LocalFileStorage` Provider

This provider implements the `StorageProvider` interface using Node.js's native `fs/promises`.

### Configuration

```ts
import { LocalFileStorage } from "shrimsource"

// Initialize with a base directory (defaults to ./storage)
const storage = new LocalFileStorage("./my-agent-files")
```

### Security: Directory Traversal Protection
The provider resolution logic prevents directory traversal attacks by validating that all resolved paths remain within the specified `baseDir`. Attempting to use a key like `../../etc/passwd` will throw an error.

---

## Filesystem Tools

You can expose these storage capabilities to your agent using `createFileTools`.

### Registering Tools

```ts
import { createFileTools, LocalFileStorage, useTool } from "shrimsource"

const storage = new LocalFileStorage("./output")
const agent = createAgent()

// Registers storage_upload, storage_download, and storage_delete
createFileTools(storage).forEach(tool => useTool(agent, tool))
```

### Available Tools

| Tool Name | Operation | Input Parameters |
|---|---|---|
| `storage_upload` | Write file | `{ key: string, content: string }` |
| `storage_download` | Read file | `{ key: string }` |
| `storage_delete` | Delete file | `{ key: string }` |

### Why Use `StorageProvider`?
By using the `StorageProvider` abstraction, your agent's code remains the same whether you use the local filesystem (`LocalFileStorage`) or cloud storage (like `S3Storage`).
