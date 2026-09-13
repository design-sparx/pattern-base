# Agent Guidelines

PatternBase is a pnpm + Turborepo monorepo: 54 AI-UX pattern components (shapeof.ai patterns), each implemented with identical prop interfaces in four UI libraries (React Bootstrap, Ant Design, Mantine, shadcn/ui), plus a Next.js docs site. The `@patternbase/*` packages are published (root `publishConfig.access: public`); the private shared configs use the same prefix.

Canonical repo: `https://github.com/kelvink96/pattern-base` (was `kelvink96/ai-vory`; that URL redirects, and `origin` points at the new location).

## Layout

- `packages/core` (`@patternbase/core`) — framework-agnostic types, hooks, utils. All shared prop interfaces live in `src/types/patterns.ts`. No UI, no framework imports.
- `packages/{antd,bootstrap,mantine,shadcn}` — same 54 patterns in each; must only use the host library's primitives (antd, react-bootstrap, @mantine/\*, shadcn/ui) and keep prop parity with `core` and each other.
- `packages/shadcn` (`@patternbase/shadcn`) — shadcn/ui implementations. Primitives vendored in `src/components/ui/`, Tailwind v4 theme in `src/styles.css`, Radix + lucide-react bundled by tsup.
- `packages/{eslint-config,vitest-config}` — private shared configs used by every package.
- `apps/docs` (`@patternbase/docs`) — Next.js 16.3.1 docs site. Public shell on the home route group `(home)`; patterns live under the `(shell)` route group with a live workbench previewing three frameworks: Bootstrap, Ant Design, shadcn/ui (Mantine has no docs preview).

## Commands (run from repo root)

- `pnpm build` / `pnpm clean` — turbo-cached. `pnpm clean:all` also removes `node_modules/.cache` and `node_modules/.vite`.
- `pnpm dev` — runs `pnpm clean` first (deletes `.next`/`.turbo`/`.vite` and build outputs to avoid stale-cache bugs like 404 dynamic routes or `@patternbase/shadcn`'s `./styles.css` not resolving), then the persistent turbo task builds `^build` deps; scope with `--filter` (e.g. `pnpm dev --filter=@patternbase/docs` runs just the docs site).
- `pnpm lint` / `pnpm lint:fix` / `pnpm type-check` / `pnpm test` / `pnpm format` / `pnpm format:check`.
- One package: `pnpm test --filter=@patternbase/core`.
- One test file (or watch mode), run from inside that package: `pnpm exec vitest run src/utils/confidence.test.ts` / `pnpm exec vitest --watch`.
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

**Docs site pattern preview system (`apps/docs`):** each pattern page (`/patterns/<category>/<pattern>`) renders a live, interactive workbench. Data flow:

1. `src/data/patterns.ts` — metadata (`PatternMeta`) + lookup helpers (`getPatternBySlug()`, `getCategoryById()`, `getPatternsByCategory()`).
2. `src/app/(shell)/patterns/[category]/[pattern]/page.tsx` — dynamic route under the `(shell)` route group, `generateStaticParams()`, looks up snippets/explanation/props and renders `<Workbench />`.
3. `src/data/demo-data.ts` — shared demo constants (`demoSuggestions`, `demoParameters`, `demoSteps`, `demoCitations`, `demoVariations`, `demoCostBreakdown`, `demoModels`).
4. `src/lib/registry/{index,antd,bootstrap,shadcn}.tsx` — per-framework registries of real components; `index.tsx` builds `componentRegistry: Record<string, RegistryEntry>` by intersecting the three (a pattern is dropped unless all three frameworks register it). Only bootstrap/antd/shadcn — Mantine is not doc-previewed.
5. `src/data/snippet-templates.ts` — auto-generated full implementations for all three frameworks; regenerate with `pnpm generate-snippets`. The docs `build` script runs it first (`pnpm generate-snippets && next build`).
6. `src/components/workbench/workbench.tsx` — client grid: `<PreviewPane>` (live component) + `<InspectorPane>` (code / props / docs tabs).
7. `src/components/workbench/framework-slots/` — one slot per framework, loaded with `next/dynamic` so only the active framework's chunk mounts; `preloadInactiveSlots()` prefetches the others during idle time.
8. `src/components/workbench/workbench-context.tsx` — framework/tab/viewport state synced to the URL (`?fw=&tab=&vp=` keys) via `src/lib/workbench-params.ts` (`parseWorkbenchParams` / `buildWorkbenchQuery`). Server-renders documented defaults first, applies URL state after hydration (reading search params during render would force a CSR bailout).
9. `src/components/preview/` — presentational helpers: `code-block.tsx`, `install-command.tsx`, `props-table.tsx`, `error-boundary.tsx`.

## Gotchas

- `apps/docs` has its own `AGENTS.md` with Next.js-specific rules — but it is gitignored (root `.gitignore:20`), so any convention that must reach the repo goes in this root file. The `next dev` server regenerates the `<!-- BEGIN:nextjs-agent-rules -->` block (see `node_modules/next/dist/server/lib/generate-agent-files.js`) warning that the Next 16 APIs differ from training data — don't strip it from diffs, and read the bundled docs in `node_modules/next/dist/docs/`. It also documents two original gotchas: stale Turbopack cache can 404 dynamic pattern routes (`pnpm run clean` fixes it) and the two mandatory CSS imports in `globals.css` (see Build & Config).
- `apps/docs` has `type-check` (`tsc --noEmit`) and `test` (`vitest run`) scripts, so root `pnpm type-check`/`pnpm test` cover it.
- The app-shell content card already applies `p-4`, so pages under `(shell)/` must NOT add their own `p-4 md:p-6` on top (double padding). `/patterns` (index) and `/patterns/[category]` follow this — the workbench page (`[category]/[pattern]`) still carries the legacy `p-4 md:p-6` wrapper it should eventually drop.
- On Windows, `pnpm exec eslint`/`pnpm exec prettier` fail on paths that contain `(shell)` or `[category]` — the cmd.exe launcher globs/mangles the parens and brackets (`/patterns/[category]/page.tsx was unexpected at this time`). Run them via node directly with a glob that avoids the literal bracket segment: `node ./node_modules/eslint/bin/eslint.js "src/app/(shell)/**/page.tsx"` (from `apps/docs` so the ESLint config finds the right `tsconfig.json`); same trick for prettier. Plain paths (no parens/brackets) work fine via `pnpm exec`.
- Framework deps (react, antd, react-bootstrap, @mantine/\*) are peerDependencies externalized by tsup. shadcn/ui's Radix and icon deps are bundled by tsup; only `tailwindcss` is an external peer. Never import any framework deps into `@patternbase/core`.
- Docs resolves workspace packages from their `dist` via `next.config.mjs` `transpilePackages`, so run `pnpm build` before working against them in docs.
- Tests live in `packages/core`, `packages/shadcn`, and `apps/docs` (vitest + jsdom). `packages/{antd,bootstrap,mantine}` currently have none. Docs lib tests: `src/lib/{registry-parity,workbench-params,public-shell}.test.ts`.
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
- Public shell (header/nav/footer) lives in `apps/docs/src/components/layout/public-shell/`: `PublicShellLayout` (server component) wraps `<main id="main-content">` in a `min-h-screen` flex column; `PublicHeader` (sticky) → `MainNav` (shadcn NavigationMenu, dropdown lists the five categories with descriptions — no per-category counts in the dropdown) / `MobileNav` (vaul Drawer); its search button (search icon + `KbdGroup` `Ctrl K` hint) opens the site-wide Command-palette search; `PublicFooter` (multi-column). Nav/footer data comes from `apps/docs/src/lib/public-shell.ts` (`getNavCategories()` reads `@/data/patterns` with live counts — keep static text like "54 AI-UX patterns" in sync if counts change). Use the `app-container` utility (defined in `globals.css`) instead of hardcoding `max-w-7xl px-4` to keep header/body/footer edges aligned.
- App shell (patterns) lives in `apps/docs/src/components/layout/app-shell/` (`app-shell-layout.tsx` = `ShellContent`): SharePoint-style floating acrylic cards in a locked viewport frame. `<SidebarProvider className="app-canvas h-svh overflow-hidden">` (a `globals.css` utility = `var(--muted)` + soft `--primary`/`--muted-foreground` radial gradients, giving frosted panes tonal variation to refract — the base must stay on `SidebarProvider`) wraps `<Sidebar collapsible="icon" variant="floating">` and a `SidebarInset` (`id="main-content"`, `bg-transparent gap-2 p-2 md:pl-0`) holding a pinned frosted `Header`, the rounded content card, and `Footer`. The content card is the scroll container (`flex-1 min-h-0 overflow-y-auto`), so the chrome never scrolls — only page content moves. All four surfaces share one recipe — `bg-background supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-xl` + `rounded-2xl` + `shadow-sm`; unify on `bg-background`, not `bg-sidebar` (else dark mode shows two base colors), and the floating sidebar's `ring-1` was deliberately removed. `md:pl-0` is what keeps the sidebar↔card gap at 8px, matching the `gap-2` between header/content/footer. Keep `Header` `sticky top-2 z-10` (pinned by the frame; sticky is belt-and-braces). Category nav is `app-shell/sidebar.tsx` (`SidebarNav`).
- Patterns browsing (`apps/docs/src/components/browse/`) is shared by `/patterns` (index) and `/patterns/[category]` (category). `patterns-toolbar.tsx` is the single-row sticky toolbar: a search input (`/` focuses, `Escape` clears) plus an `ToggleGroup` of category pills ("All patterns 54" + the five categories, each with icon + count). `patterns-index.tsx` renders one `CategoryGroup` card per category: header (icon chip, title, description, always-visible `tabular-nums` count badge, "View all →" link) + up to `VISIBLE_ROWS = 3` rows with a three-state expand control (`collapsed` | `preview` | `expanded`, cycled by a header ghost button that swaps `IconChevronDown`/`IconChevronsDown`/`IconChevronUp`) plus the in-card "Show all N patterns"/"Show fewer" trigger. The radix `Collapsible` only wraps the hidden rows (`data-[state=closed]:hidden`, no `collapsible-*` keyframes needed). Cards are `group/card`: on hover the icon chip inverts to solid primary, the title tints, and the View-all arrow nudges — keep that recipe, don't re-add `hide on sm` on the count badge or View-all link. `category-pattern-list.tsx` is the client component behind `/patterns/[category]`: it reuses the same `PatternsToolbar` (pills `router.push` instead of toggling tab state — `All patterns` → `/patterns`, a category → `/patterns/<id>`) plus a `group/card` hero card, live query filtering with highlight via `PatternIndexRow`'s `query` prop, and an `Empty` no-results state.
- Site-wide Command-palette search (`apps/docs/src/components/layout/spotlight-provider.tsx`): shared by the public and app shells via `useSpotlight()` context, opened by the input-styled search trigger in either header (a `Button` with a `bg-input/50` fill + `KbdGroup` `Ctrl K` hint, styled to read as a field — not a ghost button) or via `Ctrl/Cmd+K`. Patterns render in a `CommandDialog` grouped by category (`CommandGroup`) and filtered by name/description/tags; keep prop parity with the `getCategoryIcon()`/`@/data/patterns` lookups used there. Primitives vendored in `apps/docs/src/components/ui/{command,input-group,kbd}.tsx` — the `Command` component is cmdk-backed (`cmdk` is a direct `apps/docs` dependency; install it explicitly when re-adding).
- Page-scoped components for a route belong in a private `_components/` folder colocated with the route, e.g. all home page sections live in `apps/docs/src/app/(home)/_components/` (route groups are non-routable and Next excludes `_*` folders from routing). Shared route-level prop types go in a `home-props.ts` next to them; `page.tsx` imports them relatively (`./_components/...`). Don't create `src/components/<page>/` families.
- `apps/docs/src/components/ui/card.tsx` supports `size` ("default" | "sm") and `variant` ("default" | "solid" | "interactive"). `solid` = `border-border bg-background`; `interactive` adds `transition-colors hover:border-primary`. Prefer these variants over hand-written card chrome classes; keep only usage-specific classes (`h-full`, `p-5`, `group`, ...) inline.
- The home page (`apps/docs/src/app/(home)/page.tsx`) is the copy-paste pitch: no npm-install terminal, no "Browse by intent" section, no newsletter. Static copy derives from `patterns.length` (announcement text, stats, "View all N"); text marketing claims (frameworks, counts, MIT, links) must stay truthful. Hero layout: two-column grid — left column has `HomeAnnouncement` (a whole-pill `<Link href="/patterns">`, no dismiss button) above the H1 and two `rounded-full` CTA buttons; right column is the presentational `PromptComposerMock`. The long description paragraph lives in the `#about` section (`OriginManifesto`), not the hero.
- commitlint enforces conventional commits; husky + lint-staged run linting on pre-commit.

## Style & conventions

- Named exports only; component files `PascalCase`, hooks/utils `camelCase`; 2-space indent.
- Import order is lint-enforced (simple-import-sort): `node:` → externals → `@patternbase/*` → relative → CSS.
- Prettier: semicolons, double quotes, trailing commas. Don't hand-format against lint/prettier output.
- Strict TS (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`); typecheck must pass.
- All component props are typed via interfaces from `@patternbase/core`; framework packages maintain prop parity (same props, different UI).
- Border radius: always use the `--radius` token-scale utilities (`rounded-xs`–`rounded-4xl`, `rounded-full`) — never arbitrary `rounded-[…]` hardcodes. The one kept exception is `rounded-[inherit]` (radix overlay blades / scroll-area scrollbars that must inherit a parent surface's radius).

## Adding a pattern

1. `packages/core/src/types/patterns.ts` — prop interfaces; export from `packages/core/src/index.ts`.
2. `packages/{antd,bootstrap,mantine,shadcn}/src/components/<name>/` — implementation + `index.ts` barrel (in shadcn, add any needed primitives to `src/components/ui/` first), then re-export from each package `src/index.ts`.
3. Docs app: metadata in `apps/docs/src/data/patterns.ts`; demo data in `data/demo-data.ts`; registry entry in each of `src/lib/registry/{bootstrap,antd,shadcn}.tsx` (the pattern is dropped from docs unless all three register it); explanation in `data/pattern-explanations.ts`; prop table in `data/props-data.ts`. Snippets are auto-generated from component source files.

## Plans

Implementation plans live in `docs/superpowers/plans/` as dated Markdown files.

## Commits & verification

- Conventional commits (commitlint): header ≤100 chars, subject lowercase (`fix: ...`), types `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`.
- Pre-commit runs lint-staged prettier on staged files, then a full `pnpm lint` — keep commits small.
- Before a PR at minimum: `pnpm run lint` and `pnpm run type-check`, plus `pnpm build` for docs/runtime verification.
- Claude Code loads `CLAUDE.md`, which redirects to this file — keep this file (`AGENTS.md`) as the single source of truth.
