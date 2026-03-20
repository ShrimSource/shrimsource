# Shrimsource Templates

Official agent templates for **Shrimsource**.

These templates help you create useful AI agents in seconds using the Shrimsource runtime. Each template is a small, practical agent script designed to solve a real-world task.

---

## 🚀 Quick Start

Create an agent project instantly. **Run agents with one command:**

```bash
npx create-shrimsource research-agent
# cd research-agent
# npm install
# npm run agent
```

You will see the agent execute its workflow and generate results immediately.

---

## 📦 Available Templates

We currently offer **11 Golden Templates** categorized by use case. 

### 💡 General Utilities

**`research-agent`**
Generate company or topic research reports including competitors and market positioning.
- **Input:** `stripe.com`
- **Output:** Company overview, Product Analysis, Competitors.
- **Run:** `npx create-shrimsource research-agent`

**`content-agent`**
Generate structured content from a topic.
- **Input:** `AI coding tools`
- **Output:** Article outline, Draft content.
- **Run:** `npx create-shrimsource content-agent`

### 💼 Business & Market Analysis

**`competitor-agent`**
Analyze competitors and market landscape.
- **Input:** `AI coding assistants`
- **Output:** Top competitors, Feature comparison.
- **Run:** `npx create-shrimsource competitor-agent`

**`market-map-agent`**
Generate a market map for a specific domain, listing top companies by tier.
- **Input:** `AI coding tools`
- **Output:** Market Map (Tier 1, Tier 2 companies).
- **Run:** `npx create-shrimsource market-map-agent`

### 🚀 Startup & Product Tools

**`startup-idea-agent`**
Input a domain to output 5 startup ideas with precise market analysis.
- **Input:** `AI tools`
- **Output:** 5 Startup ideas with Target customers and Market size.
- **Run:** `npx create-shrimsource startup-idea-agent`

**`saas-roast-agent`**
Analyze a product URL, roast its weaknesses, and give actionable growth ideas.
- **Input:** `notion.so`
- **Output:** Strengths, Weaknesses, Growth Ideas.
- **Run:** `npx create-shrimsource saas-roast-agent`

### 📈 Marketing & Growth

**`landing-page-agent`**
Generate high-converting landing page copy for a product idea.
- **Input:** `AI code reviewer`
- **Output:** Headline, Subheadline, Features, CTA.
- **Run:** `npx create-shrimsource landing-page-agent`

**`seo-agent`**
Analyze keywords and generate SEO-optimized content.
- **Input:** `AI startup tools`
- **Output:** SEO article title, Content outline.
- **Run:** `npx create-shrimsource seo-agent`

### 💌 Sales & Outreach

**`sales-agent`**
Generate sales outreach emails and pitches.
- **Input:** `Company: Shopify, Product: analytics dashboard`
- **Output:** Sales pitch and value proposition.
- **Run:** `npx create-shrimsource sales-agent`

**`cold-email-agent`**
Input a target company and product to generate a highly personalized cold email based on recent context.
- **Input:** `Company: Shopify, Product: analytics dashboard`
- **Output:** Catchy Subject, Personalized Cold Email.
- **Run:** `npx create-shrimsource cold-email-agent`

### 🎧 Customer Success

**`support-agent`**
Generate automated customer support responses and FAQ answers.
- **Input:** `How do I reset my password?`
- **Output:** Support response and troubleshooting steps.
- **Run:** `npx create-shrimsource support-agent`

---

## ⚙️ How Templates Work

Each template is a minimal agent project containing:
- `agent.ts`: Agent script and tool definitions (typically under 100 lines)
- `workflow.ts`: Workflow layout and dependencies
- `config.json` & `package.json`: Minimal configuration

The template will automatically prompt you to configure any required API keys (such as LLM or search providers).

### Requirements

Most templates require an `.env` file configured with:
- **LLM Provider** (e.g. `SHRIM_LLM_PROVIDER=openai`, `SHRIM_LLM_KEY=sk-...`)
- **Search Provider** (e.g. `SHRIM_SEARCH_PROVIDER=tavily`, `SHRIM_SEARCH_KEY=tvly-...`)

---

## 🤝 Contributing

We welcome community templates! To contribute:

1. Fork this repository
2. Add a new template folder following the standard structure
3. Make sure `agent.ts` is simple and focused
4. Update `registry.json` and this `README.md`
5. Open a pull request

---

## 🔗 Related Projects
- [Shrimsource Runtime](https://github.com/ShrimSource/shrimsource-core)
- [create-shrimsource CLI](https://github.com/ShrimSource/create-shrimsource)
- [awesome-shrimsource](https://github.com/ShrimSource/awesome-shrimsource)

---

**License:** MIT
