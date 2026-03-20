# Contributing to Shrimsource 🤝

We love contributions! Whether you're fixing a bug, adding a new agent template, or improving the documentation, here's how to get involved.

## Monorepo Workflow

Shrimsource is a monorepo managed with **npm workspaces**.

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/ShrimSource/shrimsource.git
   cd shrimsource
   npm install  # Installs all deps for all packages
   ```

2. **Development**:
   - `shrimsource-core`: Core logic. Run `npm run build` in this folder to generate types.
   - `shrimsource-templates`: Agent templates. Add your new agent folder here.
   - `create-shrimsource`: CLI tool.

3. **Running Tests**:
   ```bash
   npm test  # Runs all tests across the monorepo
   ```

---

## Adding a New Agent Template

1. **Create Directory**: Add a new folder in `shrimsource-templates/`.
2. **Follow Pattern**: Copy the structure of `blank-agent`.
3. **Register**: Add your agent's metadata to `shrimsource-templates/registry.json`.
4. **Test**: Ensure your agent is discoverable by running the CLI locally:
   ```bash
   cd create-shrimsource
   npm start list
   ```

## Documentation

- Use the `docs/` folder for long-form guides.
- Keep `awesome-shrimsource/README.md` updated with new templates and tools.

## Pull Request Guidelines

- Keep PRs focused. One feature or fix per PR.
- Include unit tests for core logical changes.
- Ensure all tests pass.
