# PatternBase

A multi-framework React component library for AI user experience patterns.

## Overview

PatternBase provides 54 ready-to-use AI UX pattern components (based on [shapeof.ai](https://www.shapeof.ai) patterns), implemented in **Bootstrap**, **Ant Design**, and **Mantine**, sharing a common set of types and hooks from a framework-agnostic core package.

### AI UX Patterns

All 54 patterns are grouped into 5 categories:

| Category       | Count | Patterns                                                                                                                                                                         |
| -------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt Actions | 13    | open-input, regenerate, expand, transform, inline-action, chained-action, auto-fill, summary, describe, inpainting, madlibs, restructure, restyle                                |
| Wayfinders     | 8     | suggestions, follow-up, templates, gallery, initial-cta, nudges, prompt-details, randomize                                                                                       |
| Tuners         | 10    | parameter-control, model-management, attachments, filters, connectors, modes, preset-styles, prompt-enhancer, saved-styles, voice-and-tone                                       |
| Governors      | 14    | stream-of-thought, citation, variations, cost-estimate, action-plan, synthesis, branches, controls, draft-mode, memory, references, sample-response, shared-vision, verification |
| Trust Builders | 9     | disclosure, caveat, consent, data-ownership, footprints, incognito-mode, watermark, avatar, color                                                                                |

## Monorepo Structure

```
packages/
  core/           @patternbase/core        — Types, hooks, utilities (framework-agnostic)
  antd/           @patternbase/antd        — Ant Design implementations
  bootstrap/      @patternbase/bootstrap   — React Bootstrap implementations
  mantine/        @patternbase/mantine     — Mantine implementations
  eslint-config/  @patternbase/eslint-config — Shared ESLint configs
  vitest-config/  @patternbase/vitest-config — Shared Vitest configuration
apps/
  docs/           @patternbase/docs        — Next.js documentation site with live previews
```

## Getting Started

```bash
pnpm install        # Install all dependencies
pnpm build          # Build all packages
pnpm dev            # Dev mode for all packages
```

### Run the docs site

```bash
pnpm dev --filter=@patternbase/docs
```

Then open [http://localhost:3000](http://localhost:3000).

## Usage

```tsx
// Bootstrap
import { OpenInput, Suggestions } from "@patternbase/bootstrap";

// Ant Design
import { OpenInput, Suggestions } from "@patternbase/antd";

// Mantine
import { OpenInput, Suggestions } from "@patternbase/mantine";

// Core hooks (framework-agnostic)
import { useAIGeneration, useStreamingResponse } from "@patternbase/core";
```

All three framework packages expose identical prop interfaces — swap between Bootstrap, Ant Design, and Mantine without changing component props.

## Docs Site Architecture

The documentation site (`apps/docs`) is a Next.js 16 app using Mantine UI. It provides live, interactive previews of every pattern in all three frameworks.

### How pattern previews work

Each pattern detail page (e.g. `/patterns/prompt-actions/open-input`) is assembled from these data sources:

1. **Pattern metadata** (`src/data/patterns.ts`) — Arrays of patterns and categories with IDs, slugs, names, descriptions, and tags. Lookup helpers (`getPatternBySlug`, `getCategoryById`) resolve URL params to data.

2. **Component registry** (`src/lib/registry.tsx`) — A map from pattern ID to component factories. Each entry has a `bootstrap`, `antd`, and `mantine` function that renders the actual library component with demo data:

   ```ts
   'open-input': {
     bootstrap: () => <BsOpenInput placeholder="Ask anything..." />,
     antd: () => <AntOpenInput placeholder="Ask anything..." />,
     mantine: () => <MnOpenInput placeholder="Ask anything..." />,
   }
   ```

3. **Snippet templates** (`src/data/snippet-templates.ts`) — Template functions keyed by pattern ID that return framework-specific usage examples shown in the Code tab.

The `ComponentPreview` component ties these together with a tabbed UI (Preview / Code) and a framework toggle (Bootstrap / Ant Design / Mantine).

### Adding a new pattern to the docs

1. Add pattern metadata to `src/data/patterns.ts`
2. Add demo data to `src/data/demo-data.ts` if needed
3. Register all three framework components with demo data in `src/lib/registry.tsx`
4. Add snippet templates for all three frameworks in `src/data/snippet-templates.ts`
5. Add a prop table to `src/data/props-data.ts`

## Scripts

```bash
pnpm build                            # Build all packages
pnpm dev                              # Dev mode for all packages
pnpm dev --filter=@patternbase/docs         # Run docs site
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
- **Docs:** Next.js 16, Mantine UI (v7)
- **Linting:** ESLint, commitlint (conventional commits), husky + lint-staged

## License

MIT
