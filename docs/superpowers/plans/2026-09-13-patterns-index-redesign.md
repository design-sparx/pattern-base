# Patterns Index Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/patterns` (and the category page it shares rows with) into the floating-acrylic card layout approved in `docs/superpowers/specs/2026-09-13-patterns-index-redesign.md`.

**Architecture:** The page stays a single `"use client"` component holding `query`/`tag` state (existing `getFilteredPatterns` unchanged). It renders a header band, a sticky toolbar (`PatternsToolbar` — extracted so the search + pills + `/` shortcut live in one focused component), a collapsing bento overview strip, and one `Card` per matching category whose rows are the shared `PatternIndexRow`. `PatternIndexRow` gets the token-refined two-line row (query highlight via a new pure `highlightQuery` helper, framework-parity `×4` chip, tag overflow badge). The category page is rebuilt on the same `Card` recipe for consistency. Every radius uses the theme token scale (`rounded-md`/`xl`/`2xl`, `rounded-full`) — no arbitrary `rounded-[…]` values, and no hand-rolled card chrome where a shadcn primitive exists.

**Tech Stack:** Next.js 16 (app router, `(shell)` route group), react 18, Tailwind v4 tokens, shadcn/ui primitives vendored at `apps/docs/src/components/ui/`, `@tabler/icons-react`, vitest (`apps/docs`), conventional commits with commitlint + lint-staged.

---

### Task 1: Add the pure `highlightQuery` helper (TDD)

**Files:**

- Create: `apps/docs/src/lib/highlight-query.ts`
- Create: `apps/docs/src/lib/highlight-query.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/docs/src/lib/highlight-query.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { highlightQuery } from "@/lib/highlight-query";

describe("highlightQuery", () => {
  it("returns a single non-match segment for an empty query", () => {
    expect(highlightQuery("Open Input", "")).toEqual([
      { text: "Open Input", match: false },
    ]);
  });

  it("splits around a middle match, preserving original case", () => {
    expect(highlightQuery("Open Input", "in")).toEqual([
      { text: "Open ", match: false },
      { text: "in", match: true },
      { text: "put", match: false },
    ]);
  });

  it("matches at the start", () => {
    expect(highlightQuery("Open Input", "open")).toEqual([
      { text: "Open", match: true },
      { text: " Input", match: false },
    ]);
  });

  it("matches at the end", () => {
    expect(highlightQuery("Open Input", "input")).toEqual([
      { text: "Open ", match: false },
      { text: "Input", match: true },
    ]);
  });

  it("is case-insensitive", () => {
    expect(highlightQuery("Re-run generation", "GENERATION")).toEqual([
      { text: "Re-run ", match: false },
      { text: "generation", match: true },
    ]);
  });

  it("returns a single non-match segment when nothing matches", () => {
    expect(highlightQuery("Open Input", "zzz")).toEqual([
      { text: "Open Input", match: false },
    ]);
  });

  it("handles regex-special characters safely (no RegExp used)", () => {
    expect(highlightQuery("Voice and Tone (v1)", "a+b")).toEqual([
      { text: "Voice and Tone (v", match: false },
      { text: "a+b", match: true },
      { text: "1)", match: false },
    ]);
  });

  it("trims whitespace around the query", () => {
    expect(highlightQuery("Open Input", "  input  ")).toEqual([
      { text: "Open ", match: false },
      { text: "Input", match: true },
    ]);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `pnpm exec vitest run src/lib/highlight-query.test.ts` (from `apps/docs`)
Expected: FAIL — `Cannot find module '@/lib/highlight-query'`

- [ ] **Step 3: Write the minimal implementation**

Create `apps/docs/src/lib/highlight-query.ts`:

```ts
export interface HighlightSegment {
  text: string;
  match: boolean;
}

export function highlightQuery(
  text: string,
  query: string,
): HighlightSegment[] {
  const q = query.trim().toLowerCase();
  if (!q) return [{ text, match: false }];

  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return [{ text, match: false }];

  const segments: HighlightSegment[] = [];
  if (idx > 0) segments.push({ text: text.slice(0, idx), match: false });
  segments.push({ text: text.slice(idx, idx + q.length), match: true });
  const rest = text.slice(idx + q.length);
  if (rest.length > 0) segments.push({ text: rest, match: false });
  return segments;
}
```

Note: `idx + q.length` slices the matched run out of the **original** text, so the returned segment keeps the source's casing.

- [ ] **Step 4: Run the test and verify it passes**

Run: `pnpm exec vitest run src/lib/highlight-query.test.ts` (from `apps/docs`)
Expected: PASS — all 8 cases green

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/lib/highlight-query.ts apps/docs/src/lib/highlight-query.test.ts
git commit -m "feat(docs): add pure highlight-query helper"
```

---

### Task 2: Restyle `PatternIndexRow`

**Files:**

- Modify: `apps/docs/src/components/common/pattern-index-row.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the row**

Replace the entire file with:

```tsx
import Link from "next/link";
import { Fragment } from "react";

import type { PatternMeta } from "@patternbase/core";

import { highlightQuery } from "@/lib/highlight-query";
import { Badge } from "@/components/ui/badge";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
  query?: string;
}

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query) return text;
  return highlightQuery(text, query).map((seg, i) =>
    seg.match ? (
      <mark key={i} className="text-primary bg-transparent font-semibold">
        {seg.text}
      </mark>
    ) : (
      <Fragment key={i}>{seg.text}</Fragment>
    ),
  );
}

export function PatternIndexRow({
  pattern,
  index,
  query = "",
}: PatternIndexRowProps) {
  const shownTags = pattern.tags.slice(0, 2);
  const overflowTags = pattern.tags.length - shownTags.length;

  return (
    <Link
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      className="hover:bg-muted group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors"
    >
      <span className="text-muted-foreground font-mono text-xs" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="text-foreground group-hover:text-primary block text-sm font-medium transition-colors">
          <Highlighted text={pattern.name} query={query} />
        </span>
        <span className="text-muted-foreground mt-0.5 hidden truncate text-xs sm:block">
          <Highlighted text={pattern.description} query={query} />
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="bg-primary/10 text-primary rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold"
          title="Ships in all four UI libraries"
        >
          ×4
        </span>
        {shownTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="hidden lg:inline-flex"
          >
            {tag}
          </Badge>
        ))}
        {overflowTags > 0 && (
          <Badge
            variant="outline"
            className="hidden border-dashed lg:inline-flex"
          >
            +{overflowTags}
          </Badge>
        )}
        <span
          className="text-primary text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          →
        </span>
      </span>
    </Link>
  );
}
```

Radius tokens only (`rounded-xl`, `rounded-md`), row hover uses the `bg-muted` token, name tints via `group-hover`/`text-primary`. No component render test (the docs app has vitest + jsdom but no `@testing-library/react`); verification is type-check + lint + manual.

- [ ] **Step 2: Verify types and lint**

Run: `pnpm type-check --filter=@patternbase/docs` and `pnpm lint --filter=@patternbase/docs`
Expected: both pass. Note `grid-cols-[2.75rem_1fr_auto]` and `text-[10px]` are the only arbitrary utilities — both Grid-Template and Font-Size scales (allowed; the radius rule is the only hard restriction).

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/common/pattern-index-row.tsx
git commit -m "style(docs): restyle pattern rows with parity chip and highlight"
```

---

### Task 3: Create the `PatternsToolbar` component

**Files:**

- Create: `apps/docs/src/components/browse/patterns-toolbar.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

import { cn } from "cn";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TAG_FILTERS = [
  "all",
  "prompt",
  "generation",
  "transparency",
  "control",
  "trust",
];

interface PatternsToolbarProps {
  query: string;
  tag: string;
  count: number;
  onQueryChange: (query: string) => void;
  onTagChange: (tag: string) => void;
  className?: string;
}

export function PatternsToolbar({
  query,
  tag,
  count,
  onQueryChange,
  onTagChange,
  className,
}: PatternsToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable;

      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !editing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        e.preventDefault();
        inputRef.current?.blur();
        onQueryChange("");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onQueryChange]);

  return (
    <div
      className={cn(
        "border-border bg-background/80 flex flex-wrap items-center gap-3 rounded-2xl border px-3 py-2.5 shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="relative w-full md:w-80">
        <IconSearch
          className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          ref={inputRef}
          placeholder="Filter patterns…"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
          className="pl-9"
          aria-label="Filter patterns by name or keyword"
        />
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        value={tag}
        onValueChange={(value) => {
          if (value) onTagChange(value);
        }}
      >
        {TAG_FILTERS.map((t) => (
          <ToggleGroupItem key={t} value={t} className="capitalize">
            {t}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <span className="text-muted-foreground font-mono text-xs md:ml-auto">
        {count} pattern{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}
```

Note: `Input` forwards `ref` to the native `<input>` (it's `React.ComponentProps<"input">` + extra props), so `ref={inputRef}` type-checks.

- [ ] **Step 2: Verify types and lint**

Run: `pnpm type-check --filter=@patternbase/docs` and `pnpm lint --filter=@patternbase/docs`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/browse/patterns-toolbar.tsx
git commit -m "feat(docs): extract patterns toolbar with search shortcut"
```

---

### Task 4: Rework `PatternsIndex`

**Files:**

- Modify: `apps/docs/src/components/browse/patterns-index.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the page component**

Replace the entire file with:

```tsx
"use client";

import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "cn";

import styles from "@/components/common/editorial.module.css";

import { PatternsToolbar } from "@/components/browse/patterns-toolbar";
import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  categories,
  getFilteredPatterns,
  getPatternsByCategory,
  patterns,
} from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = getFilteredPatterns(patterns, query, tag);
  const isIdle = query.trim() === "" && tag === "all";
  const q = query.trim();

  return (
    <div className="flex min-h-full flex-col p-4 md:p-6">
      <header className="px-1">
        <p
          className={cn(
            styles.editorialKicker,
            "text-muted-foreground font-mono text-xs",
          )}
        >
          Pattern library
        </p>
        <h1
          className={`${styles.editorialDisplay} mt-3 text-4xl font-extralight md:text-5xl`}
        >
          All patterns
        </h1>
        <p className="text-muted-foreground mt-2 md:text-lg">
          {patterns.length} AI UX patterns across {categories.length} categories
          — scan by name, filter by intent.
        </p>
      </header>

      <PatternsToolbar
        query={query}
        tag={tag}
        count={filtered.length}
        onQueryChange={setQuery}
        onTagChange={setTag}
        className="sticky top-2 z-10 mt-6"
      />

      {isIdle ? (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const tileCount = getPatternsByCategory(cat.id).length;
            return (
              <Card
                key={cat.id}
                size="sm"
                variant="interactive"
                className="rounded-2xl"
              >
                <Link
                  href={`/patterns/${cat.id}`}
                  className="group flex size-full flex-col gap-2.5 p-4 no-underline"
                >
                  <span className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {tileCount}
                    </span>
                  </span>
                  <span className="text-foreground text-sm font-medium">
                    {cat.name}
                  </span>
                  <span className="text-muted-foreground text-xs leading-relaxed">
                    {cat.description}
                  </span>
                  <span
                    className="text-primary mt-auto self-end text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </Card>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <Empty className="mt-4 min-h-64 border">
          <EmptyMedia variant="icon">
            <IconSearch />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No patterns found</EmptyTitle>
            <EmptyDescription>
              Try a different keyword or tag filter.
            </EmptyDescription>
          </EmptyHeader>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setTag("all");
            }}
          >
            Clear filters
          </Button>
        </Empty>
      ) : (
        categories.map((category) => {
          const rows = filtered.filter((p) => p.category === category.id);
          if (rows.length === 0) return null;

          const Icon = getCategoryIcon(category.id);
          const total = getPatternsByCategory(category.id).length;

          return (
            <Card
              key={category.id}
              size="sm"
              variant="interactive"
              className="mt-2 rounded-2xl"
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription className="truncate">
                    {category.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {isIdle ? `${total} patterns` : `${rows.length} of ${total}`}
                </Badge>
                <Link
                  href={`/patterns/${category.id}`}
                  className="text-primary hidden items-center gap-1 text-sm font-semibold no-underline hover:underline md:inline-flex"
                >
                  View all <span aria-hidden>→</span>
                </Link>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 p-2">
                {rows.map((pattern, i) => (
                  <PatternIndexRow
                    key={pattern.id}
                    pattern={pattern}
                    index={i}
                    query={q}
                  />
                ))}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
```

Design notes:

- `min-h-full` (not `h-full`) on the root keeps the sticky toolbar's constraint box growing with content — sticky works inside the shell's inner scroll container.
- The toolbar floats as an acrylic `rounded-2xl` card via `sticky top-2 z-10`; the bento strip and cards sit on `Card size="sm" variant="interactive"` with token radii.
- All radii are token-scale (`rounded-xl`, `rounded-2xl`, `rounded-full`). `bg-primary/10`/`text-primary` tints the icon chips and parity chip.
- Bento strip collapses while `isIdle` is false; empty state (dashed `Empty`) appears when nothing matches.

- [ ] **Step 2: Verify types and lint**

Run: `pnpm type-check --filter=@patternbase/docs` and `pnpm lint --filter=@patternbase/docs`
Expected: both pass. (The old `<PatternIndexRow>`/`ToggleGroup`/`Input` imports are gone — no unused imports.)

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/browse/patterns-index.tsx
git commit -m "feat(docs): redesign patterns index with bento cards"
```

---

### Task 5: Rebuild the category page on the card recipe

**Files:**

- Modify: `apps/docs/src/app/(shell)/patterns/[category]/page.tsx` (full rewrite of the component body; keep `generateStaticParams` + `generateMetadata`)

- [ ] **Step 1: Rewrite the page**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

interface CategoryPageParams {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);
  const Icon = getCategoryIcon(category.id);

  return (
    <div className="flex min-h-full flex-col p-4 md:p-6">
      <Breadcrumb className="px-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/patterns">Patterns</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card size="sm" className="mt-4 rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl">{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {categoryPatterns.length} patterns
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 p-2">
          {categoryPatterns.map((pattern, i) => (
            <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
          ))}
        </CardContent>
        <CardFooter className="border-border border-t px-4 py-3">
          <Link
            href="/patterns"
            className="text-primary inline-flex items-center gap-1 text-sm font-semibold no-underline hover:underline"
          >
            <span aria-hidden>←</span> All patterns
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
```

Notes: the breadcrumb now carries the return path; the card header replaces the old serif H1 + tabs strip (the sidebar already covers cross-category navigation). The `Tabs` and `editorial` imports are removed.

- [ ] **Step 2: Verify types and lint**

Run: `pnpm type-check --filter=@patternbase/docs` and `pnpm lint --filter=@patternbase/docs`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add "apps/docs/src/app/(shell)/patterns/[category]/page.tsx"
git commit -m "style(docs): rebuild category page on shared card recipe"
```

---

### Task 6: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full docs test suite**

Run: `pnpm test --filter=@patternbase/docs`
Expected: PASS (includes the new `highlight-query.test.ts` plus existing lib tests).

- [ ] **Step 2: Lint, type-check, and build**

Run from repo root:

```bash
pnpm run lint
pnpm run type-check
pnpm build --filter=@patternbase/docs
```

Expected: lint and type-check pass; build succeeds (`pnpm generate-snippets && next build` — snippets are component-source-derived, so the regenerated `snippet-templates.ts` should be unaffected by the row restyle since it captures live workbench components, not the index row; if the build regenerates that file with diffs, commit them as `chore(docs): refresh snippets`).

- [ ] **Step 3: Manual smoke test**

Run: `pnpm dev --filter=@patternbase/docs`
Check, in both light and dark mode on the shell:

- `/patterns`: idle shows header + sticky toolbar + 5-tile bento + 5 category cards. Type "transparent" → bento collapses, rows filter live with green highlights, count updates, "/" focuses the search field, `Escape` clears it. Click **Trust** pill → filtered; **Clear filters** restores everything; a nonsense query shows the dashed empty state.
- `/patterns/governors` (or any category): breadcrumb, card header (chip, name, description, count), rows, "← All patterns" footer link; navigate back to `/patterns`.
- Hover: cards lift (border tints), rows wash `bg-muted`, name tints primary, arrow reveals.

---

## Self-review notes

- **Spec coverage:** header band ✓ (Task 4), sticky toolbar + `/` shortcut ✓ (Task 3/4), collapsing bento ✓ (Task 4), category cards w/ hover-lift ✓ (Task 4, `Card variant="interactive"`), two-line rows + parity chip + tag overflow + query highlight ✓ (Task 2), dashed empty state + clear ✓ (Task 4), micro-animation — **intentionally dropped**: stagger-on-filter needs MutationObserver/re-keying hacks in React; the spec called it optional garnish and the reduced-motion rules don't justify the complexity. Flagged for sign-off at execution time.
- **Placeholder scan:** every task has concrete code + expected output; no TBD/TODO.
- **Type consistency:** `highlightQuery` → `HighlightSegment[]` (Task 1) matches `PatternIndexRow` (Task 2); `PatternsToolbar` props (`query/tag/count/onQueryChange/onTagChange/className`) match usage (Task 4); `PatternIndexRow` optional `query` prop matches both call sites (Tasks 4/5). `TAG_FILTERS` moved to `patterns-toolbar.tsx`; nothing else references it.
- **Radius rule:** grep for `rounded-[` in the new files before committing — must be zero matches (all `rounded-md`/`xl`/`2xl`/`full`).
