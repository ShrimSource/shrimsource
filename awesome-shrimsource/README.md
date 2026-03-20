# Awesome Shrimsource [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of agents, templates, tools, and resources built with or for the [Shrimsource](https://github.com/ShrimSource/shrimsource) AI agent framework.

---

## Contents

- [Monorepo Structure](#monorepo-structure)
- [Framework & Core](#framework--core)
- [Official Agent Templates](#official-agent-templates)
- [Tools & Integrations](#tools--integrations)
- [Contributing](#contributing)

---

## Monorepo Structure

The Shrimsource project is organized as a **npm workspaces monorepo** at [github.com/ShrimSource/shrimsource](https://github.com/ShrimSource/shrimsource):

```
shrimsource/
├── shrimsource-core/        # Core runtime package (npm: shrimsource)
├── create-shrimsource/      # CLI scaffolding tool (npm: create-shrimsource)
├── shrimsource-templates/   # Official agent templates registry
└── awesome-shrimsource/     # This list
```

---

## Framework & Core

- **[shrimsource](https://www.npmjs.com/package/shrimsource)** `v0.1.0` — The tiny, open-source runtime for building AI agent workflows. Beyond the core 5 methods (`createAgent`, `useTool`, `registerPlugin`, `createWorkflow`, `runWorkflow`), it now provides high-level helpers like `chat()` for LLM interaction, `search()` for web search, and `LocalFileStorage` for native filesystem operations. MIT License.
- **[create-shrimsource](https://www.npmjs.com/package/create-shrimsource)** `v0.1.5` — Official CLI scaffolding tool. Instantly generate ready-to-use AI agent projects with pre-configured LLM wiring, interactive template selection including the new `blank-agent`, and automated `.env` setup.
  ```bash
  npx create-shrimsource
  ```

---

## Official Agent Templates

All templates are available via `npx create-shrimsource` and hosted in [`shrimsource-templates/`](https://github.com/ShrimSource/shrimsource/tree/main/shrimsource-templates).

| Template | Description | Capabilities |
|---|---|---|
| **blank-agent** | A minimal scaffold for building your own custom agent. Start here if you want to create something from scratch. | `llm` |
| **code-review-agent** | Reviews a code snippet or GitHub PR URL for bugs, security issues, and style improvements | `llm` |
| **cold-email-agent** | Writes high-converting B2B cold emails tailored to specific prospects and industries | `llm` |
| **competitor-agent** | Monitors and analyzes competitor moves, generating instant comparative feature and pricing analyses | `llm`, `search` |
| **content-agent** | Automatically drafts, synthesizes, and formats full-length articles or blog posts from a single topic | `llm` |
| **landing-page-agent** | Generates high-converting landing page copy and core structure from your product value proposition | `llm` |
| **market-map-agent** | Auto-generates comprehensive market landscapes mapping competitors, categories, and investment trends | `llm`, `search` |
| **newsletter-agent** | Curates recent news on a given topic and drafts a professional newsletter | `llm`, `search` |
| **pitch-deck-agent** | Analyzes a startup idea and generates an outline for a compelling 10-slide pitch deck | `llm` |
| **research-agent** | Auto-searches and scrapes company information to generate comprehensive background reports | `llm`, `search` |
| **resume-reviewer-agent** | Analyzes a resume against a job description and provides a roast plus actionable improvement tips | `llm` |
| **saas-roast-agent** | Brutally honest AI-driven teardowns of SaaS landing pages and onboarding flows to improve conversions | `llm`, `search` |
| **sales-agent** | Generates highly personalized cold outreach emails based on target company context and your product | `llm` |
| **seo-agent** | Conducts keyword research and generates targeted content outlines to boost organic search visibility | `llm`, `search` |
| **social-media-agent** | Generates a week of social media posts (X, LinkedIn) from a blog post or product URL | `llm` |
| **startup-idea-agent** | Validates, brainstorms, and expands on raw startup concepts to help founders find product-market fit | `llm` |
| **support-agent** | Automatically classifies, routes, and drafts responses for incoming customer support tickets | `llm` |

---

## Tools & Integrations

Built-in tools available in the Shrimsource ecosystem:

- **Web Search Tool** (Tavily) — High-level `search()` and `searchToText()` helpers for instant internet knowledge retrieval.
- **Native Filesystem Tool** — Real read/write/delete capabilities via `LocalFileStorage` with directory traversal protection.
- **Supabase Integration** — Integrated Supabase provider for database-backed agent memory and state.
- **Email Tool** (Resend) — Automatically draft and send transactional emails through Resend.
- **Scraper Tool** — A simple fetch-based scraper for extracting clean text from websites for LLM processing.

---

## Contributing

Contributions are welcome! To add your own agent, template, tool, or resource:

1. Fork the [shrimsource](https://github.com/ShrimSource/shrimsource) monorepo
2. Add your entry in `awesome-shrimsource/README.md` under the relevant section
3. Open a Pull Request with a brief description of what you're adding

To contribute a new **agent template**, add it under `shrimsource-templates/` and update `registry.json`.

Please keep entries concise and ensure all linked resources are publicly accessible.

---

*Made with 🦐 by the [ShrimSource](https://github.com/ShrimSource) community.*
