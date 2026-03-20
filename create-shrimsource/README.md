# create-shrimsource

The official scaffolding tool to quickly generate and bootstrap AI Agent projects using the Shrimsource framework.

## 🚀 Quick Start

You can instantly create a new Shrimsource AI Agent project by running:

```bash
npx create-shrimsource@latest
```

This will launch an **interactive CLI menu** where you can browse available templates (using your up/down arrow keys). Once you select a template, the CLI will automatically download the code, install dependencies, and configure the necessary Large Language Model (LLM) API keys for you.

## 📦 Available Commands

### 1. Interactive Creation (Recommended)
```bash
npx create-shrimsource
```
**What it does:** Launches the interactive menu to let you visually select which Agent template you want to start with.

### 2. Direct Template Initialization
```bash
npx create-shrimsource <template-name>
# Example: npx create-shrimsource research-agent
```
**What it does:** If you already know the exact template name you want, this command skips the menu selection and immediately downloads and bootstraps that specific template.

### 3. Browse Template Directory
```bash
npx create-shrimsource list
```
**What it does:** Displays a beautifully formatted list of all currently available official Agent templates, including their descriptions and required capabilities (e.g., `llm`, `search`). You can press `Enter` on any item in the list to immediately initialize it.

### 4. Reconfigure Environment Variables
```bash
npx create-shrimsource env setup
```
**What it does:** Use this command *inside an existing Agent project folder* if you need to update your API Keys (e.g., your OpenAI key expired) or if you want to switch your LLM provider (e.g., switching from OpenAI to OpenRouter). It safely overwrites your `.env` file without breaking your source code.

### 5. Help
```bash
npx create-shrimsource help
# OR
npx create-shrimsource -h
```
**What it does:** Prints a concise list of all available commands and basic usage instructions.

---

## 🛠️ Advanced: Local Development

If you are developing your own custom templates and want to test how the CLI pulls them *before* pushing them to GitHub, `create-shrimsource` natively supports local filesystem resolution.

**1. Create a local `registry.json` file on your machine:**
```json
[
  {
    "name": "my-local-agent",
    "description": "My secret local agent in development",
    "source": { "type": "file", "dir": "/absolute/path/to/my-local-agent" },
    "capabilities": ["llm"]
  }
]
```

**2. Point the CLI to your local registry using the environment variable:**
```bash
# Mac / Linux
SHRIM_LOCAL_REGISTRY="/absolute/path/to/registry.json" npx create-shrimsource list

# Windows (PowerShell)
$env:SHRIM_LOCAL_REGISTRY="C:\absolute\path\to\registry.json" ; npx create-shrimsource list
```

The CLI will now display your local templates alongside the label `[Local]`, allowing you to seamlessly test the entire `npx` extraction and initialization pipeline without touching the public repository.
