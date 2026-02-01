# AI Vory

A multi-framework React component library for AI user experience patterns, based on [shapeof.ai](https://www.shapeof.ai) UX patterns.

## Overview

AI Vory provides 10 ready-to-use AI UX pattern components implemented in both **Bootstrap** and **Ant Design**, sharing a common set of types and hooks from a framework-agnostic core package.

### AI UX Patterns

| Pattern          | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| OpenInput        | Free-form text input for AI prompts                                |
| Suggestions      | Suggested prompts and follow-ups                                   |
| ParameterControl | Sliders and controls for AI parameters (temperature, tokens, etc.) |
| StreamOfThought  | Step-by-step display of AI reasoning                               |
| Citation         | Source attribution for AI-generated content                        |
| Regenerate       | Controls for regenerating AI responses                             |
| Disclosure       | AI transparency and confidence indicators                          |
| Variations       | Multiple output variations from a single prompt                    |
| CostEstimate     | Token and cost estimation display                                  |
| ModelManagement  | Model selection and configuration                                  |

## Monorepo Structure

```
packages/
  core/           @ai-ui/core        — Types, hooks, utilities (framework-agnostic)
  antd/           @ai-ui/antd        — Ant Design implementations
  bootstrap/      @ai-ui/bootstrap   — React Bootstrap implementations
  eslint-config/  @ai-ui/eslint-config — Shared ESLint configs
  vitest-config/  @ai-ui/vitest-config — Shared Vitest configuration
apps/
  docs/           @ai-ui/docs        — Next.js documentation site with live previews
```

## Getting Started

```bash
pnpm install        # Install all dependencies
pnpm build          # Build all packages
pnpm dev            # Dev mode for all packages
```

### Run the docs site

```bash
pnpm dev --filter=@ai-ui/docs
```

Then open [http://localhost:3000](http://localhost:3000).

## Usage

```tsx
// Bootstrap
import { OpenInput, Suggestions } from "@ai-ui/bootstrap";

// Ant Design
import { OpenInput, Suggestions } from "@ai-ui/antd";

// Core hooks (framework-agnostic)
import { useAIGeneration, useStreamingResponse } from "@ai-ui/core";
```

Both framework packages expose identical prop interfaces — swap between Bootstrap and Ant Design without changing component props.

## Docs Site Architecture

The documentation site (`apps/docs`) is a Next.js 14 app using Mantine UI. It provides live, interactive previews of every pattern in both frameworks.

### How pattern previews work

Each pattern detail page (e.g. `/patterns/prompt-actions/open-input`) is assembled from three data sources:

1. **Pattern metadata** (`src/data/patterns.ts`) — Arrays of patterns and categories with IDs, slugs, names, descriptions, and tags. Lookup helpers (`getPatternBySlug`, `getCategoryById`) resolve URL params to data.

2. **Component registry** (`src/lib/registry.tsx`) — A map from pattern ID to component factories. Each entry has a `bootstrap` and `antd` function that renders the actual library component with demo data:

   ```ts
   'open-input': {
     bootstrap: () => <BsOpenInput placeholder="Ask anything..." />,
     antd: () => <AntOpenInput placeholder="Ask anything..." />,
   }
   ```

3. **Code snippets** (`src/data/code-snippets.ts`) — A map from pattern ID to framework-specific usage examples shown in the Code tab.

The `ComponentPreview` component ties these together with a tabbed UI (Preview / Code) and a framework toggle (Bootstrap / Ant Design).

### Adding a new pattern to the docs

1. Add pattern metadata to `src/data/patterns.ts`
2. Register both framework components with demo data in `src/lib/registry.tsx`
3. Add code snippets for both frameworks in `src/data/code-snippets.ts`

## Scripts

```bash
pnpm build                            # Build all packages
pnpm dev                              # Dev mode for all packages
pnpm dev --filter=@ai-ui/docs         # Run docs site
pnpm type-check                       # TypeScript validation
pnpm lint                             # ESLint
pnpm test                             # Run tests (Vitest)
pnpm clean                            # Remove all dist folders
```

## Tech Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **Build:** tsup (CJS + ESM + .d.ts)
- **TypeScript:** Strict mode, ES2020 target
- **Testing:** Vitest + @testing-library/react
- **Docs:** Next.js 14, Mantine UI
- **Linting:** ESLint, commitlint (conventional commits), husky + lint-staged

## License

MIT
