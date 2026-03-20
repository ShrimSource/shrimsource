# Official Agent Templates 🦐

Shrimsource comes with 17 reference templates optimized for various AI tasks. All templates are written in TypeScript and can be scaffolded using `npx create-shrimsource`.

## Template Categories

### 1. Business & Marketing
- **`cold-email-agent`**: Generates personalized B2B outreach based on company context.
- **`sales-agent`**: High-performance growth outreach synthesis.
- **`landing-page-agent`**: Drafts headlines, features, and CTA copy for landing pages.
- **`newsletter-agent`**: Curates weekly news and formats professional emails.
- **`social-media-agent`**: Transforms blogs into a week of X and LinkedIn posts.
- **`content-agent`**: Synthesizes full-length articles from single prompts.

### 2. Research & Analysis
- **`research-agent`**: Full company background reports (SEO, competitors, product).
- **`competitor-agent`**: Focused feature-by-feature competitor analysis.
- **`market-map-agent`**: Maps landscapes, categories, and investment tiers.
- **`pitch-deck-agent`**: Generates a compelling 10-slide outline for startup founders.
- **`startup-idea-agent`**: Validates, brainstorms, and roasts startup concepts.

### 3. Engineering & Utilities
- **`code-review-agent`**: Analyzes code snippets for bugs, security, and style.
- **`seo-agent`**: Keyword research and content outline generation.
- **`support-agent`**: Intelligent ticket classification, routing, and response drafting.
- **`saas-roast-agent`**: Brutally honest teardowns of your landing page.
- **`resume-reviewer-agent`**: Job-specific resume analysis and roasting.

### 4. Developer Tools
- **`blank-agent`**: The ultimate starter template. Pre-configured with Vitest unit tests and a clear scaffold for custom agent logic.

## Common Structure

Every template follows this standard structure:
- **`agent.ts`**: Tool definitions and agent configuration.
- **`workflow.ts`**: Step dependency graph orchestration.
- **`index.ts`**: Entry point (user input CLI).
- **`package.json`**: Standard scripts (`npm run agent`, `npm test`).
