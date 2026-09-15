# Pattern Workbench — Stacked Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the pattern detail workbench page (`/patterns/:category/:pattern`) as a full-width "stacked studio" — hero card, a single glass viewer with a Preview/Code toggle (framework pills left, device selector right, no install button), and Props/Docs cards stacked below — all in the shell's acrylic token language.

**Architecture:** The 2-column sticky preview/inspector grid (`workbench.module.css`) and the Inspector's tab bar are demolished. `PreviewPane` becomes the single glass viewer carrying a one-row toolbar whose center `ToggleGroup` swaps between the live component and the existing `CodeBlock`. `InspectorPane` is replaced by two always-visible below cards: a tokenized `PropsTable` and a new `DocsCard`. URL state stays on `framework/tab/viewport`; a new `preview` tab value (the new default) makes the viewer open into the live component, while `tab=code` still deep-links to code and `tab=props|docs` scrolls to the matching card.

**Tech Stack:** Next.js 16.3.1 (server component page + client workbench island), Tailwind v4 token utilities, shadcn/ui primitives (Card, Badge, Button, ToggleGroup, Tooltip), `@tabler/icons-react`, vitest (`apps/docs`).

---

## File Structure

| File                                                               | Responsibility                                                                     | Action |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------ |
| `apps/docs/src/lib/workbench-params.ts`                            | Add `"preview"` to `InspectorTab`, make it `DEFAULT_TAB`, add `tabToViewer` helper | Modify |
| `apps/docs/src/lib/workbench-params.test.ts`                       | Update defaults expectation + new `tabToViewer` tests                              | Modify |
| `apps/docs/src/components/preview/docs-card.tsx`                   | New `DocsCard` (tokenized, from `InspectorDocs`) + `RelatedPatternLink` type       | Create |
| `apps/docs/src/components/preview/props-table.tsx`                 | Token/glass reproof, keeps its own "Props" header                                  | Modify |
| `apps/docs/src/components/preview/code-block.tsx`                  | Tokenize the outer border only                                                     | Modify |
| `apps/docs/src/components/workbench/preview-pane.tsx`              | Single glass viewer: 3-part toolbar, Preview/Code toggle, code surface             | Modify |
| `apps/docs/src/components/workbench/workbench.tsx`                 | Vertical stack: viewer + Props/Docs grid, `tab` scroll effect, stacked skeleton    | Modify |
| `apps/docs/src/components/workbench/workbench.module.css`          | No longer referenced (sticky grid gone)                                            | Delete |
| `apps/docs/src/components/workbench/preview-skeleton.tsx`          | Token reproof (`bg-muted`)                                                         | Modify |
| `apps/docs/src/components/workbench/inspector-pane.tsx`            | Fully decomposed — delete after its last consumer is gone                          | Delete |
| `apps/docs/src/app/(shell)/patterns/[category]/[pattern]/page.tsx` | Hero `Card`, drop `p-4 md:p-6`, import `RelatedPatternLink` from docs-card         | Modify |

`workbench-context.tsx` and `framework-slots/*` are untouched. `RelatedPatternLink`'s old home (`inspector-pane.tsx`) is deleted last, after `page.tsx` moves its import to `docs-card.tsx`.

---

## Task 1: Preview becomes the default workbench tab

**Files:** Modify `apps/docs/src/lib/workbench-params.ts`, `apps/docs/src/lib/workbench-params.test.ts`

- [ ] **Step 1: Write the failing tests**

Replace the whole `buildWorkbenchQuery` "empty string when everything equals defaults" case and the "encodes only non-default values" case, and append a `tabToViewer` block, so the test file becomes:

```ts
import { describe, expect, it } from "vitest";

import {
  buildWorkbenchQuery,
  DEFAULT_FRAMEWORK,
  DEFAULT_TAB,
  DEFAULT_VIEWPORT,
  parseWorkbenchParams,
  tabToViewer,
} from "./workbench-params";

function sp(query: string): URLSearchParams {
  return new URLSearchParams(query);
}

describe("parseWorkbenchParams", () => {
  it("returns defaults for empty params", () => {
    expect(parseWorkbenchParams(sp(""))).toEqual({
      framework: DEFAULT_FRAMEWORK,
      tab: DEFAULT_TAB,
      viewport: DEFAULT_VIEWPORT,
    });
  });

  it("parses valid values case-sensitively", () => {
    const result = parseWorkbenchParams(sp("fw=shadcn&tab=props&vp=tablet"));
    expect(result).toEqual({
      framework: "shadcn",
      tab: "props",
      viewport: "tablet",
    });
    expect(parseWorkbenchParams(sp("fw=Mantine")).framework).toBe(
      DEFAULT_FRAMEWORK,
    );
  });

  it("falls back per-key on invalid values", () => {
    const result = parseWorkbenchParams(
      sp("fw=jquery&tab=everything&vp=hologram"),
    );
    expect(result).toEqual({
      framework: DEFAULT_FRAMEWORK,
      tab: DEFAULT_TAB,
      viewport: DEFAULT_VIEWPORT,
    });
  });

  it("falls back per-key when a key is missing", () => {
    const result = parseWorkbenchParams(sp("fw=antd"));
    expect(result.framework).toBe("antd");
    expect(result.tab).toBe(DEFAULT_TAB);
    expect(result.viewport).toBe(DEFAULT_VIEWPORT);
  });
});

describe("buildWorkbenchQuery", () => {
  it("returns empty string when everything equals defaults", () => {
    expect(
      buildWorkbenchQuery({
        framework: "bootstrap",
        tab: "preview",
        viewport: "desktop",
      }),
    ).toBe("");
  });

  it("encodes only non-default values", () => {
    expect(
      buildWorkbenchQuery({
        framework: "shadcn",
        tab: "code",
        viewport: "desktop",
      }),
    ).toBe("fw=shadcn&tab=code");
    expect(
      buildWorkbenchQuery({
        framework: "bootstrap",
        tab: "docs",
        viewport: "mobile",
      }),
    ).toBe("tab=docs&vp=mobile");
  });

  it("joins multiple non-defaults in fw,tab,vp order", () => {
    expect(
      buildWorkbenchQuery({
        framework: "antd",
        tab: "props",
        viewport: "tablet",
      }),
    ).toBe("fw=antd&tab=props&vp=tablet");
  });
});

describe("tabToViewer", () => {
  it("maps code to code and everything else to preview", () => {
    expect(tabToViewer("code")).toBe("code");
    expect(tabToViewer("preview")).toBe("preview");
    expect(tabToViewer("props")).toBe("preview");
    expect(tabToViewer("docs")).toBe("preview");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `apps/docs`): `pnpm exec vitest run src/lib/workbench-params.test.ts`
Expected: FAIL — `DEFAULT_TAB` is `"code"` so the empty-params case fails; `tabToViewer` does not exist.

- [ ] **Step 3: Add `preview` to the tab union, new default, and `tabToViewer`**

Edit `apps/docs/src/lib/workbench-params.ts` so it reads:

```ts
export const FRAMEWORKS = ["bootstrap", "antd", "shadcn"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const INSPECTOR_TABS = ["preview", "code", "props", "docs"] as const;
export type InspectorTab = (typeof INSPECTOR_TABS)[number];

export const VIEWPORTS = ["mobile", "tablet", "desktop"] as const;
export type Viewport = (typeof VIEWPORTS)[number];

export type ViewerMode = "preview" | "code";

export const DEFAULT_FRAMEWORK: Framework = "bootstrap";
export const DEFAULT_TAB: InspectorTab = "preview";
export const DEFAULT_VIEWPORT: Viewport = "desktop";

export interface WorkbenchState {
  framework: Framework;
  tab: InspectorTab;
  viewport: Viewport;
}

/** The workbench viewer shows code only while the tab is `code`. */
export function tabToViewer(tab: InspectorTab): ViewerMode {
  return tab === "code" ? "code" : "preview";
}

interface SearchParamsLike {
  get: (key: string) => string | null;
}

function pick<T extends string>(
  allowed: readonly T[],
  raw: string | null,
  fallback: T,
): T {
  return allowed.find((value) => value === raw) ?? fallback;
}

export function parseWorkbenchParams(params: SearchParamsLike): WorkbenchState {
  return {
    framework: pick(FRAMEWORKS, params.get("fw"), DEFAULT_FRAMEWORK),
    tab: pick(INSPECTOR_TABS, params.get("tab"), DEFAULT_TAB),
    viewport: pick(VIEWPORTS, params.get("vp"), DEFAULT_VIEWPORT),
  };
}

/** Builds a canonical query string containing only non-default values. */
export function buildWorkbenchQuery(state: WorkbenchState): string {
  const parts: string[] = [];
  if (state.framework !== DEFAULT_FRAMEWORK)
    parts.push(`fw=${state.framework}`);
  if (state.tab !== DEFAULT_TAB) parts.push(`tab=${state.tab}`);
  if (state.viewport !== DEFAULT_VIEWPORT) parts.push(`vp=${state.viewport}`);
  return parts.join("&");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run src/lib/workbench-params.test.ts`
Expected: PASS — 10 passing.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/lib/workbench-params.ts apps/docs/src/lib/workbench-params.test.ts
git commit -m "feat(docs): preview is the default workbench tab"
```

---

## Task 2: Tokenized DocsCard + relocated RelatedPatternLink

**Files:** Create `apps/docs/src/components/preview/docs-card.tsx`

- [ ] **Step 1: Create the component**

This is the same content as the old `InspectorDocs` (in `inspector-pane.tsx`), re-typed against tokens and owning `RelatedPatternLink`:

```tsx
import { IconBulb, IconCircleCheck, IconTarget } from "@tabler/icons-react";
import Link from "next/link";

import type { PatternExplanation } from "@/data/pattern-explanations";

/** A related pattern resolved to a route; `href` is absent when unresolved. */
export interface RelatedPatternLink {
  label: string;
  href?: string;
}

interface DocsCardProps {
  explanation: PatternExplanation;
  relatedLinks: readonly RelatedPatternLink[];
}

const sectionIconClasses =
  "bg-primary/10 text-primary flex items-center justify-center rounded-md p-1";

export function DocsCard({
  explanation,
  relatedLinks,
}: Readonly<DocsCardProps>) {
  return (
    <div className="border-border bg-background supports-[backdrop-filter]:bg-background/60 h-full overflow-hidden rounded-2xl border shadow-sm supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="border-border bg-muted/50 border-b px-5 py-3">
        <h3 className="text-sm font-semibold">Docs</h3>
      </div>

      <div className="space-y-4 p-5">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {explanation.overview}
        </p>

        {explanation.variants.length ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className={sectionIconClasses}>
                <IconBulb size={14} />
              </div>
              <h4 className="text-sm font-semibold">Variants</h4>
            </div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {explanation.variants.map((v) => (
                <li key={v.title}>
                  <b className="text-foreground">{v.title}</b> — {v.description}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {explanation.useCases.length ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className={sectionIconClasses}>
                <IconTarget size={14} />
              </div>
              <h4 className="text-sm font-semibold">Use Cases</h4>
            </div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {explanation.useCases.map((uc) => (
                <li key={uc}>{uc}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {explanation.bestPractices.length ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className={sectionIconClasses}>
                <IconCircleCheck size={14} />
              </div>
              <h4 className="text-sm font-semibold">Best Practices</h4>
            </div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {explanation.bestPractices.map((bp) => (
                <li key={bp}>{bp}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {relatedLinks.length ? (
          <div>
            <h4 className="text-sm font-semibold">Related Patterns</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {relatedLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="bg-muted text-foreground hover:bg-primary/10 hover:text-primary inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="text-muted-foreground bg-muted/60 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no errors (the type is now exported from `docs-card.tsx`; `inspector-pane.tsx` still exports its own copy until Task 6).

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/preview/docs-card.tsx
git commit -m "feat(docs): add tokenized docs card for pattern surfaces"
```

---

## Task 3: Tokenize the PropsTable chrome

**Files:** Modify `apps/docs/src/components/preview/props-table.tsx`

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import type { PropDefinition } from "@/data/props-data";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: Readonly<PropsTableProps>) {
  return (
    <div className="border-border bg-background supports-[backdrop-filter]:bg-background/60 overflow-hidden rounded-2xl border shadow-sm supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="border-border bg-muted/50 border-b px-5 py-3">
        <h3 className="text-sm font-semibold">Props</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Prop
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Type
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Default
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="hover:bg-muted/40 transition-colors"
              >
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  <code className="bg-muted text-foreground/80 rounded px-1.5 py-0.5 font-mono text-xs font-medium">
                    {prop.name}
                  </code>
                </td>
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                    {prop.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  {prop.default ? (
                    <span className="text-foreground text-xs font-medium">
                      {prop.default}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      required
                    </span>
                  )}
                </td>
                <td className="text-muted-foreground px-5 py-2.5 text-sm">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check + lint**

Run (from `apps/docs`): `pnpm exec tsc --noEmit` then `pnpm exec eslint src/components/preview/props-table.tsx`
Expected: no errors/warnings.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/preview/props-table.tsx
git commit -m "style(docs): tokenize props table chrome"
```

---

## Task 4: Stack the workbench viewer + below cards

**Files:** Modify `apps/docs/src/components/workbench/workbench.tsx`, `preview-skeleton.tsx`; delete `workbench.module.css`

> Note: `PreviewPane` gains a `snippets` prop in Task 5 — Task 4 compiles because `PreviewPane` still ignores extra props while TypeScript is structural (the new `snippets` prop is required, so Task 4 would NOT type-check a `PreviewPane` signature that lacks it). **Do Task 5 in the same run before running `tsc`**, or temporarily pass nothing. To keep commits compiling independently, treat Tasks 4+5 as one ship: replace `workbench.tsx` here AND the new `PreviewPane` in Task 5, then run `tsc` once.

- [ ] **Step 1: Replace `workbench.tsx`**

```tsx
"use client";

import { Suspense, useEffect } from "react";

import { PreviewPane } from "./preview-pane";
import { PreviewSkeleton } from "./preview-skeleton";
import { useWorkbench, WorkbenchProvider } from "./workbench-context";

import {
  DocsCard,
  type RelatedPatternLink,
} from "@/components/preview/docs-card";
import { PropsTable } from "@/components/preview/props-table";
import type { PatternExplanation } from "@/data/pattern-explanations";
import type { PropDefinition } from "@/data/props-data";

interface WorkbenchProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    shadcn: string;
  };
  explanation?: PatternExplanation | null;
  propDefinitions?: PropDefinition[];
  relatedLinks?: readonly RelatedPatternLink[];
}

export function Workbench({
  patternId,
  snippets,
  explanation,
  propDefinitions,
  relatedLinks,
}: Readonly<WorkbenchProps>) {
  return (
    <Suspense fallback={<WorkbenchSkeleton />}>
      <WorkbenchProvider>
        <WorkbenchContent
          patternId={patternId}
          snippets={snippets}
          explanation={explanation}
          propDefinitions={propDefinitions}
          relatedLinks={relatedLinks}
        />
      </WorkbenchProvider>
    </Suspense>
  );
}

function WorkbenchContent(props: WorkbenchProps) {
  const { tab } = useWorkbench();

  // Deep-linked ?tab=props|docs scroll the always-visible cards into view.
  useEffect(() => {
    if (tab !== "props" && tab !== "docs") return;
    const id = tab === "props" ? "pattern-props" : "pattern-docs";
    document
      .getElementById(id)
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [tab]);

  return (
    <div className="flex flex-col gap-4">
      <div className="min-w-0">
        <PreviewPane patternId={props.patternId} snippets={props.snippets} />
      </div>

      {props.propDefinitions?.length || props.explanation ? (
        <div className="grid gap-4 md:grid-cols-2">
          {props.propDefinitions?.length ? (
            <div id="pattern-props" className="min-w-0 scroll-mt-28">
              <PropsTable props={props.propDefinitions} />
            </div>
          ) : null}
          {props.explanation ? (
            <div id="pattern-docs" className="min-w-0 scroll-mt-28">
              <DocsCard
                explanation={props.explanation}
                relatedLinks={props.relatedLinks ?? []}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function WorkbenchSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="border-border bg-muted/40 overflow-hidden rounded-2xl border p-4 shadow-sm">
        <PreviewSkeleton />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Delete the sticky grid module**

Delete `apps/docs/src/components/workbench/workbench.module.css` (nothing references `styles` anymore).

- [ ] **Step 3: Tokenize `preview-skeleton.tsx`**

Replace its two `bg-gray-200 dark:bg-gray-700` occurrences with `bg-muted`:

```tsx
"use client";

export function PreviewSkeleton() {
  return (
    <div className="min-h-[220px] space-y-4 p-4">
      <div className="bg-muted h-4 w-3/4 animate-pulse rounded-sm" />
      <div className="bg-muted h-[120px] w-full animate-pulse rounded-md" />
    </div>
  );
}
```

- [ ] **Step 4: Apply the new PreviewPane (Task 5 code) and type-check**

Implement Task 5's new `preview-pane.tsx` now, then from `apps/docs` run:
`pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Lint the touched workbench files**

Run: `pnpm exec eslint src/components/workbench/workbench.tsx src/components/workbench/preview-pane.tsx src/components/workbench/preview-skeleton.tsx`
Expected: no warnings (Task 5's file).

- [ ] **Step 6: Commit**

```bash
git add apps/docs/src/components/workbench
git commit -m "feat(docs): stack pattern workbench into preview and below-surface cards"
```

---

## Task 5: Glass viewer with Preview/Code toggle

**Files:** Modify `apps/docs/src/components/workbench/preview-pane.tsx`

- [ ] **Step 1: Replace the file**

```tsx
"use client";

import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { useEffect } from "react";

import {
  LazyAntdSlot,
  LazyBootstrapSlot,
  LazyShadcnSlot,
  preloadInactiveSlots,
} from "./framework-slots";
import { useWorkbench } from "./workbench-context";

import { CodeBlock } from "@/components/preview/code-block";
import { PreviewErrorBoundary } from "@/components/preview/error-boundary";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  tabToViewer,
  type Framework,
  type Viewport,
  VIEWPORTS,
} from "@/lib/workbench-params";

const viewportIcons: Record<Viewport, React.ElementType> = {
  mobile: IconDeviceMobile,
  tablet: IconDeviceTablet,
  desktop: IconDeviceDesktop,
};

const viewportWidths: Record<Viewport, number | undefined> = {
  mobile: 375,
  tablet: 768,
  desktop: undefined,
};

const FRAMEWORK_SLOTS: Record<Framework, React.ElementType> = {
  bootstrap: LazyBootstrapSlot,
  antd: LazyAntdSlot,
  shadcn: LazyShadcnSlot,
};

const pillItem =
  "text-muted-foreground data-[state=on]:text-foreground rounded-full px-3";

interface Snippets {
  bootstrap: string;
  antd: string;
  shadcn: string;
}

interface PreviewPaneProps {
  patternId: string;
  snippets: Snippets;
}

export function PreviewPane({
  patternId,
  snippets,
}: Readonly<PreviewPaneProps>) {
  const { framework, viewport, tab, setFramework, setViewport, setTab } =
    useWorkbench();
  const viewer = tabToViewer(tab);
  const ActiveSlot = FRAMEWORK_SLOTS[framework];

  // Warm the other framework chunks once, after first paint.
  useEffect(() => {
    preloadInactiveSlots(framework);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once on mount only
  }, []);

  return (
    <div className="border-border bg-background supports-[backdrop-filter]:bg-background/60 overflow-hidden rounded-2xl border shadow-sm supports-[backdrop-filter]:backdrop-blur-xl">
      {/* Single-row toolbar: framework pills | preview/code toggle | devices */}
      <div className="border-border flex w-full flex-wrap items-center justify-between gap-2 border-b p-2">
        <ToggleGroup
          type="single"
          value={framework}
          onValueChange={(value) => {
            if (value) setFramework(value as Framework);
          }}
          variant="outline"
          className="w-fit gap-1"
          aria-label="Framework"
        >
          <ToggleGroupItem value="bootstrap" className={pillItem}>
            Bootstrap
          </ToggleGroupItem>
          <ToggleGroupItem value="antd" className={pillItem}>
            Ant Design
          </ToggleGroupItem>
          <ToggleGroupItem value="shadcn" className={pillItem}>
            shadcn/ui
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          type="single"
          value={viewer}
          onValueChange={(value) => {
            if (value === "code" || value === "preview") setTab(value);
          }}
          variant="outline"
          className="w-fit gap-1"
          aria-label="Preview or code view"
        >
          <ToggleGroupItem
            value="preview"
            className="text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-full px-4"
          >
            Preview
          </ToggleGroupItem>
          <ToggleGroupItem
            value="code"
            className="text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-full px-4"
          >
            Code
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            {VIEWPORTS.map((vp) => {
              const Icon = viewportIcons[vp];
              const label = vp.charAt(0).toUpperCase() + vp.slice(1);
              return (
                <Tooltip key={vp}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewport === vp ? "secondary" : "ghost"}
                      size="icon-sm"
                      aria-label={label}
                      aria-pressed={viewport === vp}
                      onClick={() => {
                        setViewport(vp);
                      }}
                    >
                      <Icon size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </div>

      {viewer === "code" ? (
        <div className="p-4">
          <CodeBlock code={snippets[framework]} filename={`${patternId}.tsx`} />
        </div>
      ) : (
        <div className="p-3">
          <div className="dot-grid-bg flex min-h-[180px] items-center justify-center rounded-md p-3">
            <div
              className="w-full"
              style={{
                maxWidth: viewportWidths[viewport],
                transition: "max-width 200ms ease",
              }}
            >
              <PreviewErrorBoundary
                key={`${patternId}-${framework}`}
                patternId={patternId}
              >
                <ActiveSlot patternId={patternId} />
              </PreviewErrorBoundary>
            </div>
          </div>
          <p className="text-muted-foreground text-center text-xs">
            Rendered live from <code>@patternbase/{framework}</code>
          </p>
        </div>
      )}
    </div>
  );
}
```

What was removed vs. the old file: the `IconDownload`/`IconCopy`/`IconCheck` imports and `INSTALL_COMMANDS` (install Popover is gone), `useState` (no more `installOpened`/`copied`), the two-row chrome (viewport row + centered framework row) collapsed into one `p-2` row, `snippets` prop added, and `border` → acrylic glass classes. `useEffect`/`preloadInactiveSlots`, viewport icons + Tooltips, the `dot-grid-bg` stage, `viewportWidths`, and the error boundary are preserved.

- [ ] **Step 2: Verify (folded into Task 4 Steps 4–5 — run `tsc` there)**

Run: `pnpm exec tsc --noEmit` (from `apps/docs`)
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/workbench/preview-pane.tsx
git commit -m "feat(docs): rebuild preview pane as glass viewer with preview/code toggle"
```

---

## Task 6: Hero card + padding fix on the pattern page

**Files:** Modify `apps/docs/src/app/(shell)/patterns/[category]/[pattern]/page.tsx`; delete `apps/docs/src/components/workbench/inspector-pane.tsx`

- [ ] **Step 1: Replace the page file**

```tsx
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "cn";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RelatedPatternLink } from "@/components/preview/docs-card";
import { Workbench } from "@/components/workbench/workbench";
import { patternExplanations } from "@/data/pattern-explanations";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";
import { propsData } from "@/data/props-data";
import { codeSnippets } from "@/data/snippet-templates";
import { getCategoryColors } from "@/lib/category-colors";
import { getCategoryIcon } from "@/lib/category-icons";

function getRecordEntry<T>(
  record: Record<string, T>,
  key: string,
): T | undefined {
  return record[key];
}

interface PatternPageParams {
  params: Promise<{ category: string; pattern: string }>;
}

export async function generateMetadata({
  params,
}: PatternPageParams): Promise<Metadata> {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);
  if (!pattern || !category) return {};

  return {
    title: pattern.name,
    description: pattern.description,
    openGraph: {
      title: `${pattern.name} | PatternBase`,
      description: pattern.description,
    },
  };
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default async function PatternPage({
  params,
}: Readonly<PatternPageParams>) {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);

  if (!pattern || !category) notFound();

  const colors = getCategoryColors(pattern.category);
  const Icon = getCategoryIcon(pattern.category);

  const currentIndex = patterns.findIndex((p) => p.id === pattern.id);
  const prev = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const next =
    currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  const snippets = getRecordEntry(codeSnippets, pattern.id);
  const explanation = getRecordEntry(patternExplanations, pattern.id);
  const propDefinitions = getRecordEntry(propsData, pattern.id);

  const relatedLinks: readonly RelatedPatternLink[] = explanation
    ? explanation.relatedPatterns.map((rp) => {
        const related = patterns.find((p) => p.name === rp);
        return related
          ? { label: rp, href: `/patterns/${related.category}/${related.slug}` }
          : { label: rp };
      })
    : [];

  return (
    <div className="flex min-h-full flex-col gap-4">
      {/* Hero */}
      <Card size="sm" variant="interactive" className="rounded-2xl">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  colors.chip,
                )}
              >
                <Icon size={22} className={colors.text} />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl font-semibold">
                  {pattern.name}
                </CardTitle>
                <CardDescription className="mt-1 max-w-prose">
                  {pattern.description}
                </CardDescription>
              </div>
            </div>
            <Badge
              asChild
              variant="outline"
              className="text-muted-foreground hover:text-primary shrink-0 gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
            >
              <Link href={`/patterns/${category.id}`}>
                {category.name}
                <IconChevronRight data-icon="inline-end" size={14} />
              </Link>
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Workbench: viewer + props/docs below */}
      {!snippets ? (
        <p className="mb-4 text-red-600 dark:text-red-400">
          Snippet generation missing for {`"${pattern.id}"`} — run{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
            pnpm generate-snippets
          </code>
          .
        </p>
      ) : (
        <Workbench
          patternId={pattern.id}
          snippets={snippets}
          explanation={explanation}
          propDefinitions={propDefinitions}
          relatedLinks={relatedLinks}
        />
      )}

      {/* Prev/Next Navigation */}
      <Separator className="mt-2" />
      <nav
        aria-label="Pattern navigation"
        className="flex items-center justify-between gap-2 pt-4"
      >
        {prev ? (
          <Button asChild variant="ghost">
            <Link href={`/patterns/${prev.category}/${prev.slug}`}>
              <IconArrowLeft data-icon="inline-start" />
              {prev.name}
            </Link>
          </Button>
        ) : (
          <span aria-hidden />
        )}
        {next ? (
          <Button asChild variant="ghost">
            <Link href={`/patterns/${next.category}/${next.slug}`}>
              {next.name}
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        ) : (
          <span aria-hidden />
        )}
      </nav>
    </div>
  );
}
```

Key changes vs. the old file: wrapper `p-4 md:p-6` → `gap-4` (the shell content card already supplies `p-4`); the hand-built header block becomes a `Card size="sm" variant="interactive" rounded-2xl` with a category `Badge`/`Link` pill at the right and a tag row; `RelatedPatternLink` now comes from `docs-card`; the snippet-warning `<code>` chip uses `bg-muted`.

- [ ] **Step 2: Delete the decomposed inspector**

Delete `apps/docs/src/components/workbench/inspector-pane.tsx`.

- [ ] **Step 3: Type-check + lint the page**

Run (from `apps/docs`; the bracket/no-paren-path quirk requires node + a glob for the route):
`node ../../node_modules/eslint/bin/eslint.js "src/app/(shell)/**/page.tsx" src/components/preview src/components/workbench`
then `pnpm exec tsc --noEmit`
Expected: no errors/warnings.

- [ ] **Step 4: Commit**

```bash
git add "apps/docs/src/app/(shell)/patterns/[category]/[pattern]/page.tsx" apps/docs/src/components/workbench/inspector-pane.tsx
git commit -m "feat(docs): reframe pattern hero as shell card and drop double padding"
```

---

## Task 7: Tokenize the CodeBlock outer chrome

**Files:** Modify `apps/docs/src/components/preview/code-block.tsx`

- [ ] **Step 1: Change the outer border**

In `code-block.tsx`, replace line 31's outer wrapper class:

```tsx
    <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
```

with:

```tsx
    <div className="border-border overflow-hidden rounded-xl border">
```

The dark editor header (`bg-[#1e1e2e]`), the vsDark `Highlight`, line numbers, and copy button are content, not chrome — they stay as-is.

- [ ] **Step 2: Type-check + lint**

Run (from `apps/docs`): `pnpm exec tsc --noEmit` and `pnpm exec eslint src/components/preview/code-block.tsx`
Expected: no errors/warnings.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/components/preview/code-block.tsx
git commit -m "style(docs): tokenize code block border"
```

---

## Task 8: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Unit tests**

Run (from `apps/docs`): `pnpm exec vitest run`
Expected: all pass, including `workbench-params.test.ts`.

- [ ] **Step 2: Type-check + lint whole docs app**

From `apps/docs`:

- `pnpm exec tsc --noEmit`
- `node ../../node_modules/eslint/bin/eslint.js "src/app/(shell)/**" "src/app/(shell)/**/page.tsx" src/components src/lib`
  Expected: no errors.

- [ ] **Step 3: Build**

From the repo root: `pnpm build`
Expected: turbo completes; `@patternbase/docs` builds (the docs `build` runs `generate-snippets && next build` first).

- [ ] **Step 4: Render check (dev server)**

With `pnpm dev` running, request the pattern page for all three frameworks and the code surface:

- `curl -s -o $null -w "%{http_code}" "http://localhost:3000/patterns/prompt-actions/open-input?fw=shadcn"` → `200`
- `curl -s -o $null -w "%{http_code}" "http://localhost:3000/patterns/prompt-actions/open-input?fw=shadcn&tab=code"` → `200`
- `curl -s -o $null -w "%{http_code}" "http://localhost:3000/patterns/prompt-actions/open-input?fw=antd&vp=mobile"` → `200`

In-browser (manual): confirm the toolbar is one row (framework left, Preview/Code center with primary on-state, device icons right with tooltips), Preview shows the dot-grid live component, Code shows the dark source viewer, Props and Docs cards sit side-by-side below on desktop and stack on mobile, and the hero card + category pill read like the browse cards.

---

## Self-Review

**Spec coverage**

- Full-width preview on top, no side rail → Task 4/5 stack.
- Preview/Code toggle swapping the viewer in place → Task 5 center `ToggleGroup` + `tabToViewer`.
- Props + Docs below the preview, side-by-side on wide → Task 4 grid (`md:grid-cols-2`), stacked on mobile.
- Install button removed → Task 5 (Popover + `INSTALL_COMMANDS` deleted).
- Toolbar one row: pills left, toggle center, device right → Task 5.
- Acrylic glass on every surface → Tasks 2/3/5 (viewer, props, docs, hero Card via `bg-primary/…` + blueprint), CodeBlock keeps its editor (Task 7).
- No new components → all vendored (Card, Badge, ToggleGroup, Tooltip); `docs-card.tsx` is a refactor of `InspectorDocs`, not a new shadcn primitive.
- URL state machine preserved → Task 1 keeps `fw/tab/vp`, adds `preview` default; `tab=code` deep-links to code, `tab=props|docs` scrolls (Task 4 effect).
- Double padding fixed → Task 6.
- Hard-coded gray/violet removed → Tasks 2/3/5/7 (only the "required" red keeps explicit `red-600/dark:red-400` because no `text-destructive` token is guaranteed in this app's theme).

**Placeholder scan** — all steps carry full file contents or exact one-line edits; no TBD/"add handling" placeholders.

**Type consistency** — `tabToViewer(tab): ViewerMode` (Task 1) is consumed by `PreviewPane` (Task 5); `PreviewPaneProps.snippets` matches `WorkbenchProps.snippets` (Task 4); `RelatedPatternLink` defined in `docs-card.tsx` (Task 2) and imported by page + workbench (Tasks 4/6); `inspector-pane.tsx` only removed after `page.tsx` stops importing it (Task 6). Workbench state includes the new `"preview"` tab everywhere (`DEFAULT_TAB`, context `DEFAULT_STATE`, parse/build) — `workbench-context.tsx` needs no edit.
