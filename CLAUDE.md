# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PatternBase is a multi-framework React component library for AI user interfaces, based on [shapeof.ai](https://www.shapeof.ai) UX patterns. It's a Turborepo monorepo with pnpm workspaces.

The core philosophy: these packages compose AI UX patterns **on top of existing UI libraries** (React Bootstrap, Ant Design, Mantine). Users install their preferred UI library and use these packages for the AI-specific pattern components and shared hooks/types. The `@patternbase/*` packages are published (root `publishConfig.access: public`); the private shared configs use the same prefix.

## Commands

```bash
pnpm install                          # Install all dependencies
pnpm build                            # Build all packages (Turborepo cached)
pnpm dev                              # Dev mode for all packages
pnpm dev --filter=@patternbase/core         # Dev a specific package
pnpm dev --filter=@patternbase/docs         # Run docs site (Next.js)
pnpm type-check                       # TypeScript validation across all packages
pnpm lint                             # ESLint across all packages
pnpm lint:fix                         # ESLint with auto-fix
pnpm format                           # Prettier format all files
pnpm format:check                     # Prettier check formatting
pnpm clean                            # Remove all dist folders
pnpm test                             # Run tests across all packages (Vitest)
pnpm test --filter=@patternbase/core        # Run tests for a specific package
pnpm test --filter=@patternbase/core -- --watch  # Watch mode for tests in a package
# Run a single test file:
cd packages/core && npx vitest run src/utils/confidence.test.ts
# Run tests matching a name pattern:
cd packages/core && npx vitest run -t "debounce"

# Docs site specific:
cd apps/docs && pnpm generate-snippets    # Regenerate code snippets from component source
```

## Architecture

**Monorepo structure (pnpm workspaces + Turborepo):**

- `packages/core` (`@patternbase/core`) — Framework-agnostic types, hooks, and utilities. All component prop interfaces live here.
- `packages/antd` (`@patternbase/antd`) — Ant Design implementations of each pattern component. Depends on `@patternbase/core`.
- `packages/bootstrap` (`@patternbase/bootstrap`) — React Bootstrap implementations. Depends on `@patternbase/core`.
- `packages/mantine` (`@patternbase/mantine`) — Mantine implementations of each pattern component. Depends on `@patternbase/core`.
- `packages/shadcn` (`@patternbase/shadcn`) — shadcn/ui implementations (Tailwind v4, vendored Radix primitives in `src/components/ui/`, theme in `src/styles.css`). Radix + icons bundled by tsup. Depends on `@patternbase/core`.
- `packages/eslint-config` (`@patternbase/eslint-config`) — Shared ESLint configs (library, React, Next.js variants)
- `packages/vitest-config` (`@patternbase/vitest-config`) — Shared Vitest configuration and test setup
- `apps/docs` (`@patternbase/docs`) — Next.js 16 documentation site with interactive previews. Uses Mantine UI. Depends on all five packages.

**Core package layers:**
- `types/` — Shared interfaces (`patterns.ts`, `components.ts`, `common.ts`) used by both framework packages
- `hooks/` — Reusable React hooks: `useAIGeneration`, `useStreamingResponse`, `usePromptHistory`, `useGenerationState`
- `utils/` — Pure utility functions: `debounce`, `confidence`, `formatPrompt`, `truncateText`

**Component pattern:** Each component lives in `/src/components/[name]/` with a `.tsx` implementation and `index.ts` barrel export. Both framework packages implement the same patterns with identical prop interfaces but different UI libraries. Components must use the underlying UI library's primitives (e.g. `react-bootstrap` Card, Button, Form; `antd` Card, Button, Input) — never raw HTML replacements.

**54 AI UX Patterns** across 5 categories — all fully implemented in all four framework packages (`@patternbase/antd`, `@patternbase/bootstrap`, `@patternbase/mantine`, `@patternbase/shadcn`):

| Category | Count | Patterns |
|---|---|---|
| Prompt Actions | 13 | open-input, regenerate, expand, transform, inline-action, chained-action, auto-fill, summary, describe, inpainting, madlibs, restructure, restyle |
| Wayfinders | 8 | suggestions, follow-up, templates, gallery, initial-cta, nudges, prompt-details, randomize |
| Tuners | 10 | parameter-control, model-management, attachments, filters, connectors, modes, preset-styles, prompt-enhancer, saved-styles, voice-and-tone |
| Governors | 14 | stream-of-thought, citation, variations, cost-estimate, action-plan, synthesis, branches, controls, draft-mode, memory, references, sample-response, shared-vision, verification |
| Trust Builders | 9 | disclosure, caveat, consent, data-ownership, footprints, incognito-mode, watermark, avatar, color |

**Docs site pattern preview system (`apps/docs`):**

The docs site renders live, interactive previews for each pattern. The data flow for a pattern detail page (e.g. `/patterns/prompt-actions/open-input`) is:

1. `src/data/patterns.ts` — Defines the `patterns` and `categories` arrays with metadata (id, slug, name, description, tags, category). Exports lookup helpers: `getPatternBySlug()`, `getCategoryById()`, `getPatternsByCategory()`.
2. `src/app/patterns/[category]/[pattern]/page.tsx` — Next.js dynamic route. Uses `generateStaticParams()` to pre-generate all routes at build time. Looks up pattern and category from URL params, renders metadata and passes `pattern.id` to `<ComponentPreview />`.
3. `src/data/demo-data.ts` — Shared demo constants (`demoSuggestions`, `demoParameters`, `demoSteps`, `demoCitations`, `demoVariations`, `demoCostBreakdown`, `demoModels`) used by the component registry.
4. `src/lib/registry.tsx` — The **component registry**. A `Record<string, RegistryEntry>` keyed by pattern ID. Each entry has four component factories (`bootstrap`, `antd`, `mantine`, and `shadcn`) that render the actual `@patternbase/bootstrap`, `@patternbase/antd`, `@patternbase/mantine`, and `@patternbase/shadcn` components with demo data imported from `demo-data.ts`.
5. `src/data/snippet-templates.ts` — Auto-generated file containing full component implementations for all four frameworks. Generated by `scripts/generate-snippets.ts` which reads actual source files from `packages/*/src/components/`. Run `pnpm generate-snippets` to regenerate. File is gitignored.
6. `src/components/preview/component-preview.tsx` — Looks up both `componentRegistry[patternId]` and `codeSnippets[patternId]`, renders a tabbed UI (Preview / Code) with a framework toggle. Also displays the framework-appropriate install command (e.g. `pnpm add react-bootstrap bootstrap`, `pnpm add antd @ant-design/icons`, `pnpm add @mantine/core`, or `pnpm add @patternbase/shadcn`).
7. `src/components/preview/framework-tabs.tsx` — Manages the Bootstrap / Ant Design / Mantine / shadcn/ui toggle: `FrameworkTabs` is a render-prop wrapper and `FrameworkToggle` renders the `SegmentedControl` with the four framework options.
8. `src/data/props-data.ts` — `propsData: Record<string, PropDefinition[]>` keyed by pattern ID, rendered as a props table on the pattern page by `src/components/preview/props-table.tsx`.

To add a new pattern, touch exactly these files:
1. `packages/core/src/types/patterns.ts` — add prop interfaces
2. `packages/core/src/index.ts` — re-export the new interfaces
3. `packages/antd/src/components/<name>/` — antd implementation + `index.ts`
4. `packages/bootstrap/src/components/<name>/` — bootstrap implementation + `index.ts`
5. `packages/mantine/src/components/<name>/` — mantine implementation + `index.ts`
6. Re-export from `packages/antd/src/index.ts`, `packages/bootstrap/src/index.ts`, and `packages/mantine/src/index.ts`
7. `apps/docs/src/data/patterns.ts` — add `PatternMeta`
8. `apps/docs/src/data/demo-data.ts` — add demo constants
9. `apps/docs/src/lib/registry.tsx` — register all three framework components
10. Run `pnpm generate-snippets` inside `apps/docs` to regenerate code snippets from component source files
11. `apps/docs/src/data/pattern-explanations.ts` — add `PatternExplanation` (overview, variants, useCases, bestPractices, relatedPatterns)
12. `apps/docs/src/data/props-data.ts` — add prop table definition

## Build & Config

- **tsup** builds each package to both CJS and ESM with `.d.ts` declarations
- **TypeScript** strict mode via `tsconfig.base.json` (target ES2020, module ESNext, bundler resolution)
- React and framework deps are externalized (peer dependencies)
- Turborepo caches build/lint/type-check outputs; `dev` depends on `^build` (core builds first) and is persistent/uncached
- Next.js 16.3.1 config uses `transpilePackages` for the four framework packages
- Docs site uses **Mantine UI** (v7) with `postcss-preset-mantine` and `postcss-simple-vars`. The docs app has no `type-check` script; run `npx tsc --noEmit` from `apps/docs` directly.
- **Vitest** for unit testing with `@testing-library/react` in component packages
- **commitlint** enforces conventional commits (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert); **husky** + **lint-staged** run linting on pre-commit

## Conventions

- Named exports only (no default exports in barrel files)
- All component props are typed via interfaces from `@patternbase/core`
- Framework packages must maintain prop interface parity — same props, different UI
- Strict TypeScript: no unused variables/parameters, strict null checks
