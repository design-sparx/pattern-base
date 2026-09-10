# Add shadcn as a supported framework in pattern-base — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `@patternbase/shadcn` — a fourth framework package implementing all 54 AI UX patterns with prop-parity against `@patternbase/core` — and wire it into the docs workbench (registry, preview slots, snippets, install commands, copy).

**Architecture:** A new `packages/shadcn` workspace package mirrors `packages/mantine`: tsup-compiled CJS+ESM, `@patternbase/core` as the only runtime dependency, Radix-based shadcn/ui primitives vendored under `src/components/ui/`, `lucide-react` for icons, and a Tailwind v4 token theme shipped as `styles.css`. All 54 pattern components are implemented once against that theme. The docs app gains Tailwind v4 (PostCSS plugin + global stylesheet import) and a 4th framework slot end-to-end.

**Tech Stack:** pnpm 9 + Turborepo monorepo · React 18 · TypeScript 5 (strict) · tsup · Vitest + Testing Library (jsdom) · Tailwind CSS v4 (`@tailwindcss/postcss`) · Radix UI primitives · lucide-react · Next.js 16 (docs app) · shadcn CLI (`pnpm dlx shadcn@latest`).

**Spec:** `docs/superpowers/specs/2026-09-09-shadcn-framework-design.md`

---

## Conventions used throughout

- All `pnpm` commands run from the repo root unless a task says otherwise (workdir is stated per task).
- Command style: `pnpm dlx shadcn@latest <...>` (this repo is pnpm; never `npx`).
- Commit style follows commitlint: `feat(shadcn): ...`, `feat(docs): ...`, etc. — lowercase subject, ≤100 chars.
- Pre-commit hooks run prettier on staged files + full `pnpm lint`. Keep each commit small so that stays fast.
- Strict TS: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`. Type-check must pass at the end of every task.
- Named exports only. Component file dirs are kebab-case (`open-input`), barrel `index.ts` per dir.

### Primitive mapping table (Mantine → shadcn)

This table is the authoritative reference for every pattern-porting task in Phase 4. Read it before porting, and follow the shadcn skill rules: `FieldGroup`/`Field` for forms, `InputGroup` when inputs carry add-ons, `ToggleGroup` for 2–7 options, items inside their Groups, `data-icon` on icons in buttons, `cn()` for conditional classes, `gap-*` not `space-*`, `size-*` for equal w+h, semantic tokens (`bg-background`, `text-muted-foreground`) — never raw colors.

| Mantine v7                                | shadcn equivalent                                                                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Stack gap="xs"`                          | `<div className="flex flex-col gap-2">`                                                                                                       |
| `Stack gap="sm"` / `gap="md"`             | `gap-3` / `gap-4`                                                                                                                             |
| `Group gap="xs"` (with `wrap`)            | `<div className="flex flex-wrap items-center gap-2">`                                                                                         |
| `Group justify="space-between"`           | add `justify-between`                                                                                                                         |
| `Text fw={600}` / `fw={500}`              | `font-semibold` / `font-medium`                                                                                                               |
| `Text size="xs"` / `"sm"` / `"lg"`        | `text-xs` / `text-sm` / `text-lg`                                                                                                             |
| `Text c="dimmed"`                         | `text-muted-foreground`                                                                                                                       |
| `Badge variant="light"`                   | `<Badge variant="secondary">`                                                                                                                 |
| `Badge variant="default"` / filled        | `<Badge>` (default)                                                                                                                           |
| `Badge variant="outline"`                 | `<Badge variant="outline">`                                                                                                                   |
| `Card withBorder padding="sm"`            | `<Card><CardContent className="p-3">…`                                                                                                        |
| `Card.Title`                              | `<CardHeader><CardTitle>`                                                                                                                     |
| `.Card.Section`                           | `CardContent`/`CardHeader` as semantically appropriate                                                                                        |
| `Button variant="filled"`                 | `<Button>` (default)                                                                                                                          |
| `Button variant="light"`                  | `<Button variant="secondary">`                                                                                                                |
| `Button variant="subtle"`                 | `<Button variant="ghost">`                                                                                                                    |
| `Button variant="default"`                | `<Button variant="outline">`                                                                                                                  |
| `Button variant="danger"`                 | `<Button variant="destructive">`                                                                                                              |
| `Button size="compact-xs"/"compact-sm"`   | `size="sm"` (+ `className="h-7"` for compact-xs footprints)                                                                                   |
| `ActionIcon` (icon button)                | `<Button size="icon" variant="ghost" aria-label="…"><Icon data-icon />`                                                                       |
| `Textarea`                                | `<Textarea>` (shadcn). `autosize minRows/maxRows` → `rows={1}` + `className="min-h-* max-h-* resize-none"`                                    |
| `Input`                                   | `<Input>`                                                                                                                                     |
| `Slider`                                  | `<Slider value={[n]} onValueChange={(v) => cb(v[0])}>`                                                                                        |
| `Switch onLabel offLabel`                 | `<Switch checked onCheckedChange>`; show `<span className="text-xs text-muted-foreground">` beside it                                         |
| `Select data={...}`                       | Radix `<Select>`: `<SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{options→<SelectItem value={String(opt.value)}>}` |
| `Radio.Group`/`Radio`                     | `<RadioGroup>` + `<RadioGroupItem>` with labels                                                                                               |
| `Checkbox`                                | `<Checkbox checked onCheckedChange>`                                                                                                          |
| `Tabs`                                    | Radix `<Tabs>`: `<TabsList><TabsTrigger>` + `<TabsContent>`                                                                                   |
| `SegmentedControl`                        | `<ToggleGroup type="single">` + `<ToggleGroupItem value>`                                                                                     |
| `Tooltip label`                           | `<TooltipProvider><Tooltip><TooltipTrigger asChild>…` + `<TooltipContent>`                                                                    |
| `Divider`                                 | `<Separator>`                                                                                                                                 |
| `Accordion`                               | Radix `<Accordion type="multiple">` + `<AccordionItem><AccordionTrigger><AccordionContent>`                                                   |
| `ScrollArea`                              | `<ScrollArea>`                                                                                                                                |
| `Loader`                                  | `<Spinner>`                                                                                                                                   |
| `Progress`                                | `<Progress value={n}>`                                                                                                                        |
| `Avatar`                                  | `<Avatar><AvatarImage/><AvatarFallback>` (always include fallback)                                                                            |
| `Menu`/`DropdownMenu`                     | Radix `<DropdownMenu>`; items inside `<DropdownMenuGroup>`                                                                                    |
| `Modal`                                   | Radix `<Dialog>` (always with `<DialogTitle>`)                                                                                                |
| `Popover`                                 | Radix `<Popover>`                                                                                                                             |
| `Alert`/`AlertTitle`/`AlertDescription`   | `<Alert>` + `<AlertTitle>`/`<AlertDescription>`                                                                                               |
| `Notification`/`toast`                    | `toast()` from sonner                                                                                                                         |
| `Chip`                                    | `<Badge variant="outline">` with selected state styled via `cn(...)`                                                                          |
| `Title order={n}`                         | `<h1>…<h6>` with size classes                                                                                                                 |
| `Kbd`/`Code`                              | `<code className="font-mono text-sm">`                                                                                                        |
| `Table`                                   | shadcn `<Table>` + `TableHeader`/`TableBody`/`TableRow`/`TableCell`                                                                           |
| Inline `style={{display:'flex',gap,...}}` | Tailwind classes, combined via `cn()` when conditional                                                                                        |

### Porting protocol (used by Phase 4 tasks)

For each pattern, the mantine implementation in this repo is the **behavioral spec**. Steps:

1. Read `packages/mantine/src/components/<name>/<name>.tsx` and the prop interface in `packages/core/src/types/patterns.ts`.
2. Create `packages/shadcn/src/components/<name>/<name>.tsx` using the mapping table above. Match the mantine export name(s) exactly.
3. Create `packages/shadcn/src/components/<name>/index.ts` with `export { <Name> } from "./<name>";` (mirror `packages/mantine`).
4. Add the export line to `packages/shadcn/src/index.ts` in the same position as `packages/mantine/src/index.ts`.
5. Gate: `pnpm type-check --filter=@patternbase/shadcn` and `pnpm lint --filter=@patternbase/shadcn` both pass.

Per-pattern component/export inventory (source of truth: `packages/mantine/src/index.ts`):

- action-plan → `ActionPlan` · attachments → `Attachments` · auto-fill → `AutoFill` · avatar → `Avatar` · branches → `Branches` · caveat → `Caveat` · chained-action → `ChainedAction` · citation → `Citation`, `CitationsList`, `InlineCitation` · color → `Color` · connectors → `Connectors` · consent → `Consent` · controls → `Controls` · cost-estimate → `CostEstimate` · data-ownership → `DataOwnership` · describe → `Describe` · disclosure → `Disclosure` · draft-mode → `DraftMode` · expand → `Expand` · filters → `Filters` · follow-up → `FollowUp` · footprints → `Footprints` · gallery → `Gallery` · incognito-mode → `IncognitoMode` · initial-cta → `InitialCta` · inline-action → `InlineAction` · inpainting → `Inpainting` · madlibs → `Madlibs` · memory → `Memory` · model-management → `ModelManagement` · modes → `Modes` · nudges → `Nudges` · open-input → `OpenInput` · parameter-control → `ParameterControl` · preset-styles → `PresetStyles` · prompt-details → `PromptDetails` · prompt-enhancer → `PromptEnhancer` · randomize → `Randomize` · references → `References` · regenerate → `Regenerate` · restructure → `Restructure` · restyle → `Restyle` · sample-response → `SampleResponse` · saved-styles → `SavedStyles` · shared-vision → `SharedVision` · stream-of-thought → `StreamOfThought` · suggestions → `Suggestions` · summary → `Summary` · synthesis → `Synthesis` · templates → `Templates` · transform → `Transform` · variations → `Variations` · verification → `Verification` · voice-and-tone → `VoiceAndTone` · watermark → `Watermark`

---

## Phase 1 — Package scaffolding

### Task 1: Scaffold `@patternbase/shadcn` package

**Files:**

- Create: `packages/shadcn/package.json`
- Create: `packages/shadcn/tsconfig.json`
- Create: `packages/shadcn/tsup.config.ts`
- Create: `packages/shadcn/vitest.config.ts`
- Create: `packages/shadcn/.eslintrc.js`
- Create: `packages/shadcn/src/lib/utils.ts`
- Create: `packages/shadcn/src/index.ts`
- Create: `packages/shadcn/src/test/setup.ts`

- [ ] **Step 1: Create `packages/shadcn/package.json`**

```json
{
  "name": "@patternbase/shadcn",
  "version": "0.1.0",
  "description": "shadcn/ui implementation of AI UI components",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup && node -e \"require('node:fs').copyFileSync('src/styles.css', 'dist/styles.css')\"",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "type-check": "tsc --noEmit",
    "clean": "rimraf dist"
  },
  "dependencies": {
    "@patternbase/core": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@patternbase/eslint-config": "workspace:*",
    "@patternbase/vitest-config": "workspace:*",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "eslint": "^8.57.0",
    "jsdom": "^25.0.0",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "rimraf": "^5.0.5",
    "tailwind-merge": "^2.5.2",
    "tailwindcss": "^4.0.0",
    "tsup": "^8.0.1",
    "typescript": "^5.3.3",
    "vitest": "^2.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

> Radix packages and `sonner` are intentionally **not** listed here. Task 3 adds them via the CLI and then splits them out (`dependencies` → `devDependencies`) because tsup externalizes anything in `dependencies`, and we choose to bundle Radix + icons into the published artifact.

- [ ] **Step 2: Create `packages/shadcn/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `packages/shadcn/tsup.config.ts`**

```ts
import { resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  alias: { "@": resolve(__dirname, "src") },
});
```

- [ ] **Step 4: Create `packages/shadcn/vitest.config.ts`**

```ts
import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@patternbase/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [
        require.resolve("@patternbase/vitest-config/setup"),
        resolve(__dirname, "src", "test", "setup.ts"),
      ],
      passWithNoTests: true,
    },
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
  }),
);
```

- [ ] **Step 5: Create `packages/shadcn/.eslintrc.js`**

```js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("@patternbase/eslint-config/react")],
};
```

- [ ] **Step 6: Create `packages/shadcn/src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 7: Create `packages/shadcn/src/test/setup.ts`** (jsdom polyfills Radix needs)

```ts
import "@testing-library/jest-dom/vitest";

if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    ResizeObserverStub as unknown as typeof globalThis.ResizeObserver;
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof globalThis.IntersectionObserver;
}

if (typeof globalThis.matchMedia === "undefined") {
  globalThis.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof globalThis.matchMedia;
}
```

> Note: radix deps aren't installed yet (Task 3), so `pnpm type-check` in Step 9 will only pass once Task 3 lands. Step 9's first run may need `pnpm install` first — that's expected; `lucide-react`, `clsx`, etc. are declared now.

- [ ] **Step 8: Create `packages/shadcn/src/index.ts`** — placeholder so the build has an entry. Populated with the 54 exports as patterns land (Task 4 onwards).

```ts
// Pattern component exports are added here as implementations land
// (mirrors packages/mantine/src/index.ts ordering).
```

> `tsc --noEmit` treats a comment-only file fine. `simple-import-sort/exports` warns (warn-only), so lint stays green.

- [ ] **Step 9: Install and smoke-check the scaffold**

Run:

```bash
pnpm install
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: install completes; type-check passes (`tsc` resolves `clsx`, `tailwind-merge`, `lucide-react` from devDeps); lint exits 0 (only zero or warn-level findings).

- [ ] **Step 10: Commit**

```bash
git add packages/shadcn
git commit -m "feat(shadcn): scaffold @patternbase/shadcn package"
```

---

### Task 2: Theme stylesheet + CSS export

**Files:**

- Create: `packages/shadcn/src/styles.css`

- [ ] **Step 1: Create `packages/shadcn/src/styles.css`**

```css
@import "tailwindcss";

/*
 * Dark-mode variant matches BOTH the `.dark` class (shadcn convention for
 * external consumers) and Mantine's `data-mantine-color-scheme` attribute
 * (so the docs app previews switch seamlessly with the Mantine toggle).
 */
@custom-variant dark (&:where(.dark, .dark *, [data-mantine-color-scheme="dark"], [data-mantine-color-scheme="dark"] *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark,
[data-mantine-color-scheme="dark"] {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}
```

- [ ] **Step 2: Verify the build copies the CSS**

Run:

```bash
pnpm build --filter=@patternbase/shadcn
Test-Path packages/shadcn/dist/styles.css
```

Expected: build succeeds and `dist/styles.css` exists (the build script's `node -e` copy step).

- [ ] **Step 3: Commit**

```bash
git add packages/shadcn/src/styles.css
git commit -m "feat(shadcn): add tailwind v4 theme stylesheet and css export"
```

---

## Phase 2 — Vendored shadcn/ui primitives

### Task 3: Generate the primitive set via the shadcn CLI

**Files:**

- Create: `packages/shadcn/components.json`
- Modify: `packages/shadcn/package.json` (deps triage)
- Generated: `packages/shadcn/src/components/ui/*` (registry), `packages/shadcn/src/hooks/*` (registry), `packages/shadcn/src/lib/utils.ts` (overwritten by CLI with the canonical `cn()`)

- [ ] **Step 1: Create `packages/shadcn/components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

> The CLI may expect a `"base": "radix"` key under newer registry schemas. If `add` reports an unknown/invalid config key, add `"base": "radix"` at the top level of `components.json` and re-run. Verify the current schema first with `pnpm dlx shadcn@latest init --help` / `info --json` if anything is ambiguous.

- [ ] **Step 2: Add the primitive set**

Run (workdir: `packages/shadcn`):

```bash
pnpm dlx shadcn@latest add badge button card avatar tabs toggle-group switch checkbox radio-group select slider input textarea label dialog dropdown-menu popover tooltip separator skeleton accordion collapsible scroll-area alert progress sonner field field-group input-group spinner empty
```

Expected: `.tsx` files written under `src/components/ui/`, `src/lib/utils.ts` overwritten with the canonical `cn()`, and the CLI appends Radix/utility dependencies to `package.json` `dependencies`.

If any listed component is not on the current registry (404), note it and hand-author a minimal equivalent under `src/components/ui/<name>/index.tsx` **following the shadcn skill rules** and using the primitives we already have (e.g. `field`/`field-group`/`input-group`/`spinner`/`empty` can be small compositions of `label`, wrapper divs with `cn()`, and the `Spinner`-equivalent markup). Record which were hand-authored in the commit message.

- [ ] **Step 3: Triage deps so tsup bundles them**

Move every entry the CLI added to `package.json` under `dependencies` — the `@radix-ui/react-*` packages, `sonner`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `embla-carousel-react` (if any component pulled it), `vaul` (if any component pulled it) — into `devDependencies`, leaving `@patternbase/core` as the only `dependencies` entry. Keep `react`, `react-dom`, `tailwindcss` under `peerDependencies`.

- [ ] **Step 4: Re-install**

Run:

```bash
pnpm install
```

- [ ] **Step 5: Verify primitives compile**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm build --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: all pass. `lint` may surface `simple-import-sort` warnings on generated files — acceptable (warn-only), but fix anything that is a hard error.

- [ ] **Step 6: Review vendored primitives**

Read every file under `src/components/ui/`. Fix any of these before moving on:

- Imports that reference other registries' paths (e.g. `../../components/ui/...`) instead of `@/components/ui/...` or `@/lib/utils`.
- Icon imports that don't use `lucide-react`.
- Missing `aria-*` attributes or missing `sizes`/`asChild` correctness. Keep generated code as close to upstream as possible — only patch what violates our conventions (aliasing, icons).
- Confirm `src/lib/utils.ts` exports `cn` (the CLI version is identical in behavior to Task 1's).

- [ ] **Step 7: Commit**

```bash
git add packages/shadcn/components.json packages/shadcn/src packages/shadcn/package.json
git commit -m "feat(shadcn): vendor radix-based shadcn/ui primitives
```

---

## Phase 3 — Canonical pattern implementations (complete code)

These four tasks use full shadcn implementations and one test each. They establish the house style for every port in Phase 4.

### Task 4: `open-input`

**Files:**

- Create: `packages/shadcn/src/components/open-input/open-input.tsx`
- Create: `packages/shadcn/src/components/open-input/index.ts`
- Modify: `packages/shadcn/src/index.ts`
- Test: `packages/shadcn/src/components/open-input/open-input.test.tsx`

- [ ] **Step 1: Write the test first**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OpenInput } from "./open-input";

describe("OpenInput", () => {
  it("submits trimmed input and clears the field", async () => {
    const onSubmit = vi.fn();
    render(<OpenInput onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText("Ask anything...");
    await userEvent.type(textarea, "  hello  ");
    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("hello");
    expect(textarea).toHaveValue("");
  });

  it("does not submit empty input", async () => {
    const onSubmit = vi.fn();
    render(<OpenInput onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders suggestion badges", () => {
    render(<OpenInput onSubmit={vi.fn()} suggestions={["Alpha", "Beta"]} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});
```

> `@testing-library/user-event` is a transitive dep of `@testing-library/react` in this monorepo but must be explicit: add `"@testing-library/user-event": "^14.5.2"` to `devDependencies` and run `pnpm install`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec vitest run src/components/open-input/open-input.test.tsx` (workdir: `packages/shadcn`)
Expected: FAIL — component module not found.

- [ ] **Step 3: Implement `open-input.tsx`**

```tsx
import { Send } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import type { OpenInputProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function OpenInput({
  placeholder = "Ask anything...",
  onSubmit,
  isLoading = false,
  suggestions = [],
  maxLength,
}: OpenInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {suggestions.length > 0 && !value ? (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setValue(s);
                  textareaRef.current?.focus();
                }}
              >
                {s}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            maxLength={maxLength}
            className="max-h-28 min-h-9 flex-1 resize-none"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!value.trim() || isLoading}
                aria-label={isLoading ? "Generating..." : "Send"}
              >
                <Send data-icon="inline-start" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isLoading ? "Generating..." : "Send"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

- [ ] **Step 4: Create `open-input/index.ts`**

```ts
export { OpenInput } from "./open-input";
```

- [ ] **Step 5: Add the barrel export**

Append to `packages/shadcn/src/index.ts` (alphabetical position, matching `packages/mantine/src/index.ts`):

```ts
export { OpenInput } from "./components/open-input";
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `pnpm exec vitest run src/components/open-input/open-input.test.tsx` (workdir: `packages/shadcn`)
Expected: PASS (3/3).

- [ ] **Step 7: Type-check and lint**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: both pass.

- [ ] **Step 8: Commit**

```bash
git add packages/shadcn/src/components/open-input packages/shadcn/src/index.ts packages/shadcn/package.json
git commit -m "feat(shadcn): implement open-input pattern"
```

---

### Task 5: `suggestions`

**Files:**

- Create: `packages/shadcn/src/components/suggestions/suggestions.tsx`
- Create: `packages/shadcn/src/components/suggestions/index.ts`
- Modify: `packages/shadcn/src/index.ts`
- Test: `packages/shadcn/src/components/suggestions/suggestions.test.tsx`

- [ ] **Step 1: Write the test first**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { StarterPrompt } from "@patternbase/core";

import { Suggestions } from "./suggestions";

const prompts: StarterPrompt[] = [
  { id: "1", title: "Summarize", description: "Condense this" },
  { id: "2", title: "Translate" },
];

describe("Suggestions", () => {
  it("renders card variant as a grid", () => {
    render(
      <Suggestions suggestions={prompts} onSelect={vi.fn()} variant="card" />,
    );
    expect(screen.getByText("Summarize")).toBeInTheDocument();
    expect(screen.getByText("Condense this")).toBeInTheDocument();
  });

  it("renders chip variant as badges", () => {
    render(
      <Suggestions suggestions={prompts} onSelect={vi.fn()} variant="chip" />,
    );
    expect(screen.getByText("Translate")).toBeInTheDocument();
  });

  it("calls onSelect with the clicked suggestion", async () => {
    const onSelect = vi.fn();
    render(
      <Suggestions suggestions={prompts} onSelect={onSelect} variant="card" />,
    );
    await userEvent.click(screen.getByText("Translate"));
    expect(onSelect).toHaveBeenCalledWith(prompts[1]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec vitest run src/components/suggestions/suggestions.test.tsx` (workdir: `packages/shadcn`)
Expected: FAIL.

- [ ] **Step 3: Implement `suggestions.tsx`**

```tsx
import type { SuggestionsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Suggestions({
  suggestions,
  onSelect,
  columns = 2,
  variant = "card",
}: SuggestionsProps) {
  if (variant === "chip") {
    return (
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <Badge
            key={s.id}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => {
              onSelect(s);
            }}
          >
            {s.icon ? <span className="mr-1">{s.icon}</span> : null}
            {s.title}
          </Badge>
        ))}
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-3"
        : "grid-cols-4";

  return (
    <div className={cn("grid gap-2", gridClass)}>
      {suggestions.map((s) => (
        <Card
          key={s.id}
          className="cursor-pointer"
          onClick={() => {
            onSelect(s);
          }}
        >
          <CardContent className="flex flex-col gap-1 p-3">
            <div className="text-sm font-semibold">
              {s.icon ? <span className="mr-1.5">{s.icon}</span> : null}
              {s.title}
            </div>
            {s.description ? (
              <p className="text-muted-foreground text-xs">{s.description}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `suggestions/index.ts`**

```ts
export { Suggestions } from "./suggestions";
```

- [ ] **Step 5: Add the barrel export**

Append to `packages/shadcn/src/index.ts`:

```ts
export { Suggestions } from "./components/suggestions";
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `pnpm exec vitest run src/components/suggestions/suggestions.test.tsx` (workdir: `packages/shadcn`)
Expected: PASS (3/3).

- [ ] **Step 7: Type-check and lint**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: both pass.

- [ ] **Step 8: Commit**

```bash
git add packages/shadcn/src/components/suggestions packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement suggestions pattern"
```

---

### Task 6: `parameter-control`

**Files:**

- Create: `packages/shadcn/src/components/parameter-control/parameter-control.tsx`
- Create: `packages/shadcn/src/components/parameter-control/index.ts`
- Modify: `packages/shadcn/src/index.ts`
- Test: `packages/shadcn/src/components/parameter-control/parameter-control.test.tsx`

- [ ] **Step 1: Write the test first**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ParameterControlItem } from "@patternbase/core";

import { ParameterControl } from "./parameter-control";

const parameters: ParameterControlItem[] = [
  {
    id: "temp",
    label: "Temperature",
    type: "slider",
    value: 50,
    min: 0,
    max: 100,
  },
  { id: "stream", label: "Streaming", type: "toggle", value: true },
  {
    id: "model",
    label: "Model",
    type: "select",
    value: "gpt-4",
    options: [
      { label: "GPT-4", value: "gpt-4" },
      { label: "Claude", value: "claude" },
    ],
  },
];

describe("ParameterControl", () => {
  it("renders the title and each type", () => {
    render(
      <ParameterControl
        parameters={parameters}
        onChange={vi.fn()}
        title="Settings"
      />,
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("Streaming")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
  });

  it("dispatches slider changes", () => {
    const onChange = vi.fn();
    render(
      <ParameterControl parameters={[parameters[0]!]} onChange={onChange} />,
    );
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: 70 } });
    expect(onChange).toHaveBeenCalled();
  });

  it("dispatches toggle changes and select changes", async () => {
    const onChange = vi.fn();
    render(
      <ParameterControl parameters={parameters.slice(1)} onChange={onChange} />,
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith("stream", false);
    await userEvent.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: "Claude" });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith("model", "claude");
  });
});
```

> `fireEvent` is imported from `@testing-library/react`. Radix Slider maps keyboard/pointer events; the `fireEvent.change` assertion only asserts the callback fired, which keeps the test robust. If the Radix Slider's `onValueChange` needs a real pointer interaction in jsdom, add `PointerEvent` to the test setup instead of weakening the assertion:

```ts
if (typeof globalThis.PointerEvent === "undefined") {
  // radix slider uses pointer events; jsdom lacks PointerEvent
  globalThis.PointerEvent = MouseEvent as unknown as typeof PointerEvent;
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec vitest run src/components/parameter-control/parameter-control.test.tsx` (workdir: `packages/shadcn`)
Expected: FAIL.

- [ ] **Step 3: Implement `parameter-control.tsx`**

```tsx
import { Info } from "lucide-react";

import type {
  ParameterControlItem,
  ParameterControlProps,
} from "@patternbase/core";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MatrixControlProps {
  param: ParameterControlItem;
  onChange: (id: string, value: unknown) => void;
}

function MatrixControl({ param, onChange }: MatrixControlProps) {
  const matrixValue = (param.value ?? {}) as Record<string, number>;
  const xLabel = param.options?.[0]?.label ?? "X Axis";
  const yLabel = param.options?.[1]?.label ?? "Y Axis";
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-muted-foreground text-xs">{xLabel}</p>
        <Slider
          value={[matrixValue.x ?? 50]}
          onValueChange={(v) => {
            onChange(param.id, { ...matrixValue, x: v[0] ?? 50 });
          }}
        />
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{yLabel}</p>
        <Slider
          value={[matrixValue.y ?? 50]}
          onValueChange={(v) => {
            onChange(param.id, { ...matrixValue, y: v[0] ?? 50 });
          }}
        />
      </div>
    </div>
  );
}

export function ParameterControl({
  parameters,
  onChange,
  title = "Parameters",
  layout = "vertical",
}: ParameterControlProps) {
  return (
    <div className="flex flex-col gap-4">
      {title ? <div className="text-base font-semibold">{title}</div> : null}

      <div
        className={cn(
          "flex flex-col gap-3",
          layout === "horizontal" && "flex-row flex-wrap",
        )}
      >
        {parameters.map((param) => (
          <div
            key={param.id}
            className={cn(
              "flex flex-col gap-2",
              layout === "horizontal" && "w-[200px]",
            )}
          >
            <div className="flex items-center gap-1 text-sm font-medium">
              {param.label}
              {param.description ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="opacity-50"
                        aria-label={`${param.label} info`}
                      >
                        <Info className="size-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{param.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>

            {param.type === "slider" ? (
              <>
                <Slider
                  min={param.min ?? 0}
                  max={param.max ?? 100}
                  step={param.step ?? 1}
                  value={[param.value as number]}
                  onValueChange={(v) => {
                    onChange(param.id, v[0] ?? 0);
                  }}
                />
                <p className="text-muted-foreground text-xs">
                  Current: {String(param.value)}
                </p>
              </>
            ) : null}

            {param.type === "toggle" ? (
              <Switch
                checked={param.value as boolean}
                onCheckedChange={(checked) => {
                  onChange(param.id, checked);
                }}
              />
            ) : null}

            {param.type === "select" ? (
              <Select
                value={param.value as string}
                onValueChange={(v) => {
                  onChange(param.id, v);
                }}
              >
                <SelectTrigger aria-label={param.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {param.options?.map((opt) => (
                      <SelectItem
                        key={String(opt.value)}
                        value={String(opt.value)}
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : null}

            {param.type === "matrix" ? (
              <MatrixControl param={param} onChange={onChange} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `parameter-control/index.ts`**

```ts
export { ParameterControl } from "./parameter-control";
```

- [ ] **Step 5: Add the barrel export**

Append to `packages/shadcn/src/index.ts`:

```ts
export { ParameterControl } from "./components/parameter-control";
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `pnpm exec vitest run src/components/parameter-control/parameter-control.test.tsx` (workdir: `packages/shadcn`)
Expected: PASS (3/3).

- [ ] **Step 7: Type-check and lint**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: both pass.

- [ ] **Step 8: Commit**

```bash
git add packages/shadcn/src/components/parameter-control packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement parameter-control pattern"
```

---

### Task 7: `citation` (Citation + CitationsList + InlineCitation)

**Files:**

- Create: `packages/shadcn/src/components/citation/citation.tsx`
- Create: `packages/shadcn/src/components/citation/index.ts`
- Modify: `packages/shadcn/src/index.ts`

Port the behavior of `packages/mantine/src/components/citation/citation.tsx` (three named exports) using the mapping table.

- [ ] **Step 1: Implement `citation.tsx`**

```tsx
import { useState } from "react";

import type {
  CitationProps,
  CitationsListProps,
  InlineCitationProps,
} from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getRelevanceLabel(score: number) {
  if (score >= 0.8) return "High";
  if (score >= 0.5) return "Medium";
  return "Low";
}

export function Citation({ citation }: CitationProps) {
  const [expanded, setExpanded] = useState(false);
  const { source, url, snippet, relevance = 1 } = citation;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm font-semibold">
                  {source}
                </span>
                <Badge variant="secondary">
                  {getRelevanceLabel(relevance)} Relevance
                </Badge>
              </div>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-xs underline"
                >
                  {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                </a>
              ) : null}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            >
              {expanded ? "Hide" : "View"} excerpt
            </Button>
          </div>

          {expanded && snippet ? (
            <p className="border-primary text-muted-foreground border-l-[3px] pl-3 text-sm italic">
              &ldquo;{snippet}&rdquo;
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function CitationsList({
  citations,
  title = "Sources",
  maxVisible = 3,
}: CitationsListProps) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? citations : citations.slice(0, maxVisible);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <Badge variant="secondary">{citations.length}</Badge>
      </div>

      {display.map((c) => (
        <Citation key={c.id} citation={c} />
      ))}

      {citations.length > maxVisible ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setShowAll((prev) => !prev);
          }}
        >
          {showAll
            ? "Show fewer"
            : `Show ${String(citations.length - maxVisible)} more`}
        </Button>
      ) : null}
    </div>
  );
}

export function InlineCitation({
  citationNumber,
  source,
  url,
}: InlineCitationProps) {
  return (
    <sup>
      <a
        href={url ?? "#"}
        title={source}
        className={cn(
          "bg-primary text-primary-foreground ml-0.5 rounded px-1 text-[10px] no-underline",
        )}
      >
        [{citationNumber}]
      </a>
    </sup>
  );
}
```

- [ ] **Step 2: Create `citation/index.ts`**

```ts
export { Citation, CitationsList, InlineCitation } from "./citation";
```

- [ ] **Step 3: Add barrel exports**

Append to `packages/shadcn/src/index.ts` (match mantine's line):

```ts
export { Citation, CitationsList, InlineCitation } from "./components/citation";
```

- [ ] **Step 4: Type-check and lint**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
```

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add packages/shadcn/src/components/citation packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement citation pattern"
```

---

## Phase 4 — Remaining pattern ports

The remaining 50 patterns follow the **Porting protocol** above, grouped by category. Each task's acceptance gate is the same: both type-check and lint pass, and the full package test suite stays green.

> **ICON RULE:** Where a mantine impl imports `@tabler/icons-react`, map to the closest `lucide-react` icon by name (e.g. `IconSend` → `Send`, `IconRobot` → `Bot`, `IconPlus` → `Plus`, `IconDownload` → `Download`, `IconTrash` → `Trash2`, `IconRefresh` → `RefreshCw`, `IconCopy` → `Copy`, `IconCheck` → `Check`, `IconX` → `X`, `IconChevronDown` → `ChevronDown`, `IconShuffle` → `Shuffle`, `IconInfoCircle` → `Info`, `IconSparkles` → `Sparkles`). Search the local node_modules icon list if in doubt.

### Task 8: Prompt Actions — remaining 12 patterns

**Files:** Create `packages/shadcn/src/components/<name>/<name>.tsx` + `<name>/index.ts` for each; append a barrel export line to `packages/shadcn/src/index.ts` per pattern.

Patterns: `auto-fill` (`AutoFill`) · `chained-action` (`ChainedAction`) · `describe` (`Describe`) · `expand` (`Expand`) · `inline-action` (`InlineAction`) · `inpainting` (`Inpainting`) · `madlibs` (`Madlibs`) · `regenerate` (`Regenerate`) · `restructure` (`Restructure`) · `restyle` (`Restyle`) · `summary` (`Summary`) · `transform` (`Transform`)

- [ ] **Step 1: Port each pattern** following the Porting protocol. Read the mantine file, read the core props, implement with the mapping table, add the barrel export.
- [ ] **Step 2: Render smoke test for two representative UI-heavy patterns**

Create `packages/shadcn/src/components/regenerate/regenerate.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Regenerate } from "./regenerate";

describe("Regenerate", () => {
  it("renders and triggers the action", async () => {
    const onRegenerate = vi.fn();
    render(<Regenerate onRegenerate={onRegenerate} variant="button" />);
    const button = screen.getByRole("button", { name: /regenerate/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onRegenerate).toHaveBeenCalled();
  });
});
```

Create `packages/shadcn/src/components/summary/summary.test.tsx` (adjusted to whatever controls `Summary` exposes):

```tsx
import { render, screen } from "@testing-library/react";

import { Summary } from "./summary";

describe("Summary", () => {
  it("renders content", () => {
    render(<Summary content="Long text" title="Research Summary" />);
    expect(screen.getByText("Research Summary")).toBeInTheDocument();
  });
});
```

Adjust both tests to the actual props of the ported components (title text, button accessible name). If the port differs in structure, update the assertions to match the component's accessible output — the tests must pass, not be deleted.

- [ ] **Step 3: Type-check, lint, test**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
pnpm test --filter=@patternbase/shadcn
```

Expected: all pass (test suite = 4 canonical tests + these 2).

- [ ] **Step 4: Commit**

```bash
git add packages/shadcn/src/components packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement prompt-actions patterns"
```

### Task 9: Wayfinders — remaining 7 patterns

**Files:** Same shape as Task 8.

Patterns: `follow-up` (`FollowUp`) · `gallery` (`Gallery`) · `initial-cta` (`InitialCta`) · `nudges` (`Nudges`) · `prompt-details` (`PromptDetails`) · `randomize` (`Randomize`) · `templates` (`Templates`)

- [ ] **Step 1: Port each pattern** per the Porting protocol (mantine files are in-repo; stack `Stack`/`Group`/`Text` → mapped Tailwind layouts; `SimpleGrid cols={n}` → `grid-cols-*` via `cn`).
- [ ] **Step 2: Type-check, lint, test**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
pnpm test --filter=@patternbase/shadcn
```

Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add packages/shadcn/src/components packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement wayfinders patterns"
```

### Task 10: Tuners — remaining 9 patterns

**Files:** Same shape as Task 8. Also create `packages/shadcn/src/components/gallery/gallery.test.tsx` and `attachments/attachments.test.tsx`? — see Step 1 note.

Patterns: `attachments` (`Attachments`) · `connectors` (`Connectors`) · `filters` (`Filters`) · `model-management` (`ModelManagement`) · `modes` (`Modes`) · `preset-styles` (`PresetStyles`) · `prompt-enhancer` (`PromptEnhancer`) · `saved-styles` (`SavedStyles`) · `voice-and-tone` (`VoiceAndTone`)

- [ ] **Step 1: Port each pattern** per the Porting protocol. `SegmentedControl` on `modes` → `ToggleGroup`; `filters` radio/checkbox groups → `RadioGroup`/`Checkbox` inside `FieldSet`+`FieldLegend`; `attachments` dropzone behavior → keep the existing `onAdd(File[])` prop, render a button/input fallback for the demo (no actual drag-drop wiring needed); slider axes on `voice-and-tone` → `Slider`, controlled bounds from `VoiceToneAxis`.
- [ ] **Step 2: Render smoke test for one richer pattern**

Create `packages/shadcn/src/components/modes/modes.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ModeOption } from "@patternbase/core";

import { Modes } from "./modes";

const modes: ModeOption[] = [
  { id: "fast", label: "Fast" },
  { id: "balanced", label: "Balanced" },
  { id: "creative", label: "Creative" },
];

describe("Modes", () => {
  it("renders all options", () => {
    render(
      <Modes
        modes={modes}
        selectedModeId="balanced"
        onModeChange={vi.fn()}
        variant="segmented"
      />,
    );
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Balanced")).toBeInTheDocument();
    expect(screen.getByText("Creative")).toBeInTheDocument();
  });

  it("dispatches selection", async () => {
    const onModeChange = vi.fn();
    render(
      <Modes
        modes={modes}
        selectedModeId="balanced"
        onModeChange={onModeChange}
        variant="segmented"
      />,
    );
    await userEvent.click(screen.getByText("Creative"));
    expect(onModeChange).toHaveBeenCalledWith("creative");
  });
});
```

Adjust to the ported component's actual output if needed; tests must pass, not be deleted.

- [ ] **Step 3: Type-check, lint, test**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
pnpm test --filter=@patternbase/shadcn
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add packages/shadcn/src/components packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement tuners patterns"
```

### Task 11: Governors — remaining 13 patterns

**Files:** Same shape as Task 8.

Patterns: `action-plan` (`ActionPlan`) · `branches` (`Branches`) · `controls` (`Controls`) · `cost-estimate` (`CostEstimate`) · `draft-mode` (`DraftMode`) · `memory` (`Memory`) · `references` (`References`) · `sample-response` (`SampleResponse`) · `shared-vision` (`SharedVision`) · `stream-of-thought` (`StreamOfThought`) · `synthesis` (`Synthesis`) · `variations` (`Variations`) · `verification` (`Verification`)

- [ ] **Step 1: Port each pattern** per the Porting protocol. `stream-of-thought` collapsible → `Accordion` or `Collapsible`; `cost-estimate` token table → shadcn `Table`; `references`/`memory` lists → `Card` + mapped rows.
- [ ] **Step 2: Render smoke test for `stream-of-thought`**

Create `packages/shadcn/src/components/stream-of-thought/stream-of-thought.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";

import type { ThoughtStep } from "@patternbase/core";

import { StreamOfThought } from "./stream-of-thought";

const steps: ThoughtStep[] = [
  {
    id: "1",
    type: "thinking",
    content: "Decompose the problem",
    timestamp: new Date(),
  },
  { id: "2", type: "action", content: "Fetch data", timestamp: new Date() },
];

describe("StreamOfThought", () => {
  it("renders steps", () => {
    render(<StreamOfThought steps={steps} />);
    expect(screen.getByText("Decompose the problem")).toBeInTheDocument();
    expect(screen.getByText("Fetch data")).toBeInTheDocument();
  });
});
```

Adjust assertions to actual output; tests must pass, not be deleted.

- [ ] **Step 3: Type-check, lint, test**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
pnpm test --filter=@patternbase/shadcn
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add packages/shadcn/src/components packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement governors patterns"
```

### Task 12: Trust Builders — remaining 8 patterns

**Files:** Same shape as Task 8.

Patterns: `avatar` (`Avatar`) · `caveat` (`Caveat`) · `color` (`Color`) · `consent` (`Consent`) · `data-ownership` (`DataOwnership`) · `footprints` (`Footprints`) · `incognito-mode` (`IncognitoMode`) · `watermark` (`Watermark`)

- [ ] **Step 1: Port each pattern** per the Porting protocol. `consent` modal variant → `Dialog`; `caveat` banner → `Alert`; `disclosure`-style text placement inside `consent`/`watermark` uses the same badge/alert patterns from Task 4–7.
- [ ] **Step 2: Render smoke test for `avatar` and `caveat`**

Create `packages/shadcn/src/components/avatar/avatar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";

import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders fallback initials", () => {
    render(<Avatar name="Ada Lovelace" persona="Analyst" />);
    expect(screen.getByText(/lovelace|ada|analyst/i)).toBeInTheDocument();
  });
});
```

Create `packages/shadcn/src/components/caveat/caveat.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";

import { Caveat } from "./caveat";

describe("Caveat", () => {
  it("renders the message", () => {
    render(<Caveat message="AI output may be inaccurate." variant="banner" />);
    expect(screen.getByText(/AI output may be inaccurate/)).toBeInTheDocument();
  });
});
```

Adjust assertions to actual output; tests must pass, not be deleted.

- [ ] **Step 3: Type-check, lint, test**

Run:

```bash
pnpm type-check --filter=@patternbase/shadcn
pnpm lint --filter=@patternbase/shadcn
pnpm test --filter=@patternbase/shadcn
```

Expected: all pass.

- [ ] **Step 4: Parity audit — confirm all 54 exports**

Compare `packages/shadcn/src/index.ts` with `packages/mantine/src/index.ts`: every export line present with matching export names. Also grep the build output:

Run:

```bash
pnpm build --filter=@patternbase/shadcn
node -e "const p=require('@patternbase/shadcn'); console.log(Object.keys(p).length)"
```

Expected: build passes and 54 named exports are reported (3 exports in `citation` count separately).

- [ ] **Step 5: Commit**

```bash
git add packages/shadcn/src/components packages/shadcn/src/index.ts
git commit -m "feat(shadcn): implement trust-builders patterns"
```

---

## Phase 5 — Docs site integration

### Task 13: Tailwind in the docs app

**Files:**

- Modify: `apps/docs/package.json`
- Modify: `apps/docs/next.config.mjs`
- Modify: `apps/docs/postcss.config.cjs`
- Modify: `apps/docs/src/app/globals.css`

- [ ] **Step 1: Add deps**

Run (workdir: `apps/docs`):

```bash
pnpm add @patternbase/shadcn@workspace:* tailwindcss @tailwindcss/postcss
```

Expected: `@patternbase/shadcn` under `dependencies`, `tailwindcss` + `@tailwindcss/postcss` under `dependencies` (they are build-time — move them to `devDependencies` if your team prefers; either is consistent with this monorepo's existing usage of `postcss-preset-mantine` in `devDependencies`, so prefer `-D`):

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

- [ ] **Step 2: Update `apps/docs/next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@patternbase/core",
    "@patternbase/bootstrap",
    "@patternbase/antd",
    "@patternbase/mantine",
    "@patternbase/shadcn",
  ],
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: true }];
  },
};

export default nextConfig;
```

- [ ] **Step 3: Update `apps/docs/postcss.config.cjs`**

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
  },
};
```

- [ ] **Step 4: Update `apps/docs/src/app/globals.css`**

Add the shadcn stylesheet import (CSS `@import` rules must stay at the top) and a Tailwind `@source` for the package's component source so utilities used there are generated:

```css
@import "@mantine/core/styles.css";
@import "@mantine/spotlight/styles.css";
@import "@patternbase/shadcn/styles.css";

@source "../../../../packages/shadcn/src/components";

:root {
  --header-height: 60px;
}
```

Leave everything else in `globals.css` unchanged.

- [ ] **Step 5: Verify docs compile**

Run (workdir: `apps/docs`): `pnpm build`
Expected: Next build succeeds. If Tailwind reports it cannot find content (`@source` did not resolve), adjust the path — the correct relative path from `apps/docs/src/app/` to `packages/shadcn/src/components` is `../../../../packages/shadcn/src/components`.
If a CSS ordering/build conflict arises between Tailwind and Mantine PostCSS plugins (e.g. `@import "tailwindcss"` must resolve), confirm `@tailwindcss/postcss` is registered in `postcss.config.cjs` and rerun.

- [ ] **Step 6: Commit**

```bash
git add apps/docs/package.json apps/docs/next.config.mjs apps/docs/postcss.config.cjs apps/docs/src/app/globals.css
git commit -m "feat(docs): add tailwind v4 and shadcn styles to docs app"
```

### Task 14: Framework type, registry, slots, preview pane

**Files:**

- Modify: `apps/docs/src/lib/workbench-params.ts`
- Create: `apps/docs/src/lib/registry/shadcn.tsx`
- Modify: `apps/docs/src/lib/registry/index.tsx`
- Create: `apps/docs/src/components/workbench/framework-slots/shadcn-slot.tsx`
- Modify: `apps/docs/src/components/workbench/framework-slots/index.tsx`
- Modify: `apps/docs/src/components/workbench/preview-pane.tsx`
- Modify: `apps/docs/src/components/workbench/inspector-pane.tsx`

- [ ] **Step 1: Extend `workbench-params.ts`**

Change line 1 to a 4-framework tuple (keep `bootstrap` as default):

```ts
export const FRAMEWORKS = ["bootstrap", "antd", "mantine", "shadcn"] as const;
export type Framework = (typeof FRAMEWORKS)[number];
```

- [ ] **Step 2: Create `registry/shadcn.tsx`**

Copy `apps/docs/src/lib/registry/mantine.tsx` and apply a mechanical transform (do not hand-rewrite): replace the import source `@patternbase/mantine` → `@patternbase/shadcn`, replace the `Mn` import-prefix → `Sh`, rename the export `mantineRegistry` → `shadcnRegistry`. Keep the `demo-*` imports from `@/data/demo-data` and the exact JSX props identical.

Resulting file starts:

```tsx
"use client";

import * as React from "react";

import {
  ActionPlan as ShActionPlan,
  Attachments as ShAttachments,
  ... // one Sh-prefixed alias per pattern, from @patternbase/shadcn
} from "@patternbase/shadcn";

import { /* demo-* imports, unchanged */ } from "@/data/demo-data";

const noop = () => {
  /* no-op for demo callbacks */
};

export const shadcnRegistry: Record<string, React.ComponentType | undefined> = {
  "open-input": () => (
    <ShOpenInput
      placeholder="Ask me anything..."
      onSubmit={noop}
      suggestions={["Write a poem", "Summarize this article", "Translate to French"]}
    />
  ),
  // ... one entry per pattern, Sh-prefixed components
};
```

Verify `shadcnRegistry` contains all 54 pattern ids and compiles: `pnpm exec tsc --noEmit` (workdir: `apps/docs`).

> If any pattern's demo props reference a prop the shadcn component handled differently, the tsc run surfaces it — fix by adjusting the registry entry to the canonical shared props only (the same shape the other registries use), never by loosening `@patternbase/shadcn` types.

- [ ] **Step 3: Update `registry/index.tsx`**

```tsx
"use client";

import type * as React from "react";

import { antdRegistry } from "./antd";
import { bootstrapRegistry } from "./bootstrap";
import { mantineRegistry } from "./mantine";
import { shadcnRegistry } from "./shadcn";

export interface RegistryEntry {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
  mantine: React.ComponentType;
  shadcn: React.ComponentType;
}

const ids = [
  ...new Set([
    ...Object.keys(bootstrapRegistry),
    ...Object.keys(antdRegistry),
    ...Object.keys(mantineRegistry),
    ...Object.keys(shadcnRegistry),
  ]),
];

export const componentRegistry: Record<string, RegistryEntry> =
  Object.fromEntries(
    ids.flatMap((id) => {
      const bootstrap = bootstrapRegistry[id];
      const antd = antdRegistry[id];
      const mantine = mantineRegistry[id];
      const shadcn = shadcnRegistry[id];
      return bootstrap && antd && mantine && shadcn
        ? [[id, { bootstrap, antd, mantine, shadcn }]]
        : [];
    }),
  );
```

- [ ] **Step 4: Create `framework-slots/shadcn-slot.tsx`**

```tsx
"use client";

import { shadcnRegistry } from "@/lib/registry/shadcn";

interface SlotProps {
  patternId: string;
}

export function ShadcnSlot({ patternId }: SlotProps) {
  const Component = shadcnRegistry[patternId];
  if (!Component) return null;
  return <Component />;
}
```

- [ ] **Step 5: Update `framework-slots/index.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";

import { PreviewSkeleton } from "../preview-skeleton";

import { type Framework } from "@/lib/workbench-params";

export const LazyBootstrapSlot = dynamic(
  () => import("./bootstrap-slot").then((m) => ({ default: m.BootstrapSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyAntdSlot = dynamic(
  () => import("./antd-slot").then((m) => ({ default: m.AntdSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyMantineSlot = dynamic(
  () => import("./mantine-slot").then((m) => ({ default: m.MantineSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyShadcnSlot = dynamic(
  () => import("./shadcn-slot").then((m) => ({ default: m.ShadcnSlot })),
  { loading: () => <PreviewSkeleton /> },
);

/** Fetches the inactive framework chunks during browser idle time. */
export function preloadInactiveSlots(active: Framework) {
  if (typeof window === "undefined") return;
  const targets = [
    { name: "bootstrap", load: () => import("./bootstrap-slot") },
    { name: "antd", load: () => import("./antd-slot") },
    { name: "mantine", load: () => import("./mantine-slot") },
    { name: "shadcn", load: () => import("./shadcn-slot") },
  ];
  const schedule =
    "requestIdleCallback" in window
      ? window.requestIdleCallback.bind(window)
      : (cb: () => void) => window.setTimeout(cb, 200);

  targets.forEach(({ name, load }) => {
    if (name === active) return;
    schedule(() => void load().catch(() => undefined));
  });
}
```

- [ ] **Step 6: Update `preview-pane.tsx`**

Import `LazyShadcnSlot`, add the install command and slot mapping, and add the 4th segment:

```tsx
import {
  LazyAntdSlot,
  LazyBootstrapSlot,
  LazyMantineSlot,
  LazyShadcnSlot,
  preloadInactiveSlots,
} from "./framework-slots";
```

```tsx
const INSTALL_COMMANDS: Record<Framework, string> = {
  bootstrap: "pnpm add react-bootstrap bootstrap",
  antd: "pnpm add antd @ant-design/icons",
  mantine:
    "pnpm add @mantine/core @mantine/hooks @mantine/dropzone @tabler/icons-react",
  shadcn: "pnpm add @patternbase/shadcn tailwindcss",
};

const FRAMEWORK_SLOTS: Record<Framework, React.ElementType> = {
  bootstrap: LazyBootstrapSlot,
  antd: LazyAntdSlot,
  mantine: LazyMantineSlot,
  shadcn: LazyShadcnSlot,
};
```

```tsx
data={[
  { label: "Bootstrap", value: "bootstrap" },
  { label: "Ant Design", value: "antd" },
  { label: "Mantine", value: "mantine" },
  { label: "shadcn/ui", value: "shadcn" },
]}
```

(The segmented `data` prop, `INSTALL_COMMANDS`, and `FRAMEWORK_SLOTS` are the three places in the file.)

- [ ] **Step 7: Update `inspector-pane.tsx` snippet type**

```tsx
interface InspectorPaneProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    mantine: string;
    shadcn: string;
  };
  propDefinitions?: PropDefinition[];
  explanation?: PatternExplanation | null;
  relatedLinks?: readonly RelatedPatternLink[];
}
```

- [ ] **Step 8: Type-check docs**

Run: `pnpm exec tsc --noEmit` (workdir: `apps/docs`)
Expected: passes.

- [ ] **Step 9: Commit**

```bash
git add apps/docs/src/lib/workbench-params.ts apps/docs/src/lib/registry apps/docs/src/components/workbench
git commit -m "feat(docs): wire shadcn framework into workbench"
```

### Task 15: Snippet generator + regenerate

**Files:**

- Modify: `apps/docs/scripts/generate-snippets.ts`

- [ ] **Step 1: Update the generator**

Apply these changes:

```ts
type Framework = "bootstrap" | "antd" | "mantine" | "shadcn";
```

```ts
const FRAMEWORK_DIRS: Record<Framework, string> = {
  bootstrap: "bootstrap",
  antd: "antd",
  mantine: "mantine",
  shadcn: "shadcn",
};
```

In the pattern loop, add the shadcn read:

```ts
const mantine = escapeTemplateString(getComponentSource("mantine", pattern));
const shadcn = escapeTemplateString(getComponentSource("shadcn", pattern));

entries.push(`  "${pattern}": {
    bootstrap: \`${bootstrap}\`,
    antd: \`${antd}\`,
    mantine: \`${mantine}\`,
    shadcn: \`${shadcn}\`,
  }`);
```

And the typed record + log line:

```ts
export const codeSnippets: Record<
  string,
  { bootstrap: string; antd: string; mantine: string; shadcn: string }
> = {
```

```ts
console.log(`Frameworks: bootstrap, antd, mantine, shadcn`);
```

- [ ] **Step 2: Regenerate**

Run (workdir: `apps/docs`): `pnpm generate-snippets`
Expected: `snippet-templates.ts` regenerated with a `shadcn` field per pattern; `Patterns: 54`.

- [ ] **Step 3: Type-check docs**

Run: `pnpm exec tsc --noEmit` (workdir: `apps/docs`)
Expected: passes (snippet type now includes `shadcn`, matching `inspector-pane.tsx`).

- [ ] **Step 4: Commit**

```bash
git add apps/docs/scripts/generate-snippets.ts
git commit -m "feat(docs): generate shadcn code snippets"
```

> `snippet-templates.ts` is gitignored, so no staged change for it.

### Task 16: Copy and framework-count updates

**Files:**

- Modify: `apps/docs/src/components/home/stats-strip.tsx`
- Modify: `apps/docs/src/app/layout.tsx`
- Modify: `apps/docs/src/components/home/origin-manifesto.tsx`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: `stats-strip.tsx`** — change `{ value: "3", label: "UI Frameworks" }` to `{ value: "4", label: "UI Frameworks" }`.
- [ ] **Step 2: `layout.tsx` metadata** — both `description` and openGraph/twitter `description` strings: rewrite "…for Bootstrap, Ant Design, and Mantine." → "…for Bootstrap, Ant Design, Mantine, and shadcn/ui." (two metadata descriptions reference the framework list).
- [ ] **Step 3: `origin-manifesto.tsx`** — P—01 body `"React Bootstrap, Ant Design, and Mantine implementations behind identical prop interfaces."` → `"Bootstrap, Ant Design, Mantine, and shadcn/ui implementations behind identical prop interfaces."`; P—03 body `"all three frameworks stay behaviorally in sync"` → `"all four frameworks stay behaviorally in sync"`.
- [ ] **Step 4: `README.md`** — wherever the three frameworks are enumerated (lines ~7, ~67, ~91 per the exploration), append shadcn/ui the same way.
- [ ] **Step 5: `AGENTS.md`** — line 3 `"three UI libraries"` → `"four UI libraries"`; line 8 package glob → `packages/{antd,bootstrap,mantine,shadcn}`; add a short `packages/shadcn` bullet under Layout mirroring the existing ones (shadcn/ui primitives vendored in `src/components/ui/`, Tailwind v4 theme in `src/styles.css`, Radix + icons bundled by tsup). Line 23's "Framework deps are peerDependencies" bullet gains a shadcn caveat: shadcn's Radix/icon deps are bundled, `tailwindcss` is the external peer.
- [ ] **Step 6: `CLAUDE.md`** — architecture bullets: add `packages/shadcn` line mirroring the others; docs data-flow paragraph 4 references three registries — note the fourth (`shadcn.tsx`); step 3 of "To add a new pattern" lists the three packages → add shadcn.
- [ ] **Step 7: Format + commit**

Run: `pnpm format`

```bash
git add apps/docs/src/components/home/stats-strip.tsx apps/docs/src/app/layout.tsx apps/docs/src/components/home/origin-manifesto.tsx README.md AGENTS.md CLAUDE.md
git commit -m "docs: update framework copy for shadcn/ui"
```

---

## Phase 6 — Verification

### Task 17: Full verification

- [ ] **Step 1: Root checks**

Run:

```bash
pnpm format:check
pnpm type-check
pnpm lint
pnpm test
```

Expected: all pass. Root `pnpm type-check` skips `apps/docs` (no script there) — docs was verified in Tasks 13–15 with `pnpm exec tsc --noEmit`.

- [ ] **Step 2: Build everything**

Run: `pnpm build`
Expected: Turborepo builds all packages + docs successfully.

- [ ] **Step 3: Docs dev sanity**

Run (workdir: `apps/docs`): `pnpm dev`
Then, with the browser/agent tooling, load a couple of pattern pages (e.g. `/patterns/tuners/parameter-control`, `/patterns/governors/citation`, `/patterns/prompt-actions/open-input`), switch the framework toggle to **shadcn/ui**, and confirm:

- the live preview renders with Tailwind styling (light and dark mode via the Mantine scheme toggle),
- the Code tab shows the shadcn snippet,
- the Install command reads `pnpm add @patternbase/shadcn tailwindcss`.

Fix any preview-level issue surfaced (typically a missing `@source` path or a registry prop mismatch), commit the fix with `fix(docs): ...`.

---

## Self-review notes

- Spec coverage: package (Task 1–2), primitives (Task 3), 54 patterns (Tasks 4–12), docs wiring (Tasks 13–16), verification (Task 17) — all spec sections mapped, including the "no `@patternbase/core` changes" out-of-scope rule (no task modifies `core`).
- No placeholders: every code-touching step includes full code or an explicit deterministic procedure (the Porting protocol references in-repo mantine files as the spec — implementation work is tied to those reads, not to vague instruction).
- Type consistency: `Framework` union ordered `bootstrap | antd | mantine | shadcn` everywhere (`workbench-params.ts`, registry index, preview-pane maps, inspector snippets); install value is `"shadcn"` everywhere; snippet record gains the 4th `shadcn: string` field in both the generator and `inspector-pane.tsx`.
