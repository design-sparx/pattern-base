# Agent Guidelines

PatternBase is a pnpm + Turborepo monorepo: 54 AI-UX pattern components (shapeof.ai patterns), each implemented with identical prop interfaces in four UI libraries (React Bootstrap, Ant Design, Mantine, shadcn/ui), plus a Next.js docs site. The `@patternbase/*` packages are published (root `publishConfig.access: public`); the private shared configs use the same prefix.

Canonical repo: `https://github.com/kelvink96/pattern-base` (was `kelvink96/ai-vory`; that URL redirects, and `origin` points at the new location).

## Layout

- `packages/core` (`@patternbase/core`) — framework-agnostic types, hooks, utils. All shared prop interfaces live in `src/types/patterns.ts`. No UI, no framework imports.
- `packages/{antd,bootstrap,mantine,shadcn}` — same 54 patterns in each; must only use the host library's primitives (antd, react-bootstrap, @mantine/*, shadcn/ui) and keep prop parity with `core` and each other.
- `packages/shadcn` (`@patternbase/shadcn`) — shadcn/ui implementations. Primitives vendored in `src/components/ui/`, Tailwind v4 theme in `src/styles.css`, Radix + icons bundled by tsup.
- `packages/{eslint-config,vitest-config}` — private shared configs used by every package.
- `apps/docs` (`@patternbase/docs`) — Next.js 16.3.1 + Mantine UI docs site with live previews for all four frameworks.

## Commands (run from repo root)

- `pnpm build` / `pnpm clean` — turbo-cached.
- `pnpm dev` — persistent turbo task that builds `^build` deps first; scope with `--filter` (e.g. `pnpm dev --filter=@patternbase/docs` runs just the docs site).
- `pnpm lint` / `pnpm lint:fix` / `pnpm type-check` / `pnpm test` / `pnpm format` / `pnpm format:check`.
- One package: `pnpm test --filter=@patternbase/core -- --watch`.
- One test file, from inside that package: `pnpm exec vitest run src/utils/confidence.test.ts`.
- Docs snippets: `cd apps/docs && pnpm generate-snippets`.

## Architecture

**Core package layers:**
- `types/` — shared interfaces (`patterns.ts`, `components.ts`, `common.ts`) used by all framework packages
- `hooks/` — `useAIGeneration`, `useStreamingResponse`, `usePromptHistory`, `useGenerationState`
- `utils/` — `debounce`, `confidence`, `formatPrompt`, `truncateText`

**Component pattern:** each component lives in `/src/components/[name]/` with a `.tsx` implementation and `index.ts` barrel export. All four framework packages implement the same patterns with identical prop interfaces but different UI libraries. Components must use the host UI library's primitives (e.g. `react-bootstrap` Card, Button, Form; `antd` Card, Button, Input; Mantine components; shadcn/ui) — never raw HTML replacements.

**54 AI UX Patterns** across 5 categories — fully implemented in all four framework packages (`@patternbase/antd`, `@patternbase/bootstrap`, `@patternbase/mantine`, `@patternbase/shadcn`):

| Category | Count | Patterns |
|---|---|---|
| Prompt Actions | 13 | open-input, regenerate, expand, transform, inline-action, chained-action, auto-fill, summary, describe, inpainting, madlibs, restructure, restyle |
| Wayfinders | 8 | suggestions, follow-up, templates, gallery, initial-cta, nudges, prompt-details, randomize |
| Tuners | 10 | parameter-control, model-management, attachments, filters, connectors, modes, preset-styles, prompt-enhancer, saved-styles, voice-and-tone |
| Governors | 14 | stream-of-thought, citation, variations, cost-estimate, action-plan, synthesis, branches, controls, draft-mode, memory, references, sample-response, shared-vision, verification |
| Trust Builders | 9 | disclosure, caveat, consent, data-ownership, footprints, incognito-mode, watermark, avatar, color |

**Docs site pattern preview system (`apps/docs`):** each pattern page (`/patterns/<category>/<pattern>`) renders live, interactive previews. Data flow:

1. `src/data/patterns.ts` — metadata (`PatternMeta`) + lookup helpers (`getPatternBySlug()`, `getCategoryById()`, `getPatternsByCategory()`).
2. `src/app/patterns/[category]/[pattern]/page.tsx` — dynamic route, `generateStaticParams()`, renders `<ComponentPreview />`.
3. `src/data/demo-data.ts` — shared demo constants (`demoSuggestions`, `demoParameters`, `demoSteps`, `demoCitations`, `demoVariations`, `demoCostBreakdown`, `demoModels`).
4. `src/lib/registry.tsx` — `Record<string, RegistryEntry>` keyed by pattern ID; each entry has four component factories (`bootstrap`, `antd`, `mantine`, `shadcn`) rendering the real components with demo data.
5. `src/data/snippet-templates.ts` — auto-generated full implementations for all four frameworks from `scripts/generate-snippets.ts`; regenerate with `pnpm generate-snippets`.
6. `src/components/preview/component-preview.tsx` — tabbed Preview / Code UI with a framework toggle and framework-appropriate install command (e.g. `pnpm add react-bootstrap bootstrap`, `pnpm add antd @ant-design/icons`, `pnpm add @mantine/core`, `pnpm add @patternbase/shadcn tailwindcss`).
7. `src/components/preview/framework-tabs.tsx` — the four-way framework toggle (`FrameworkTabs` render-prop wrapper + `FrameworkToggle` segmented control).
8. `src/data/props-data.ts` — props tables rendered by `src/components/preview/props-table.tsx`.

## Gotchas

- `apps/docs` now has `type-check` (`tsc --noEmit`) and `test` (`vitest run`) scripts, so root `pnpm type-check`/`pnpm test` cover it.
- Framework deps (react, antd, react-bootstrap, @mantine/*) are peerDependencies externalized by tsup. shadcn/ui's Radix and icon deps are bundled by tsup; only `tailwindcss` is an external peer. Never import any framework deps into `@patternbase/core`.
- Docs resolves workspace packages from their `dist` via `next.config.mjs` `transpilePackages`, so run `pnpm build` before working against them in docs.
- Tests live in `packages/core`, `packages/shadcn`, and `apps/docs` (vitest + jsdom). `packages/{antd,bootstrap,mantine}` currently have none.
- Snippets are auto-generated from actual component source files. Run `pnpm generate-snippets` inside `apps/docs` to regenerate. The generated file (`apps/docs/src/data/snippet-templates.ts`) is tracked and committed.

## Build & Config

- tsup builds each package to both CJS and ESM with `.d.ts` declarations.
- TypeScript strict mode via `tsconfig.base.json` (target ES2020, module ESNext, bundler resolution).
- React and framework deps are externalized (peers); Turborepo caches build/lint/type-check; `dev` depends on `^build` and is persistent/uncached.
- `next.config.mjs` uses `transpilePackages` for the four framework packages.
- Docs uses Mantine UI v7 with `postcss-preset-mantine` + `postcss-simple-vars`.
- commitlint enforces conventional commits; husky + lint-staged run linting on pre-commit.

## Style & conventions

- Named exports only; component files `PascalCase`, hooks/utils `camelCase`; 2-space indent.
- Import order is lint-enforced (simple-import-sort): `node:` → externals → `@patternbase/*` → relative → CSS.
- Prettier: semicolons, double quotes, trailing commas. Don't hand-format against lint/prettier output.
- Strict TS (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`); typecheck must pass.
- All component props are typed via interfaces from `@patternbase/core`; framework packages maintain prop parity (same props, different UI).

## Adding a pattern

1. `packages/core/src/types/patterns.ts` — prop interfaces; export from `packages/core/src/index.ts`.
2. `packages/{antd,bootstrap,mantine,shadcn}/src/components/<name>/` — implementation + `index.ts` barrel (in shadcn, add any needed primitives to `src/components/ui/` first), then re-export from each package `src/index.ts`.
3. Docs app: metadata in `apps/docs/src/data/patterns.ts`; demo data in `data/demo-data.ts`; registry entry (`bootstrap`/`antd`/`mantine`/`shadcn`) in `src/lib/registry.tsx`; explanation in `data/pattern-explanations.ts`; prop table in `data/props-data.ts`. Snippets are auto-generated from component source files.

## Commits & verification

- Conventional commits (commitlint): header ≤100 chars, subject lowercase (`fix: ...`), types `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`.
- Pre-commit runs lint-staged prettier on staged files, then a full `pnpm lint` — keep commits small.
- Before a PR at minimum: `pnpm run lint` and `pnpm run type-check`, plus `pnpm build` for docs/runtime verification.
- Claude Code loads `CLAUDE.md`, which redirects to this file (`agent.md`) — keep this file as the single source of truth.

---

# Mantine Migration Plan

Last updated: 2026-03-08

## Objective

Migrate UI surfaces to Mantine incrementally while preserving current behavior, strict typing, and production build stability.

## Scope

- Replace legacy/shared UI primitives with Mantine equivalents in `components/`, `layouts/`, and route UIs in `app/`.
- Align app-wide theming and layout patterns with Mantine provider setup.
- Keep API/data logic unchanged unless UI integration requires minimal contract updates.
- Treat integration-specific UI under `src/webparts/` as a separate migration batch.

## Workstreams

## WS1: Theme and Providers

- [ ] Verify `MantineProvider` placement at root app shell.
- [ ] Define/confirm shared design tokens in a single theme module.
- [ ] Standardize global spacing/typography/radius scales.
- [ ] Confirm color semantics for success/warning/error/info states.

## WS2: Shared UI Primitives

- [ ] Inventory base primitives currently used across features (buttons, inputs, modal, table, badges, alerts).
- [ ] Replace internal wrappers with Mantine-backed implementations while keeping existing prop contracts where feasible.
- [ ] Add compatibility notes for any breaking prop differences.

## WS3: Layout Migration

- [ ] Migrate shared shells in `layouts/` to Mantine layout primitives.
- [ ] Validate navigation/sidebar/header behavior across breakpoints.
- [ ] Verify spacing and scroll behavior parity.

## WS4: Route Migration (App Router)

- [ ] Migrate route UIs in `app/` batch-by-batch by traffic/priority.
- [ ] Preserve loading, empty, and error states.
- [ ] Verify forms and validation UX consistency after each batch.

## WS5: Legacy/Integration Surfaces

- [ ] Audit `src/webparts/` components and classify as migrate/retain/deprecate.
- [ ] Migrate only actively used integration surfaces.
- [ ] Defer low-value legacy screens until core app surfaces are complete.

## Phases

## Phase 1: Foundation (WS1)

- [ ] Confirm Mantine packages and versions in `package.json` and lock compatible versions.
- [ ] Set up/verify global Mantine provider at app root.
- [ ] Define shared theme tokens (colors, spacing, typography, radii).
- [ ] Add baseline styles and normalize usage guidance.

## Phase 2: Core Layouts and Primitives (WS2, WS3)

- [ ] Migrate shared shells in `layouts/`.
- [ ] Migrate high-traffic reusable components in `components/`.
- [ ] Ensure responsive behavior parity on mobile and desktop.

## Phase 3: Route-Level UI (WS4)

- [ ] Migrate route UIs in `app/` by priority.
- [ ] Validate form behavior, validation messages, and loading states.
- [ ] Verify accessibility basics (labels, focus flow, keyboard navigation).

## Phase 4: Legacy and Cleanup (WS5)

- [ ] Remove dead styles/components replaced by Mantine.
- [ ] Simplify duplicated UI utilities.
- [ ] Update internal docs and contribution notes.

## Validation Checklist

- [ ] `pnpm run lint` passes.
- [ ] `pnpm run type-check` passes.
- [ ] `pnpm build` passes.
- [ ] Critical user flows tested manually.
- [ ] No visual regressions in primary layouts/routes on desktop and mobile.

## Batch Tracker

## Batch A: Foundation

- [ ] Theme/provider setup complete.
- [ ] Global style baseline validated.

## Batch B: Shared Components

- [ ] Core primitives migrated in `components/`.
- [ ] Consumers updated without behavior regressions.
- [ ] Candidate files listed and prioritized.

Candidate files (`components/`):

- [ ] `<fill-after-scan>/Button*`
- [ ] `<fill-after-scan>/Input*`
- [ ] `<fill-after-scan>/Modal*`
- [ ] `<fill-after-scan>/Table*`
- [ ] `<fill-after-scan>/Form*`

## Batch C: Layouts

- [ ] Shells migrated in `layouts/`.
- [ ] Responsive checks complete.
- [ ] Candidate files listed and prioritized.

Candidate files (`layouts/`):

- [ ] `<fill-after-scan>/AppShell*`
- [ ] `<fill-after-scan>/Dashboard*`
- [ ] `<fill-after-scan>/Auth*`
- [ ] `<fill-after-scan>/Navigation*`
- [ ] `<fill-after-scan>/Header*`

## Batch D: App Routes

- [ ] Priority routes in `app/` migrated.
- [ ] Form and state UX validated.

## Batch E: Legacy Integrations

- [ ] Active surfaces in `src/webparts/` handled.
- [ ] Deprecated surfaces documented.

## Risks and Mitigations

- Styling regressions:
  - Mitigation: migrate in small batches and compare affected screens.
- Component behavior drift:
  - Mitigation: preserve prop contracts where possible and add focused tests.
- Timeline risk from broad scope:
  - Mitigation: prioritize high-impact routes first and defer low-value refactors.

## Change Log

- 2026-03-08: Initialized `MANTINE_PLAN.md` with phased migration checklist.
- 2026-03-08: Expanded into folder-based workstreams and execution batches.
