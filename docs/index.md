# Shrimsource Documentation 🦐

Welcome to the official documentation for **Shrimsource**, the tiny, open-source runtime for building AI agent workflows.

## What is Shrimsource?

Shrimsource is a lightweight framework designed to get you from an AI agent idea to a working pipeline in minutes. It provides a simple, structured way to define tools, orchestrate workflows, and run them with real LLM and search capabilities.

## Monorepo Structure

- **`shrimsource-core`**: The core runtime engine (`shrimsource` npm package).
- **`create-shrimsource`**: The CLI tool for scaffolding new projects.
- **`shrimsource-templates`**: A collection of ready-to-use agent templates ranging from code reviewers to market analysts.
- **`awesome-shrimsource`**: A curated list of resources and community-built agents.

## Key Features

- 🛠️ **Simple Tool Definition**: Define discrete units of work as simple TypeScript objects.
- ⛓️ **Graph-based Workflows**: Orchestrate complex task dependencies with ease.
- 🤖 **Universal LLM Support**: Built-in `chat()` helper optimized for OpenRouter and OpenAI-compatible providers.
- 🔍 **Integrated Search**: High-level `search()` helpers powered by Tavily.
- 📂 **Native Filesystem**: Robust `LocalFileStorage` for agent-driven file I/O.
- 🏗️ **Instant Scaffolding**: Get started in seconds with `npx create-shrimsource`.

## Contents

1. [**Getting Started**](getting-started.md) — Install the CLI and run your first agent.
2. [**Core API**](core-api.md) — Learn about `chat()`, `search()`, and workflow orchestration.
3. [**Filesystem & Storage**](filesystem.md) — Use the native `LocalFileStorage` provider.
4. [**Templates**](templates.md) — Explore the 17+ official agent templates.
5. [**Advanced Concepts**](advanced-concepts.md) — Framework internals: Plugins, Memory, and Hooks.
6. [**Custom Agents**](custom-agents.md) — Build and test your own agents from scratch.
7. [**Detailed API Reference**](api-reference.md) — Type definitions and internal interfaces.
8. [**Contributing**](contributing.md) — Learn how to contribute to the monorepo.
9. [**Troubleshooting**](troubleshooting.md) — Common issues and FAQ.
