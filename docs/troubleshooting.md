# Troubleshooting & FAQ ❓

Common issues and how to resolve them.

## 1. LLM Connectivity Issues

### `Error: API key not found`
Ensure your `.env` file contains `LLM_API_KEY`. If you are running via the template scripts, ensure you use `tsx --env-file=.env`.

### `401 Unauthorized`
Check if your API key is valid. If using OpenRouter, verify your account balance.

---

## 2. Search Issues

### `Error: Tavily API key not found`
The `search()` helper requires `SHRIM_SEARCH_KEY` to be set in your environment.

### `Search returns no results`
- Check if your query is too specific.
- Verify your Tavily usage limits.

---

## 3. Filesystem Issues

### `Error: Invalid storage key`
You are likely trying to access a file outside of the `baseDir` configured in `LocalFileStorage`. Avoid using `..` in your keys.

### `ENOENT: no such file or directory`
The `storage_download` tool expects the file to already exist. Use `storage_upload` first.

---

## FAQ

**Q: Can I use local models (Ollama)?**
A: Yes! Set `LLM_BASE_URL=http://localhost:11434/v1` and set `LLM_MODEL` to your local model name (e.g., `llama3`).

**Q: Does Shrimsource support Python?**
A: Currently, Shrimsource is a TypeScript/JavaScript framework.

**Q: Is it production-ready?**
A: We are currently in `v0.1.x`. While the core runtime is stable, expect API refinements as we head toward `v1.0.0`.
