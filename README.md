# 🦐 Shrimsource

**The tiny, zero-boilerplate AI agent framework for developers who just want things to work.**

[![Awesome](https://awesome.re/badge.svg)](/awesome-shrimsource)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](/LICENSE)
[![Templates](https://img.shields.io/badge/Templates-17+-orange.svg)](/shrimsource-templates)

---

### 💡 Why Shrimsource?

Most AI frameworks are too heavy. Shrimsource is built on a different philosophy: **Agents should be simple scripts, not complex architectures.**

- **⚡ 0.5kb Core**: Smaller than a single tweet.
- **🚀 30-Second Setup**: From `npx` to your first LLM response in under a minute.
- **🔋 Battery Included**: 17+ professional templates for SEO, Sales, Code Review, and more.
- **🛠️ Native Efficiency**: Built-in `chat()`, `search()`, and `storage` tools. No more boilerplate imports.

---

## 🚀 Quick Start

Build and run your custom AI agent in **3 steps**:

### 1. Scaffold
```bash
npx create-shrimsource
```

### 2. Configure
Add your OpenRouter/OpenAI key to `.env`:
```bash
LLM_API_KEY=sk-or-v1-....
```

### 3. Run
```bash
npm install && npm run agent
```

---

## 🛠️ One-Liner AI Power

Shrimsource abstracts the complexity of LLM and Search into simple, intuitive helpers:

```typescript
import { chat, searchToText } from "shrimsource"

// 1. Search the web
const context = await searchToText("latest AI trends 2024")

// 2. Chat with context
const summary = await chat(`Summarize this: ${context}`)

console.log(summary)
```

---

## 📦 Monorepo Structure

| Component | Responsibility |
| :--- | :--- |
| **[`shrimsource-core`](/shrimsource-core)** | The lightweight runtime engine (`shrimsource` npm package). |
| **[`create-shrimsource`](/create-shrimsource)** | CLI tool to instantly generate ready-to-use agents. |
| **[`shrimsource-templates`](/shrimsource-templates)** | **17+** Production-grade agent blueprints. |
| **[`docs`](/docs)** | Comprehensive 10-page developer guide & API reference. |

---

## 🌟 Featured Templates

| Agent | What it does |
| :--- | :--- |
| **[blank-agent](/shrimsource-templates/blank-agent)** | 🏗️ The ultimate starter with Vitest built-in. |
| **[research-agent](/shrimsource-templates/research-agent)** | 🔍 Deep company research & market analysis. |
| **[code-review-agent](/shrimsource-templates/code-review-agent)** | 🤖 Automated PR reviews & bug detection. |
| **[seo-agent](/shrimsource-templates/seo-agent)** | 📈 Keyword research & outline generation. |

*Check out the [full catalog of 17+ templates](/shrimsource-templates).*

---

## 🤝 Contributing

We love stars ⭐ and contributions! Whether it's adding a new template or fixing a core bug, check out our [Contributing Guide](/docs/contributing.md) to get started.

---

*Made with 🦐 by the ShrimSource community.*
