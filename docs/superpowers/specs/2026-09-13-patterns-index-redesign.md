# Patterns Index Redesign

**Date:** 2026-09-13
**Status:** Approved via interactive mockup (`.superpowers/brainstorm/index-redesign/content/index-redesign-v2.html`)
**Area:** `apps/docs` — patterns index under the `(shell)` route group

## Goal

Redesign `/patterns` from a bare grouped list into a sleek layout that matches the floating-acrylic shell adopted in `33e0560`. It keeps all existing client-side filtering behavior but restructures the page into: a header band with a sticky toolbar, a bento category-overview strip that collapses while filtering, floating category cards with refined pattern rows, a proper empty state, and subtle enter animation.

## Design decisions

### 1. Header band

- Mono eyebrow label ("Pattern library"), serif editorial H1 ("All patterns"), subtitle with live counts. Reuses the existing `editorial` display treatment already used on the category pages.
- No page wrapping card — the page lives directly inside the shell's content card.

### 2. Sticky toolbar

- Search field (same visual language as the header search: `bg-input` fill, search icon, rounded) + tag-filter pills (`all | prompt | generation | transparency | control | trust`) + a mono result count.
- The toolbar is `position: sticky; top: 0` within the shell's inner scroll container (the content card), pinned under the acrylic header, with `bg-background/80` + blur + bottom hairline so it reads as a bar. `z-index` below the header; this is the only scroll container in the shell, so it behaves as the "action bar" of the page.
- Keyboard shortcut: `/` focuses the search field; `Escape` clears it and blurs. Site-wide `Ctrl/Cmd+K` already exists in the header — no conflict.

### 3. Bento category strip

- Grid of 5 floating tile cards (1 / 2 / 5 columns at sm / lg), one per category: icon chip, mono count, category name, clamped description, arrow that reveals on hover. Whole tile is a `<Link>` to `/patterns/<category>`.
- **Collapses** (opacity + pointer-events none, removed from layout) whenever a search query or non-`all` tag filter is active, so results stay focused. It returns on clearing.
- Icon chips use a single shared tone (`bg-primary/10 text-primary`) for cohesion — the shell's acrylic canvas already carries the primary tint.

### 4. Category pattern cards

- One floating acrylic card per category that has matches, stacked with an 8px gap. Card header: icon chip, name, description (ellipsized), mono count pill ("N patterns" idle / "N of M" when filtered), and a "View all →" link to the category page.
- The card gets an `interactive`-style hover: border tints toward `--primary` and the shadow lifts, matching the bento tiles.
- Rows live under a top hairline inside the card (`overflow: hidden` so row corners are clipped).

### 5. Pattern row (shared `PatternIndexRow` upgrade)

- Two-line row: mono index (`01`) | name + description | right-aligned meta. `border-t` hairline dividers; rounded flush to the card.
- Hover: `bg-muted/70` row wash, name tints to `--primary`, arrow fades in.
- Meta adds two items on top of the existing tags:
  - A framework-parity chip (mono, `bg-primary/10 text-primary`, e.g. `×4 ⚛` with a `title` explaining "ships in all 4 libraries") — surfaces that every pattern is implemented across all four UI libraries.
  - Tags render first 2 + a dashed `+N` overflow chip instead of only `slice(0, 2)`.
- Query-match highlighting: name and description get a green `<mark>`-style highlight (`text-primary font-semibold`) when a search query is active.

### 6. Empty state

- Reuse the existing `Empty` primitives, but with `border-dashed` + acrylic styling and a "Clear filters" button that resets query + tag. Hidden under normal conditions.

### 7. Micro-animation

- Filtered rows stagger in (`fadeUp` 0.28s, 14ms stagger capped at 420ms) via CSS animation on insertion; fully disabled under `prefers-reduced-motion`.

### 8. Shared row consistency

- `PatternIndexRow` is upgraded once and reused so `/patterns/[category]` inherits the new row design. The category page wraps its rows in the same floating card + card-header treatment (chip, count, "All patterns" back link) so the two pages stay visually consistent.

## Files touched

- `apps/docs/src/components/browse/patterns-index.tsx` — main restructure (header band, sticky toolbar, bento strip, cards, empty state, `/` shortcut).
- `apps/docs/src/components/common/pattern-index-row.tsx` — row restyle (two-line, parity chip, tag overflow, hover states, highlight support).
- `apps/docs/src/app/(shell)/patterns/[category]/page.tsx` — wrap rows in the floating card + card header for consistency.
- Possibly a small `apps/docs/src/components/browse/*` split (e.g. `patterns-bento.tsx`, `patterns-toolbar.tsx`) if `patterns-index.tsx` grows large — keep components small and single-purpose.

## Data & behavior

- No data changes: `categories`, `patterns`, `TAG_FILTERS`, `getFilteredPatterns` all stay. The component remains a `"use client"` component with the same `query` / `tag` state.
- Bento tile counts derive from `getPatternsByCategory(cat.id).length` (already available).
- All links route to the existing dynamic routes.

## Verification

- `pnpm type-check --filter=@patternbase/docs` and `pnpm lint --filter=@patternbase/docs`.
- Manual: idle state shows bento + all cards; every tag pill and query filters correctly; empty state appears and clears; `/` focuses, `Escape` clears; card hover lift; rows animate on change; light + dark mode both read well.
- Confirm `prefers-reduced-motion` disables the stagger.
