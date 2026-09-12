# Design: Public Shell Layout (Header / Body / Footer) for apps/docs

## Goal

Give the landing page (`@patternbase/docs` `(home)` route group) a proper, consistent layout: a sticky header with a shadcn `NavigationMenu` (Radix), a well-formed `<main>` body region, and a multi-column footer — all aligned to a single shared-width container. Pattern pages (`(shell)`, which keep their sidebar) are untouched.

## Context

- **Current state:** `(home)/layout.tsx` wraps pages in `PublicShellLayout` (client component) that renders `PublicHeader` + `<main className="flex-1">`. There is **no footer** on the landing page. `PublicHeader` is hand-rolled with manual `gray-*` classes, includes a dead Search modal + a version badge, and has no navigation menu.
- **Available primitives:** `@/components/ui/navigation-menu.tsx` (Radix, already present and unused) powers the menu; `Button`, `Badge`, `Card`, `Drawer` (vaul), `Dialog`, etc. are all vendored. The design tokens from `globals.css` / `@patternbase/shadcn/styles.css` (`bg-background`, `text-muted-foreground`, `border-border`, `bg-popover`, `bg-muted`, `text-primary`, `bg-primary`) are now working.
- **Home page:** already uses `max-w-7xl mx-auto px-4` containers per section with token classes — header/footer must ride the same container for the shared-edge look (confirmed with user via visual companion mockup).
- `categories` and `getPatternsByCategory()` in `@/data/patterns` provide nav data (5 categories + counts).

## Decisions

1. **Scope:** public/landing page only (`PublicShellLayout` + `PublicHeader` rewrite + new public `PublicFooter`). `(shell)` keeps `app-shell` unchanged.
2. **Header menu (NavigationMenu):** Home + a "Patterns" dropdown (All Patterns + the 5 categories, each with pattern count). Theme toggle and GitHub icon link remain on the right. **Search modal is removed.** Version badge is removed from the logo.
3. **Desktop nav hidden below `md`**; mobile gets a hamburger button opening a side sheet (use existing `@/components/ui/drawer` — vaul — with `direction="left"`; if that variant isn't supported by the vendored drawer, add a standard shadcn `Sheet`).
4. **Sticky header:** full-width translucent bar (`bg-background/80 backdrop-blur border-b border-border`) whose _content_ is constrained to the shared container.
5. **Shared container:** define a reusable `app-container` utility in `globals.css` (`mx-auto w-full max-w-7xl px-4`) used by the header content and the footer content. The body's own section containers already use the identical `mx-auto max-w-7xl px-4` classes inline, so all three align without touching page sections.
6. **Footer:** multi-column — brand column + "Patterns" column (5 categories) + "Resources" column (Patterns Index, GitHub, **Changelog**), plus a bottom bar (© year + "Built with shadcn/ui"). The version badge/link is replaced by a **Changelog** link pointing at the GitHub releases page (`https://github.com/kelvink96/pattern-base/releases`).

## Architecture & Components

Files (all under `apps/docs/src/components/layout/public-shell/` unless noted):

| File                      | Action                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public-header.tsx`       | Rewrite: sticky translucent bar, brand (no version), `MainNav` (NavigationMenu), theme toggle, GitHub; hamburger + mobile sheet below `md`.             |
| `main-nav.tsx`            | **New:** desktop `NavigationMenu` — Home link + Patterns trigger/dropdown, active-state via `usePathname`. Reuses `categories`/`getPatternsByCategory`. |
| `mobile-nav.tsx`          | **New:** hamburger button + side sheet containing Home, Patterns (All + 5 categories), GitHub.                                                          |
| `public-footer.tsx`       | **New:** server component; 3-column grid + bottom bar using `app-container`.                                                                            |
| `public-shell-layout.tsx` | Update: keep `flex min-h-screen flex-col`; sticky header; `<main id="main-content" className="flex-1">`; footer at bottom.                              |
| `globals.css`             | Add `@utility app-container`.                                                                                                                           |

### Header structure (desktop)

```
<header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
  <div class="app-container flex h-14 items-center justify-between">
    <div class="flex items-center gap-2"> [brand] </div>
    <MainNav />                       ← hidden md:flex
    <div class="flex items-center gap-1"> [theme toggle] [github] </div>
  </div>
</header>
```

- **Brand:** `<IconSparkles>` (violet) + "PatternBase" wordmark (`font-bold`). No version badge.
- **MainNav:** `<NavigationMenu>` with:
  - `NavigationMenuItem` → Home (`NavigationMenuLink` asChild → `next/link`, `active` when `pathname === "/"`).
  - `NavigationMenuItem` → Patterns `NavigationMenuTrigger` (active when `pathname.startsWith("/patterns")`) + `NavigationMenuContent` listing "All Patterns" then each category (`name (count)`) as `Link`s. Content uses Radix `onSelect={() => router.push(...)}` on click-item behavior or `asChild` links.
- **Right:** theme toggle (`next-themes`, as today) + GitHub (`IconBrandGithub`, external, `rel="noopener noreferrer"`).

### Footer structure

```
<footer class="border-t border-border bg-background">
  <div class="app-container grid gap-10 py-12 md:grid-cols-4">
    <div class="md:col-span-2"> brand (Sparkles + "PatternBase") + tagline: reuse the home-page meta description ("An open-source React component library codifying 54 AI UX patterns…") </div>
    <div> Patterns: 5 category links </div>
    <div> Resources: Patterns index / GitHub / Changelog </div>
  </div>
  <div class="border-t border-border">
    <div class="app-container flex flex-wrap items-center justify-between py-4 text-xs text-muted-foreground">
      <span>© {year} PatternBase</span><span>Built with shadcn/ui</span>
    </div>
  </div>
</footer>
```

## Data & Flow

- `categories` from `@/data/patterns` drives the Patterns dropdown and footer Patterns column; `getPatternsByCategory(cat.id).length` provides counts.
- Active nav styling: `usePathname()` in `PublicHeader` (client), passed to `MainNav`/`MobileNav`.
- No new data sources. Changelog links externally to GitHub releases (no `/changelog` route).

## Edge Cases & A11y

- **Mobile:** nav content must be reachable below `md`. Side sheet closes on selection. Use `aria-label` on icon-only buttons and `aria-label="Main"` on the nav.
- **External links** (`GitHub`, `Changelog`, `View on GitHub`) get `target="_blank" rel="noopener noreferrer"`.
- **Active states** must match: Home only on `/`; Patterns on any `/patterns*` path (including handlers under the `(shell)` group).
- **Hydration:** keep `"use client"` on header components (theme/nav state).
- **Sticky behavior:** header content must not reflow when the Patterns dropdown opens (element exists in normal flow / absolute-positioned viewport).

## Validation

- `pnpm --filter @patternbase/docs typecheck` — no TS errors.
- `pnpm --filter @patternbase/docs lint` — no ESLint errors.
- `pnpm --filter @patternbase/docs build` — production build passes (this was previously the failing shadcn path — re-verifies the fix).
- `pnpm dev --filter=@patternbase/docs` — visual smoke test:
  - header/body/footer edges align on desktop; dark mode correct; nav dropdown works; mobile hamburger opens sheet; active states correct on `/` and `/patterns/…`.
- Confirm pattern pages (`/patterns`, `/patterns/<category>/<pattern>`) still render with their existing sidebar header/footer.

## Out of Scope

- Wire up a real search (Cmd-K command menu) — header search is intentionally dropped.
- Re-skin the `(shell)` app-shell header/footer to match (future work; note the shared container pattern so it can adopt it).
- Add a `/changelog` page — Changelog link targets GitHub releases for now.
- Newsletter form submission / filter interactivity (existing out-of-scope items from the home redesign plan).
