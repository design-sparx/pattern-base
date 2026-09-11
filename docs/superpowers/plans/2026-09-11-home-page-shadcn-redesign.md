# Plan: Redesign PatternBase Home Page and Layout with shadcn/ui

## Goal

Remake `@apps/docs/src/app/(home)/page.tsx` and `@apps/docs/src/app/(home)/layout.tsx` for shadcn/ui, incorporating techy UI elements inspired by vite.dev (top banner, filter tabs, resources grid, newsletter section) while using existing shadcn components (`@/components/ui/*`).

## Context

- **shadcn style**: radix-rhea, neutral base color, Tabler icons, CSS variables from `globals.css`
- **Available UI components**: Button, Badge, Card, Input, and ~30+ other shadcn primitives in `@/components/ui/`
- **Existing home components**: `StatsStrip`, `FeaturedPatterns`, `CategoryIndex`, `OriginManifesto` — all use `editorial.module.css` and Tailwind classes directly
- **Current layout.tsx**: wraps `<main>` in `PublicShellLayout` with a fixed `max-w-7xl` container and `PublicHeader`
- **Design direction** (from lavish brainstorm v5): techy aesthetic — gradient text accent, glowing code blocks, animated badges, floating orb backgrounds, clean typography

## Decisions

1. **Keep existing sub-components** (`PublicHeader`, `StatsStrip`, `FeaturedPatterns`, `CategoryIndex`, `OriginManifesto`) but update their styling to match shadcn tokens — they already import shadcn Button; update to remove `editorial.module.css` dependency
2. **Replace editorial.module.css** usage with inline Tailwind classes — the font is still Inter (sans-serif), so we lose the Georgia serif headings in favor of a cleaner tech aesthetic
3. **Add new sections** as new components or inline in page.tsx: top announcement banner, filter tabs, featured resources grid, newsletter signup
4. **Layout changes**: keep the `PublicShellLayout` wrapper but update the container to allow responsive padding. Keep the sticky header

## Implementation Tasks

### Task 1: Add new shared components

Create files in `apps/docs/src/components/home/`:

1.1 **`home-announcement.tsx`**

- Thin top banner (gradient bg, green to violet)
- Text + link inside
- Dismissible via local state (or always visible)
- Props: `text`, `linkText`, `linkHref`

  1.2 **`featured-resources.tsx`**

- 4-column card grid on desktop, 1-col on mobile
- Each card: type badge (uppercase, small), title, excerpt, date
- Props: `resources` array (id, type, title, excerpt, date, href)
- Uses `Card`, `Badge` from shadcn

  1.3 **`newsletter-signup.tsx`**

- Centered card with heading, description, input + button
- Props: `title`, `description`
- Uses `Card`, `Input`, `Button` from shadcn

  1.4 **`pattern-filter-tabs.tsx`**

- Horizontal button group (All, Prompt Actions, etc.)
- Selected state uses primary color
- Props: `categories`, `selected`, `onChange`
- Uses `Button` with `variant="ghost"` and `"default"` for active state, or shadcn `ToggleGroup` if available

### Task 2: Update existing components for shadcn styling

2.1 **`StatsStrip`** (`src/components/home/stats-strip.tsx`)

- Replace `editorial.module.css` with inline Tailwind classes
- Replace `text-violet-600` color classes with `text-primary` (shadcn variable)
- Increase stat number font size, use `font-mono` for values
- Add subtle hover border color change on cards

  2.2 **`FeaturedPatterns`** (`src/components/home/featured-patterns.tsx`)

- Remove `editorial.module.css` dependency
- Use `Card`, `Badge` from shadcn instead of raw divs
- Add hover glow on card interaction
- Add mini code snippet preview at bottom of each card (`<PromptInput />`)

  2.3 **`CategoryIndex`** (`src/components/home/category-index.tsx`)

- Remove `editorial.module.css` dependency
- Use `Card` for each category row instead of inline border
- Replace `text-violet-600` with `text-primary`

  2.4 **`OriginManifesto`** (`src/components/home/origin-manifesto.tsx`)

- Remove `editorial.module.css` dependency
- Replace `editorialKicker` with a `Badge` component
- Replace `editorialDisplay` italic heading with clean sans-serif
- Use `Card` for principle blocks

### Task 3: Rewrite `page.tsx`

3.1 Update imports — add new components, update existing ones
3.2 Structure the page:

- `<AnnouncementBanner />` at top (outside container or within)
- `<PublicHeader />` via layout
- Hero section: section label badge, h1 with gradient-text accent on "AI products", description, CTA buttons, terminal + code block preview
- `<StatsStrip />` in stat-divider grid
- Featured patterns section with `<PatternFilterTabs />` + `<FeaturedPatterns />`
- Browse by intent with `<CategoryIndex />`
- `<OriginManifesto />` (about section)
- Featured resources section: `<FeaturedResources />`
- Newsletter section: `<NewsletterSignup />`
- Footer

3.3 Update `metadata` to reflect any title/description changes
3.4 Remove dependency on `editorial.module.css`

### Task 4: Minimal `layout.tsx` update

4.1 Keep `PublicShellLayout` import
4.2 No structural changes needed — layout already wraps children in the shell
4.3 If header banner is a separate component, it goes in page.tsx (not layout.tsx) since it's content-specific

### Task 5: Update `editorial.module.css` usage

5.1 `editorial.module.css` is still used outside `(home)` in:

- `apps/docs/src/app/(shell)/patterns/[category]/page.tsx`
- `apps/docs/src/components/browse/patterns-index.tsx`
  Do **not** delete this file; keep it until those are also migrated.
  5.2 Home page components no longer import `editorial.module.css`.

## Files to Modify

| File                                        | Action                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/app/(home)/page.tsx`                   | Rewrite content sections, add new components                                 |
| `src/app/(home)/layout.tsx`                 | Minimal — verify it works with new page structure (likely no changes needed) |
| `src/components/home/stats-strip.tsx`       | Remove editorial.css, use shadcn Card/Badge, update typography               |
| `src/components/home/featured-patterns.tsx` | Remove editorial.css, use Card/Badge, add code preview                       |
| `src/components/home/category-index.tsx`    | Remove editorial.css, use Card                                               |
| `src/components/home/origin-manifesto.tsx`  | Remove editorial.css, use Badge for kicker                                   |

## Files to Create

| File                                          | Action                  |
| --------------------------------------------- | ----------------------- |
| `src/components/home/home-announcement.tsx`   | New announcement banner |
| `src/components/home/featured-resources.tsx`  | New resources grid      |
| `src/components/home/newsletter-signup.tsx`   | New newsletter section  |
| `src/components/home/pattern-filter-tabs.tsx` | New filter tabs         |

## Risks & Edge Cases

- **editorial.module.css usage**: Need to check if it's used in other parts of the app beyond `(home)` — if so, don't delete it
- **shadcn component availability**: Verify `Input`, `ToggleGroup` are in `@/components/ui/` before using
- **Design token consistency**: Ensure primary color (oklch green) and violet accent are used consistently
- If `PatternFilterTabs` is client-side only, it needs `"use client"` directive
- Featured patterns data comes from `@/data/patterns` — verify the mock resources for the new section are compatible with the type system

## Validation

- Run `pnpm --filter @apps/docs typecheck` — no TypeScript errors
- Run `pnpm --filter @apps/docs lint` — no ESLint errors
- Visually verify with `pnpm dev` and open localhost
- Check dark mode renders correctly

## Out of Scope

- Implementing actual interactivity (filtering patterns by category, newsletter form submission)
- Adding real featured resources data (use mock data for now)
- Full design system refresh (that's a separate effort)
