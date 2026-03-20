# Shrimsource

**Build AI agents in minutes.**

Shrimsource is a tiny open-source runtime for building agent workflows with tools, plugins, and templates.

It is designed for developers who want the fastest path from idea to a working AI agent.

---

## Two commands to your first agent

```bash
npx create-aquarium research-agent
npm run agent
```

Create a working agent project from a template, then run it instantly.

---

## What is Shrimsource?

Shrimsource is a minimal runtime for building AI agents.

It helps developers:

- create agents
- define workflows
- run workflows
- register plugins
- use tools

Aquarium is intentionally small.  
The goal is to make building and running agents extremely simple.

---

## Core API

Shrimsource exposes only five core functions:

```
createAgent()
createWorkflow()
runWorkflow()
registerPlugin()
useTool()
```

That's the whole mental model.

---

## Example: Company Research Agent

Input:

```
stripe.com
```

Workflow:

```
1. research company
2. analyze product
3. summarize business model
4. generate report
```

Output:

```
Company: Stripe

Industry: Fintech
Core Product: Online payment infrastructure

Key offerings:
- Payment processing
- Billing
- Marketplace infrastructure

Summary:
Stripe provides developer-first financial infrastructure for internet businesses.
```

This entire workflow can be created and run with Aquarium.

---

## Why Aquarium?

Shrimsource focuses on developer experience.

- **Tiny core**  
  No framework monster.

- **Fast start**  
  Create a working agent with one command.

- **Template-first**  
  Download real working workflows instantly.

- **Extensible**  
  Add tools and plugins easily.

- **Open ecosystem**  
  Built for future developer ecosystems.

---

## Repositories

Aquarium Source is organized into multiple repositories.

```
aquarium-core
→ tiny runtime for agent workflows

aquarium-templates
→ ready-to-run agent templates

awesome-aquarium
→ curated ecosystem resources
```

---

## Developer Path

Typical developer workflow:

```
1. Pick a template
2. Create your agent project
3. Run it instantly
4. Modify the workflow
5. Build your own agent
```

Aquarium aims to reduce the time from idea to working agent to minutes.

---

## Philosophy

Shrimsource is intentionally minimal.

Instead of building a huge framework, Aquarium focuses on:

- a tiny runtime
- simple workflows
- instant templates
- fast experimentation

The ecosystem can grow later through templates, tools, and plugins.

---

## Status

Shrimsource is in early development.

The project focuses on:

- core runtime stability
- developer experience
- template ecosystem

Contributions and feedback are welcome.

---

## License

MIT License