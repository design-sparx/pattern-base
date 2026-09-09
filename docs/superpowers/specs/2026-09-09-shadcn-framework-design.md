# Add shadcn as a supported framework in pattern-base

Date: 2026-09-09
Status: Approved

## Overview

PatternBase is a multi-framework React component library publishing one package per
supported UI library (`@patternbase/antd`, `@patternbase/bootstrap`,
`@patternbase/mantine`). Today the docs site advertises "3 UI Frameworks". This change
adds **shadcn/ui** as a fourth supported framework: a new `@patternbase/shadcn` package
implementing all 54 AI UX patterns with identical prop interfaces, plus full wiring into
the docs workbench (previews, code snippets, install commands).

Decisions confirmed with the user:

- Target: `pattern-base` monorepo (not the app-ecosystem `ui-folio`).
- Scope: all 54 patterns, signal-compatible with the other three packages.
- Primitive base: **Radix** (the classic shadcn base; `asChild` triggers).
- Styling: **Tailwind CSS v4** (CSS-first, `@theme inline`, no `tailwind.config.js`).
- Approach: **Approach A** — standard tsup-built package mirroring the existing three,
  with shadcn/ui primitives vendored inside.

## Architecture

### 1. `packages/shadcn` (`@patternbase/shadcn`)

A new workspace package mirroring `packages/mantine` tooling and shape:

- **Config files**: `package.json`, `tsup.config.ts`, `tsconfig.json` (extends root
  base), `.eslintrc.js` (extends `@patternbase/eslint-config/react`),
  `vitest.config.ts` (merges `@patternbase/vitest-config`; jsdom + setup).
- **Scripts**: identical to mantine — `build`, `dev`, `lint`, `lint:fix`, `test`,
  `test:watch`, `type-check`, `clean`. `publishConfig.access: "public"`.
- **Dependencies**:
  - `@patternbase/core` as `workspace:*`.
  - Radix primitives, `lucide-react`, `class-variance-authority`, `clsx`,
    `tailwind-merge` bundled via tsup (`noExternal`) so consumers get "install and go".
  - Peer deps: `react`, `react-dom`; `tailwindcss` (^4) listed for clarity (consumers
    must run a Tailwind build so utility classes resolve).
- **tsup external**: only `react` + `react-dom`. Everything else (including Radix and
  icons) is bundled into the published artifact.
- **CSS entry**: `src/styles.css` — the shadcn v4 theme token set
  (`:root` / `.dark` variables + `@theme inline` block + `@import "tailwindcss"`).
  Exported via a `./styles.css` subpath export and copied into `dist`. Consumers import
  it once as their global stylesheet; the docs app does exactly this.
- **Layout**: `src/index.ts` barrel re-exporting all 54 pattern components (parity with
  `@patternbase/mantine`'s index). `src/components/ui/` holds vendored shadcn
  primitives. `src/components/<pattern>/` holds the 54 implementations.

### 2. Vendored shadcn/ui base primitives

shadcn/ui components are source, so they are generated into the package rather than
hand-written:

- Provision `packages/shadcn` as a mini shadcn project: `components.json` (Radix base,
  Tailwind v4, aliases `@/components/ui` and `@/lib/utils`), `lib/utils.ts` (`cn()`),
  and supporting config so the shadcn CLI emits real source.
- Scaffold via `npx shadcn@latest add --all`, then prune to exactly what the 54
  patterns + docs use. Expected core set: `button`, `card`, `badge`, `avatar`, `tabs`,
  `toggle-group`, `switch`, `checkbox`, `radio-group`, `select`, `slider`, `input`,
  `textarea`, `field`, `field-group`, `input-group`, `dialog`, `dropdown-menu`,
  `popover`, `tooltip`, `separator`, `skeleton`, `accordion`, `collapsible`,
  `scroll-area`, `alert`, `progress`, `label`, toast (sonner), `empty`, `spinner`.
  Prune against a scan of the 54 pattern implementations.
- **Icons**: pattern implementations import from `lucide-react` (shadcn ecosystem
  convention), bundled into the package.
- Reviewed after generation for project conventions: icon props get `data-icon`,
  semantics preserved, no hardcoded colors, etc.

### 3. The 54 pattern components

- Each pattern lives in `src/components/<name>/<name>.tsx` + `index.ts`, with a barrel
  entry in `src/index.ts` — the mantine layout.
- Props come 1:1 from `@patternbase/core` (prop parity is the monorepo rule).
- Compose vendored primitives + `lucide-react` icons per the shadcn skill rules:
  `FieldGroup`/`Field` for form layout (`data-invalid`/`aria-invalid`),
  `InputGroup`/`InputGroupAddon`, `ToggleGroup` for 2–7 options, items inside their
  Groups (`SelectItem` → `SelectGroup`, `DropdownMenuItem` → `DropdownMenuGroup`),
  titles on `Dialog`/`Sheet`, `data-icon` on icons in buttons, `cn()` for conditional
  classes, `gap-*` not `space-*`, `size-*` for equal dims, semantic tokens
  (`bg-background`, `text-muted-foreground`) not raw colors.
- Parity checklist: map the `@mantine/core` primitives each of the 54 mantine
  components uses to their shadcn counterparts; ensure every core prop interface is
  exercised (strict `tsc` enforces it).
- The package emits no `"use client"`; consumers/docs mark the boundary (docs registry
  and slots already are client components).

### 4. Docs site integration

- **Tooling**: add `@patternbase/shadcn` (workspace), `tailwindcss` v4, and
  `@tailwindcss/postcss` to `apps/docs`; add the PostCSS plugin to the app's PostCSS
  config (coexists with `postcss-preset-mantine`); import
  `@patternbase/shadcn/styles.css` in the global stylesheet for preview tokens.
- **Framework type**: `FRAMEWORKS` in
  `apps/docs/src/lib/workbench-params.ts` → `["bootstrap", "antd", "mantine",
"shadcn"]`. Default stays `bootstrap`.
- **Registry**: add `shadcn` to `RegistryEntry` in `src/lib/registry/index.tsx`; create
  `src/lib/registry/shadcn.tsx` mirroring `mantine.tsx` (same demo-data props); include
  it in the merge so all 54 patterns register.
- **Workbench slots**: add `src/components/workbench/framework-slots/shadcn-slot.tsx`
  re-exporting `@patternbase/shadcn` components; register in
  `framework-slots/index.tsx` (lazy/preload); add `INSTALL_COMMANDS["shadcn"]` and
  `FRAMEWORK_SLOTS["shadcn"]` in `preview-pane.tsx`.
- **Snippet generation**: extend `apps/docs/scripts/generate-snippets.ts` to read
  `packages/shadcn/src/components/**` and emit a 4th `shadcn` field (snippet type
  widened); regenerate with `pnpm generate-snippets`.
- **Copy/state updates**: `stats-strip.tsx` (3 → 4 UI Frameworks), `layout.tsx`
  metadata string, `origin-manifesto.tsx` framework mentions; README/CLAUDE entries that
  enumerate frameworks (small edits).

## Verification

- `pnpm type-check --filter=@patternbase/shadcn`
- `pnpm lint --filter=@patternbase/shadcn`
- `pnpm test --filter=@patternbase/shadcn` (vitest, jsdom; representative render tests)
- `pnpm generate-snippets` then `pnpm build --filter=@patternbase/docs` (proves
  registry, install commands, and Tailwind-styled previews compile)
- `pnpm dev` sanity pass toggling the framework selector to shadcn on representative
  patterns (e.g. open-input, parameter-control, citation, disclosure).

## Out of scope

- No changes to `@patternbase/core` interfaces unless shadcn surfaces a genuine gap
  (would be flagged, not silently widened).
- No changes to the existing three framework packages.
- No npm publishing of `@patternbase/shadcn` (release pipeline decision).
