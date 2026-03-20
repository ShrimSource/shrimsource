# Getting Started 🚀

Get Shrimsource up and running in minutes.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **API Keys**: 
  - **LLM**: An OpenRouter or OpenAI API key.
  - **Search**: A Tavily API key (optional, only if using search tools).

## 1. Scaffold a New Agent

The easiest way to start is by using our CLI tool:

```bash
npx create-shrimsource
```

This interactive tool will:
1. Ask you to choose a template (e.g., `research-agent`, `blank-agent`).
2. Download the template files to a new directory.
3. Automatically create a `.env` file based on your choices.

## 2. Configuration (`.env`)

Every agent project includes a `.env` file. Fill in your API keys:

```bash
# LLM
LLM_API_KEY=your_key_here
LLM_BASE_URL=https://openrouter.ai/api/v1  # Optional: defaults to OpenRouter
LLM_MODEL=openai/gpt-4o-mini               # Optional: defaults to gpt-4o-mini

# Search (optional)
SHRIM_SEARCH_KEY=your_tavily_key_here
```

## 3. Installation & Execution

Go into your agent directory and run:

```bash
npm install
npm run agent
```

By default, this will run the `index.ts` file using `tsx` with the `--env-file=.env` flag, automatically loading your configuration.

## 4. Example Output

If you ran the `research-agent`, you should see something like this:

```text
Enter your input (company name): OpenAI
  → searchCompany
  ✓ searchCompany
  → scrapeWebsite
  ✓ scrapeWebsite
  → summarizeProduct
  ✓ summarizeProduct
  → generateReport
  ✓ generateReport

=== Result ===
Comprehensive Analysis for OpenAI...
[Market Position, Competitors, Core Products...]
```

## Next Steps

Now that you've run your first agent, learn how it works by exploring the [Core API](core-api.md).
