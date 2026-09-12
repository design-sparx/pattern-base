# Agent Guidelines

PatternBase is a pnpm + Turborepo monorepo: 54 AI-UX pattern components (shapeof.ai patterns), each implemented with identical prop interfaces in four UI libraries (React Bootstrap, Ant Design, Mantine, shadcn/ui), plus a Next.js docs site. The `@patternbase/*` packages are published (root `publishConfig.access: public`); the private shared configs use the same prefix.

Canonical repo: `https://github.com/kelvink96/pattern-base` (was `kelvink96/ai-vory`; that URL redirects, and `origin` points at the new location).

## Layout

- `packages/core` (`@patternbase/core`) — framework-agnostic types, hooks, utils. All shared prop interfaces live in `src/types/patterns.ts`. No UI, no framework imports.
- `packages/{antd,bootstrap,mantine,shadcn}` — same 54 patterns in each; must only use the host library's primitives (antd, react-bootstrap, @mantine/\*, shadcn/ui) and keep prop parity with `core` and each other.
- `packages/shadcn` (`@patternbase/shadcn`) — shadcn/ui implementations. Primitives vendored in `src/components/ui/`, Tailwind v4 theme in `src/styles.css`, Radix + lucide-react bundled by tsup.
- `packages/{eslint-config,vitest-config}` — private shared configs used by every package.
- `apps/docs` (`@patternbase/docs`) — Next.js 16.3.1 docs site with live previews for three frameworks: Bootstrap, Ant Design, and shadcn/ui.

## Commands (run from repo root)

- `pnpm build` / `pnpm clean` — turbo-cached. `pnpm clean:all` also removes `node_modules/.cache` and `node_modules/.vite`.
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

| Category       | Count | Patterns                                                                                                                                                                         |
| -------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt Actions | 13    | open-input, regenerate, expand, transform, inline-action, chained-action, auto-fill, summary, describe, inpainting, madlibs, restructure, restyle                                |
| Wayfinders     | 8     | suggestions, follow-up, templates, gallery, initial-cta, nudges, prompt-details, randomize                                                                                       |
| Tuners         | 10    | parameter-control, model-management, attachments, filters, connectors, modes, preset-styles, prompt-enhancer, saved-styles, voice-and-tone                                       |
| Governors      | 14    | stream-of-thought, citation, variations, cost-estimate, action-plan, synthesis, branches, controls, draft-mode, memory, references, sample-response, shared-vision, verification |
| Trust Builders | 9     | disclosure, caveat, consent, data-ownership, footprints, incognito-mode, watermark, avatar, color                                                                                |

**Docs site pattern preview system (`apps/docs`):** each pattern page (`/patterns/<category>/<pattern>`) renders live, interactive previews. Data flow:

1. `src/data/patterns.ts` — metadata (`PatternMeta`) + lookup helpers (`getPatternBySlug()`, `getCategoryById()`, `getPatternsByCategory()`).
2. `src/app/patterns/[category]/[pattern]/page.tsx` — dynamic route, `generateStaticParams()`, renders `<ComponentPreview />`.
3. `src/data/demo-data.ts` — shared demo constants (`demoSuggestions`, `demoParameters`, `demoSteps`, `demoCitations`, `demoVariations`, `demoCostBreakdown`, `demoModels`).
4. `src/lib/registry.tsx` — `Record<string, RegistryEntry>` keyed by pattern ID; each entry has three component factories (`bootstrap`, `antd`, `shadcn`) rendering the real components with demo data.
5. `src/data/snippet-templates.ts` — auto-generated full implementations for all three frameworks from `scripts/generate-snippets.ts`; regenerate with `pnpm generate-snippets`.
6. `src/components/preview/component-preview.tsx` — tabbed Preview / Code UI with a framework toggle and framework-appropriate install command (e.g. `pnpm add react-bootstrap bootstrap`, `pnpm add antd @ant-design/icons`, `pnpm add @patternbase/shadcn tailwindcss`).
7. `src/components/preview/framework-tabs.tsx` — the three-way framework toggle (`FrameworkTabs` render-prop wrapper + `FrameworkToggle` segmented control).
8. `src/data/props-data.ts` — props tables rendered by `src/components/preview/props-table.tsx`.

## Gotchas

- `apps/docs` now has `type-check` (`tsc --noEmit`) and `test` (`vitest run`) scripts, so root `pnpm type-check`/`pnpm test` cover it.
- Framework deps (react, antd, react-bootstrap, @mantine/\*) are peerDependencies externalized by tsup. shadcn/ui's Radix and icon deps are bundled by tsup; only `tailwindcss` is an external peer. Never import any framework deps into `@patternbase/core`.
- Docs resolves workspace packages from their `dist` via `next.config.mjs` `transpilePackages`, so run `pnpm build` before working against them in docs.
- Tests live in `packages/core`, `packages/shadcn`, and `apps/docs` (vitest + jsdom). `packages/{antd,bootstrap,mantine}` currently have none.
- Snippets are auto-generated from actual component source files. Run `pnpm generate-snippets` inside `apps/docs` to regenerate. The generated file (`apps/docs/src/data/snippet-templates.ts`) is tracked and committed.

## Build & Config

- tsup builds each package to both CJS and ESM with `.d.ts` declarations.
- TypeScript strict mode via `tsconfig.base.json` (target ES2020, module ESNext, bundler resolution).
- React and framework deps are externalized (peers); Turborepo caches build/lint/type-check; `dev` depends on `^build` and is persistent/uncached.
- `next.config.mjs` uses `transpilePackages` for the four framework packages.
- Docs uses Tailwind v4 (`@tailwindcss/postcss`) with shadcn/ui primitives. `apps/docs/src/app/globals.css` imports BOTH stylesheets — keep both:
  - `@patternbase/shadcn/styles.css` — supplies the `@theme inline` `--color-*` token mappings (made `bg-background`, `border-border`, `text-foreground`, etc. valid utilities) plus `:root`/`.dark` tokens. Dropping it breaks the build with `Cannot apply unknown utility class \`border-border\``.
  - `shadcn/tailwind.css` from the `shadcn` npm package (a direct dependency of `apps/docs`, not just a transitive) — supplies `data-open:`/`data-closed:` variants, accordion keyframes, and scroll-fade/shimmer utilities used by the vendored `apps/docs/src/components/ui/*` primitives. Dropping it breaks import resolution (`Can't resolve 'shadcn/tailwind.css'`).
- Fonts: the `next/font` variable classes (Inter/Manrope/Space Mono) MUST stay on `<html>` in `apps/docs/src/app/layout.tsx`, not `<body>` — `html { @apply font-sans; }` resolves `var(--font-family)` against `<html>`, so body-level variables silently fall back to the default system font.
- Public shell (header/nav/footer) lives in `apps/docs/src/components/layout/public-shell/`: `PublicShellLayout` (server component) wraps `<main id="main-content">` in a `min-h-screen` flex column; `PublicHeader` (sticky) → `MainNav` (shadcn NavigationMenu, dropdown lists the five categories with descriptions — no per-category counts in the dropdown) / `MobileNav` (vaul Drawer); `PublicFooter` (multi-column). Nav/footer data comes from `apps/docs/src/lib/public-shell.ts` (`getNavCategories()` reads `@/data/patterns` with live counts — keep static text like "54 AI-UX patterns" in sync if counts change). Use the `app-container` utility (defined in `globals.css`) instead of hardcoding `max-w-7xl px-4` to keep header/body/footer edges aligned.
- Page-scoped components for a route belong in a private `_components/` folder colocated with the route, e.g. all home page sections live in `apps/docs/src/app/(home)/_components/` (route groups are non-routable and Next excludes `_*` folders from routing). Shared route-level prop types go in a `home-props.ts` next to them; `page.tsx` imports them relatively (`./_components/...`). Don't create `src/components/<page>/` families.
- `apps/docs/src/components/ui/card.tsx` supports `size` ("default" | "sm") and `variant` ("default" | "solid" | "interactive"). `solid` = `border-border bg-background`; `interactive` adds `transition-colors hover:border-primary`. Prefer these variants over hand-written card chrome classes; keep only usage-specific classes (`h-full`, `p-5`, `group`, ...) inline.
- The home page (`apps/docs/src/app/(home)/page.tsx`) is the copy-paste pitch: no npm-install terminal, no "Browse by intent" section, no newsletter. Copy + hero counts derive from `patterns.length`. Text marketing claims (frameworks, counts, MIT, links) must stay truthful.
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
3. Docs app: metadata in `apps/docs/src/data/patterns.ts`; demo data in `data/demo-data.ts`; registry entry (`bootstrap`/`antd`/`shadcn`) in `src/lib/registry.tsx`; explanation in `data/pattern-explanations.ts`; prop table in `data/props-data.ts`. Snippets are auto-generated from component source files.

## Plans

Implementation plans live in `docs/superpowers/plans/` as dated Markdown files.

## Commits & verification

- Conventional commits (commitlint): header ≤100 chars, subject lowercase (`fix: ...`), types `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`.
- Pre-commit runs lint-staged prettier on staged files, then a full `pnpm lint` — keep commits small.
- Before a PR at minimum: `pnpm run lint` and `pnpm run type-check`, plus `pnpm build` for docs/runtime verification.
- Claude Code loads `CLAUDE.md`, which redirects to this file — keep this file (`AGENTS.md`) as the single source of truth.
