# Shrimsource 🦐

The tiny, open-source runtime for building AI agent workflows.

[![Awesome](https://awesome.re/badge.svg)](https://github.com/ShrimSource/shrimsource/tree/main/awesome-shrimsource)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Shrimsource is a lightweight framework designed to get you from an AI agent idea to a working production-ready pipeline in minutes. It provides a simple, structured way to define tools, orchestrate workflows, and run them with real LLM and search capabilities.

## 🚀 Quick Start

Generate a new agent project instantly using our CLI:

```bash
npx create-shrimsource
```

## 📦 Monorepo Structure

This repository is organized as an npm workspaces monorepo:

- **[`shrimsource-core`](/shrimsource-core)**: The core runtime engine (`shrimsource` package).
- **[`create-shrimsource`](/create-shrimsource)**: The official CLI scaffolding tool.
- **[`shrimsource-templates`](/shrimsource-templates)**: A collection of 17+ ready-to-use agent templates.
- **[`docs`](/docs)**: Comprehensive documentation and API references.
- **[`awesome-shrimsource`](/awesome-shrimsource)**: A curated list of agents, tools, and resources.

## 🛠️ Core Features

- **High-Level Helpers**: Use `chat()` for LLM interaction and `search()` for web search with one line of code.
- **Native Filesystem**: Robust `LocalFileStorage` for agent-driven file I/O with built-in security.
- **Graph-based Workflows**: Easily define complex task dependencies and parallel execution.
- **Unit Testing**: Pre-configured Vitest setup in templates for reliable agent behavior.
- **Provider Agnostic**: Works with OpenRouter, OpenAI, Tavily, Supabase, and more.

## 📖 Documentation

Check out our [full documentation](/docs/index.md) to learn more:

1. [Getting Started](/docs/getting-started.md)
2. [Core API Reference](/docs/core-api.md)
3. [Filesystem & Storage](/docs/filesystem.md)
4. [Official Templates](/docs/templates.md)
5. [Custom Agents & Testing](/docs/custom-agents.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](/docs/contributing.md) for more details.

---

*Made with 🦐 by the ShrimSource community.*
