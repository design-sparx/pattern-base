# Editorial Redesign — Design Doc

**Date:** 2026-08-23
**Status:** Approved via brainstorming session + lavish mockup review (user: "this looks good")
**Scope:** Docs site only (`apps/docs`). No changes to `packages/*`.

## Goal

Blend a marketing/landing feel with discoverability across the four non-workbench routes. The docs site should read like an editorial reference for AI UX patterns — not a generic dashboard — while making all 54 patterns scannable in seconds.

## Current State (verified)

- `src/app/layout.tsx` wraps **every** route in `AppShellLayout` (AppShell + Header + Sidebar + Aside + Footer) — `app-shell-layout.tsx:57`.
- `src/app/page.tsx` — "use client" homepage: Hero + 4 feature cards + category card grid.
- `src/app/patterns/page.tsx` — "use client": search TextInput + `CategoryNav` + `PatternCard` grid (up to 5 columns).
- `src/app/patterns/[category]/page.tsx` — server component, SSG via `generateStaticParams`, icon + card grid.
- `src/app/about/page.tsx` — server component: origin prose, 6 pillars, hardcoded category counts, tech-stack links.
- Fonts already loaded via `next/font/google`: Geist (`--font-geist`, body), Geist Mono (`--font-geist-mono`), Space Grotesk (`--font-space-grotesk`, headings) — wired in `theme.ts`.
- Theme violet palette includes `#5f3dc4` (= violet[8], `theme.ts:28`). Primary color is violet with shade `{light: 6, dark: 5}`.
- `next.config.mjs` has no redirects yet.
- Route inventory is exactly five pages (glob-verified). Build currently emits 66 static pages.

## Locked Decisions

| Decision                        | Choice                                                                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Goal                            | Marketing/landing feel + discoverability                                                                                                                  |
| Scope                           | All routes except the workbench                                                                                                                           |
| Live previews on landing/browse | None — text-only, lightest possible pages                                                                                                                 |
| Aesthetic                       | Editorial minimal                                                                                                                                         |
| Type                            | Fraunces (display) + Inter (body), `next/font/google`, self-hosted                                                                                        |
| Accent                          | Violet only; near-monochrome ink/paper elsewhere                                                                                                          |
| Homepage                        | Full landing: hero → stats → featured 6 → category index → origin/principles → install                                                                    |
| Browse pages                    | Numbered editorial index rows grouped by category                                                                                                         |
| `/about`                        | Merged into home; route deleted + redirect                                                                                                                |
| Sidebar                         | Off on home only; kept on browse/workbench routes                                                                                                         |
| Architecture                    | Approach A: Next.js route groups `(home)` / `(shell)`                                                                                                     |
| Implementation                  | **Mantine-native**: every surface composed from `@mantine/core` primitives; styling via props/responsive values/Styles API/theme — no CSS Modules planned |

## Implementation Constraints

- **Components only from Mantine**: layouts via `Container`/`Stack`/`Group`/`Grid` + `Grid.Col` (proportional columns — stats strip, index rows, install section)/`SimpleGrid`/`Flex`; type via `Title`/`Text`; interactive rows/cells via `UnstyledButton` or `Anchor component="span"`; pills/badges via `Pill`/`Badge`; search via `TextInput`; copy affordance via Mantine's `CopyButton`; code block via `Code`; dividers via `Divider`. No raw `<div>` layouts when a Mantine primitive fits, no hand-rolled buttons/inputs.
- **Styling mechanism precedence** (all native Mantine, no CSS Modules planned):
  1. Style props (`c=`, `fz=`, `fw=`, `lh=`, `bg=`, `bd=`…) and **responsive values in props** (`span={{ base: 12, md: 3 }}`, `fz={{ base: 32, md: 64 }}`) for layout collapse and type scaling.
  2. **`visibleFrom` / `hiddenFrom`** for breakpoint show/hide (description/tags columns, vertical dividers).
  3. **Styles API** (`styles={{ root: { "&:hover": … } }}`) for the few hover/active states — supports pseudo-classes, `[data-*]` selectors, and nested descendant selectors; accepts `light-dark()`.
  4. Theme-level config in `theme.ts` (defaultProps) where a default should apply app-wide.
  - Inline `style={{} }` stays banned. A CSS Module is only acceptable if something genuinely special emerges during implementation (e.g. keyframes) — none currently identified.
  - Active tab underline = conditional props (`bd={active ? "2px solid var(--mantine-color-violet-filled)" : "2px solid transparent"}`), keeping layout stable without state classes.
- **Colors via Mantine tokens**: use `var(--mantine-color-text)`, `var(--mantine-color-dimmed)`, `var(--mantine-color-default-border)`, `var(--mantine-color-violet-filled)`/`violet.0–9` scale, and Mantine's `light-dark()` for scheme-dependent values. Do not hardcode hex in components; the ink/paper/hairline trio maps onto existing Mantine semantics (text / body background / default border) plus at most 1–2 custom vars defined once in `globals.css` under `[data-mantine-color-scheme]`.
- **Dark mode comes free** by using these tokens — no manual inversion logic anywhere.

## Route Architecture (Approach A)

Route groups don't affect URLs, so all public paths stay identical.

1. **Root layout slims down** — `src/app/layout.tsx` keeps `MantineProvider`, `ColorSchemeScript`, `SpotlightProvider`, skip-link, favicon/metadata, and font variables (adds Fraunces + Inter). It **removes** `<AppShellLayout>` so chrome becomes per-group.
2. **`(shell)` group** — new `src/app/(shell)/layout.tsx` wrapping children in `<AppShellLayout>`. Move the entire `src/app/patterns/` tree under it: `src/app/(shell)/patterns/{page.tsx,[category]/page.tsx,[category]/[pattern]/page.tsx}` (+ existing layouts). Sidebar/aside/footer behavior unchanged everywhere except home.
3. **`(home)` group** — move `src/app/page.tsx` → `src/app/(home)/page.tsx`; new `src/app/(home)/layout.tsx` renders minimal editorial chrome: top nav bar (wordmark, Patterns link, About→`/#about` anchor link replaced by "Origin" anchor, GitHub ↗, Get started pill) + main + slim footer. No AppShell, no sidebar.
4. **Metadata**: title template stays in root; `(home)/page.tsx` gets explicit metadata (absorbing `/about`'s description).

### `/about` removal

- Delete `src/app/about/page.tsx`. Content merges into home's Origin (dark manifesto band) + Principles sections and footer links.
- Add to `next.config.mjs`: `async redirects() { return [{ source: "/about", destination: "/#about", permanent: true }] }` (308).
- Home's origin section gets `id="about"` as the redirect target.

## Planned Files & Component Mapping

### New files

| File                                          | Role                                                                                    | Mantine components                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `src/app/(shell)/layout.tsx`                  | Wraps children in existing `<AppShellLayout>`                                           | none (1-line re-export)                                                               |
| `src/app/(home)/layout.tsx`                   | Editorial chrome: top nav + slim footer, no AppShell                                    | `Group`, `Anchor`, `UnstyledButton`, `Button` (Get-started pill), `Text`, `Container` |
| `src/app/(home)/page.tsx`                     | Landing composition + absorbed About metadata (server component)                        | composes the section components below                                                 |
| `src/components/home/stats-strip.tsx`         | 54 / 3 / 100% / MIT strip                                                               | `Grid` + `Grid.Col`, `Title`, `Text`                                                  |
| `src/components/home/featured-patterns.tsx`   | Curated 6-cell hairline grid (client-free; hover is pure CSS)                           | `SimpleGrid`, `UnstyledButton`, `Text`, `Box`                                         |
| `src/components/home/category-index.tsx`      | Numbered 5-row intent index                                                             | `Stack`, `UnstyledButton`, `Grid` + `Grid.Col`, `Title`, `Text`                       |
| `src/components/home/origin-manifesto.tsx`    | Dark band absorbing /about origin + principles (`id="about"`)                           | `Box`, `Title`, `Text`, `Anchor`                                                      |
| `src/components/home/install-section.tsx`     | Two-column getting-started + code block                                                 | `Grid` + `Grid.Col`, `Title`, `Code`                                                  |
| `src/components/common/install-pill.tsx`      | Small client island (CopyButton needs state)                                            | `CopyButton`, `Group`, `Code`                                                         |
| `src/components/common/pattern-index-row.tsx` | Shared numbered index row for both browse pages                                         | `UnstyledButton`, `Grid` + `Grid.Col`, `Pill`, `Text`                                 |
| `src/components/browse/patterns-index.tsx`    | Client island: search + tag pills + grouped rows (logic moved from current `/patterns`) | `TextInput`, `Pills.Group` + `Pill`, `Title`, `Text`                                  |

### Modified files

| File                                           | Change                                                                            |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/app/layout.tsx`                           | Remove `AppShellLayout`; add Fraunces/Inter `next/font` vars, drop Geist var      |
| `src/app/theme.ts`                             | `theme.fontFamily` → `var(--font-body)`                                           |
| `src/app/globals.css`                          | Add `.editorial-display` / `.editorial-kicker` utility classes                    |
| `next.config.mjs`                              | Add `redirects()` for `/about` → `/#about`                                        |
| `src/data/patterns.ts`                         | Add `FEATURED_SLUGS` export                                                       |
| `src/app/(shell)/patterns/page.tsx`            | Rewritten as thin server wrapper around `PatternsIndex` island + editorial header |
| `src/app/(shell)/patterns/[category]/page.tsx` | Editorial header + category switcher replacing icon header + card grid            |

### Moved files (git mv, content untouched)

- `src/app/patterns/**` → `src/app/(shell)/patterns/**` — includes `page.tsx`, `[category]/page.tsx`, `[category]/[pattern]/page.tsx`, both `layout.tsx` files, and `patterns/error.tsx`.

### Deleted files

- `src/app/about/page.tsx` — content merged into home sections.
- `src/components/common/pattern-card.tsx` — retired by the index rows; verify zero remaining imports before deleting (related links were rebuilt server-side in `af41eec`, so expected clean).
- `src/components/home/hero.tsx` — replaced by new hero markup inside `(home)/page.tsx`.

### Styling approach (no CSS Modules planned)

Every styling concern maps to a native Mantine mechanism:

| Concern                                 | Native mechanism                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Index-row columns + mobile collapse     | `Grid.Col span={{ base, sm }}`; `visibleFrom` / `hiddenFrom` on description/tags columns                                 |
| Row hover (name → violet, arrow reveal) | Styles API on `UnstyledButton`: nested selectors inside `styles={{ root: { "&:hover": … } }}`                            |
| Featured-cell hover wash                | Same Styles API pattern with `backgroundColor: light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))` |
| Stats-strip hairline dividers           | `Divider orientation="vertical"` (`hiddenFrom="sm"`) or `bd` style-props between cells                                   |
| Origin dark band                        | `bg="dark.7"` prop (`light-dark()` works directly in `bg` too)                                                           |
| Install two-column collapse             | `Grid.Col span` responsive values                                                                                        |
| Category-switcher active underline      | Conditional props: `bd={active ? "2px solid var(--mantine-color-violet-filled)" : "2px solid transparent"}`              |
| Fraunces display type                   | Shared `.editorial-display` utility class (below), applied via `className` on `Title`/`Text`                             |

Only additions to `src/app/globals.css` (already the site-wide stylesheet): `.editorial-display` (Fraunces family, −0.01em tracking) and `.editorial-kicker` (uppercase, letter-spaced eyebrow). They live there because they're cross-cutting typography reused by components on multiple surfaces — not because layout/hover/responsive CSS requires it.

## Page Designs (as approved in mockups)

All sections are built from Mantine primitives per **Implementation Constraints** (Container/Stack/Group/Grid scaffolding, Title/Text typography, UnstyledButton/Anchor rows, TextInput search, CopyButton install pill, Code block). Responsive collapse uses `Grid.Col` spans + `visibleFrom`/`hiddenFrom`; hover states use the Styles API — see **Styling approach**.

### 1. Home `/` — full landing (new editorial layout, no sidebar)

Sections top-to-bottom:

1. **Top nav** — wordmark ("Pattern**Base**" with violet accent), links: Patterns, Origin (anchor), GitHub ↗; "Get started" dark pill CTA scrolling to install section.
2. **Hero** — kicker line ("An open-source component library"), Fraunces display headline (~64px desktop, italic violet emphasis on "AI products"), one-sentence sub, actions: primary violet "Browse patterns", ghost "Read the approach ↓", right-aligned mono install pill with copy button (`pnpm add @patternbase/<framework>`).
3. **Stats strip** — 4 cells divided by hairlines: `54` AI UX patterns · `3` UI frameworks · `100%` TypeScript · `MIT` open source. Counts derive from data (`patterns.length`), not hardcoded where feasible.
4. **Featured patterns** — curated 6, hairline-divided 3×2 grid of text cells (category eyebrow, Fraunces name, one-line description, hover reveals "Open pattern →"). Hover wash = `--violet-wash`. No previews, no images. Curation via new `FEATURED_SLUGS` export (below).
5. **Browse by intent** — numbered category index rows (01–05): Fraunces category name, description, mono pattern count; whole row links to `/patterns/[category]`.
6. **Origin manifesto** (`id="about"`) — full-width near-black band, italic Fraunces pull-quote derived from current `/about` origin paragraph, supporting prose (shapeof.ai attribution link preserved), followed by 3 principle columns condensed from the 6 pillars (Multi-framework, Copy-paste ready, Fully typed).
7. **Install / getting started** — two-column: Fraunces heading + dark code block listing all three `pnpm add` commands.
8. **Slim footer** — copyright/MIT + shapeof.ai attribution + GitHub/npm links.

Server component throughout except the install-pill copy button (small client island).

### 2. `/patterns` — editorial index (sidebar stays)

- Editorial header: Fraunces "All patterns" + one-line sub.
- Filter row (client island): retained name/description/tag search input + tag filter pills (All / prompt / generation / transparency / control / trust — pills derived from tag vocabulary, single-select alongside free-text search).
- Index body: grouped by category; group label = Fraunces name + mono count. Each row: mono number (001…054, stable within full-list ordering), bold name, one-line description (truncate), right-aligned tag chips, arrow affordance on hover (name → violet, arrow slides in). Row links to workbench route.
- Below ~900px description column collapses; below ~600px tags hide (verify longest names fit).

### 3. `/patterns/[category]` — same index, scoped (sidebar stays)

- Breadcrumb (Patterns / **Category**), Fraunces h1 + category description sub.
- Category switcher: horizontal tab-like links across all 5 categories with counts; active = ink + 2px violet underline. Server-rendered `<Link>`s (no client JS).
- Single-group index rows identical to `/patterns` (numbering continues from global ordering for cross-page consistency... or restarts per category — **restart per category**, matching "reference book chapter" feel).
- SSG unchanged (`generateStaticParams`).

### 4. Workbench — untouched

No visual or behavioral change.

## Design Tokens

**Palette** (Mantine tokens, not raw CSS):

- Ink/paper/hairline map to `--mantine-color-text`, body background (`--mantine-color-body`), and `--mantine-color-default-border`. The warm-white paper tint (#fbfbf9) is optional; if kept, set it as a light-mode-only body/background override in the theme (one place), never inline.
- Accent = violet only → theme's `violet.8 #5f3dc4` in light mode, `violet.4–5` in dark via `light-dark()` or Mantine's auto shade handling (`primaryShade` already handles this).
- Hover wash: `violet.0` light / `violet.9` dark (`light-dark()`), applied via the Styles API on the interactive element itself.
- No custom inversion logic — scheme switching stays entirely with Mantine's color-scheme system.

**Type:**

- Load `Fraunces` (opsz axis, weights 350–550, italic) and `Inter` (400/500/600) via `next/font/google` as `--font-display` / `--font-body`, replacing `--font-geist` in the root-layout font variables.
- **Inter becomes the global body font**: point `theme.fontFamily` at `var(--font-body)` so shell/workbench body text also renders Inter. Geist stops being loaded. Geist Mono stays (`theme.fontFamilyMonospace` untouched).
- Fraunces (display) applies to: hero display, page h1/h2 section heads, featured/category/index-row names, pull-quote — i.e. editorial headings only. Do NOT change `theme.headings.fontFamily` globally; scope via the `.editorial-display` utility class in `globals.css`, applied to Mantine `Title`/`Text` `className` props. Shell headings keep Space Grotesk this iteration.
- Mono numerals (index numbers, counts, install pill): existing `--font-geist-mono`.
- All fonts self-hosted by `next/font` → zero layout shift, works offline.
- Swap risk: Geist→Inter metric differences may cause minor reflow across shell UI; both are similar grotesques, but spot-check workbench panes after the swap.

**A11y requirements:** ink-on-paper exceeds AA; verify dimmed grays (`--ink-soft #55555e`) against paper ≥ 4.5:1 for body text. Rows are links with visible focus rings (Mantine focusRing auto). Index numbers are decorative (aria-hidden) — row accessible name = pattern name.

## Data Model Changes

`src/data/patterns.ts`:

- Add `export const FEATURED_SLUGS = [...]` — hand-picked 6 for the homepage grid (exact picks during implementation; candidates from mockup: open-input, suggestions, citation, parameter-control, data-ownership, regenerate — final list needs sign-off since descriptions there were illustrative).
- No changes to `PatternMeta` (core types untouched); category counts on home derive via `getPatternsByCategory`.
- Tag filter vocabulary derives from `patterns[].tags` frequency top-N rather than hardcoding, if trivially doable; otherwise hardcode the 5 pills.

## Verification Plan

- `pnpm lint`, `pnpm type-check` green (docs checked via `pnpm exec tsc --noEmit` inside `apps/docs`).
- `pnpm build`: expect **65 static pages** (66 − deleted `/about`); confirm `/about` appears in the redirects table and `/` prerenders server-side (no "use client" at page level anymore).
- Manual: dark mode toggle across all redesigned surfaces; mobile widths (375px) for index-row collapse rules; keyboard tab-through of new nav/rows; `/?about` anchor scroll from redirect.
- Bundle watch: home should shed the client-component weight of today's page (icons/grid) — no new runtime deps beyond fonts.

## Risks & Open Questions

1. **Featured curation** — final 6 picks need user sign-off during implementation (mockup picks were illustrative).
2. **Inbound `/about` anchors** — deep anchors die; same accepted trade-off as workbench migration. Redirect covers SEO.
3. **Global body-font swap** — Geist→Inter changes every surface's body text. Intentional (matches locked decision); metric drift is the main watch-item during visual verification.
4. **Dark-mode parity** — specified but unverified until implemented; existing toggle must keep working.
5. **Pre-existing contrast debt** — last audit flagged dimmed-gray violations in site chrome; new palette must not inherit them.
6. **Space Grotesk fate** — still loaded for shell headings; candidate for later removal once editorial type proves out (not this change).

## Out of Scope

- Workbench changes, package code, snippet generation, spotlight behavior, search indexing/SEO tooling beyond the redirect, live previews on marketing surfaces.
