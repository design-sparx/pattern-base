# Refactor Snippets to Full Implementations

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace abstracted PatternBase import snippets with full component implementation code showing real library imports (react-bootstrap, antd, @mantine/core).

**Architecture:** Each snippet template function will return the complete component source code for its framework, read directly from the actual implementation files. This ensures snippets stay in sync with the real code.

**Tech Stack:** TypeScript, React, react-bootstrap, antd, @mantine/core

---

## Context

Currently `apps/docs/src/data/snippet-templates.ts` contains 42 snippet templates that return usage code like:

```tsx
import { OpenInput } from "@patternbase/bootstrap";
// usage example
```

Users need to see the actual implementation code with real library imports so they can copy the full component directly into their projects.

## Approach

Instead of duplicating 126 full implementations (42 patterns × 3 frameworks) in snippet-templates.ts, we'll:

1. Read the actual source files from `packages/{bootstrap,antd,mantine}/src/components/`
2. Include them as the snippet content
3. Keep a thin metadata layer for pattern names/descriptions

---

### Task 1: Create snippet source reader utility

**Files:**

- Create: `apps/docs/src/lib/snippet-sources.ts`

- [ ] **Step 1: Create the utility to read component source files**

```typescript
import { readFileSync } from "fs";
import { join } from "path";

type Framework = "bootstrap" | "antd" | "mantine";

const PACKAGES_DIR = join(process.cwd(), "packages");

const FRAMEWORK_DIRS: Record<Framework, string> = {
  bootstrap: "bootstrap",
  antd: "antd",
  mantine: "mantine",
};

export function getComponentSource(
  framework: Framework,
  componentName: string,
): string {
  const dir = FRAMEWORK_DIRS[framework];
  const filePath = join(
    PACKAGES_DIR,
    dir,
    "src",
    "components",
    componentName,
    `${componentName}.tsx`,
  );

  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return `// Component not found: ${componentName}`;
  }
}

export function getAllSnippets(): Record<
  string,
  { bootstrap: string; antd: string; mantine: string }
> {
  const patterns = [
    "open-input",
    "suggestions",
    "parameter-control",
    "preset-styles",
    "prompt-enhancer",
    "saved-styles",
    "voice-and-tone",
    "stream-of-thought",
    "citation",
    "regenerate",
    "disclosure",
    "variations",
    "cost-estimate",
    "model-management",
    "modes",
    "follow-up",
    "templates",
    "gallery",
    "attachments",
    "filters",
    "connectors",
    "action-plan",
    "branches",
    "controls",
    "draft-mode",
    "memory",
    "references",
    "sample-response",
    "shared-vision",
    "verification",
    "caveat",
    "consent",
    "incognito-mode",
    "watermark",
    "avatar",
    "color",
    "auto-fill",
    "summary",
    "initial-cta",
    "nudges",
    "prompt-details",
    "randomize",
    "expand",
    "transform",
    "inline-action",
    "chained-action",
    "data-ownership",
    "footprints",
    "describe",
    "inpainting",
    "madlibs",
    "restructure",
    "restyle",
    "synthesis",
  ];

  const snippets: Record<
    string,
    { bootstrap: string; antd: string; mantine: string }
  > = {};

  for (const pattern of patterns) {
    snippets[pattern] = {
      bootstrap: getComponentSource("bootstrap", pattern),
      antd: getComponentSource("antd", pattern),
      mantine: getComponentSource("mantine", pattern),
    };
  }

  return snippets;
}
```

- [ ] **Step 2: Verify utility works by testing with one pattern**

Run from `apps/docs`:

```bash
node -e "const { getComponentSource } = require('./src/lib/snippet-sources'); console.log(getComponentSource('bootstrap', 'open-input').substring(0, 200));"
```

Expected: First 200 chars of the bootstrap open-input implementation

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/lib/snippet-sources.ts
git commit -m "feat: add snippet source reader utility"
```

---

### Task 2: Update component-preview to use source reader

**Files:**

- Modify: `apps/docs/src/components/preview/component-preview.tsx`

- [ ] **Step 1: Read current component-preview.tsx**

Read `apps/docs/src/components/preview/component-preview.tsx` to understand current structure.

- [ ] **Step 2: Replace codeSnippets import with getAllSnippets**

Change the import from:

```typescript
import { codeSnippets } from "@/data/snippet-templates";
```

To:

```typescript
import { getAllSnippets } from "@/lib/snippet-sources";
```

- [ ] **Step 3: Update snippet access**

Change:

```typescript
const snippets = codeSnippets[patternId];
```

To:

```typescript
const snippets = getAllSnippets()[patternId];
```

- [ ] **Step 4: Verify the change compiles**

Run:

```bash
pnpm type-check
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/components/preview/component-preview.tsx
git commit -m "refactor: use source files for snippet display"
```

---

### Task 3: Remove old snippet-templates.ts

**Files:**

- Delete: `apps/docs/src/data/snippet-templates.ts`

- [ ] **Step 1: Check for other imports of snippet-templates**

Search for any other files importing from `snippet-templates`:

```bash
grep -r "snippet-templates" apps/docs/src/
```

- [ ] **Step 2: Remove snippet-templates.ts**

```bash
rm apps/docs/src/data/snippet-templates.ts
```

- [ ] **Step 3: Verify no broken imports**

Run:

```bash
pnpm type-check
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove old snippet-templates.ts"
```

---

### Task 4: Verify snippets display correctly

**Files:**

- Test: Manual verification in browser

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Open pattern preview page**

Navigate to a pattern page (e.g., open-input) and verify:

- Code snippet shows full implementation with react-bootstrap imports
- Framework tabs (Bootstrap/Antd/Mantine) each show their respective implementations
- Code is properly formatted and readable

- [ ] **Step 3: Test a few patterns across frameworks**

Verify at least 3 patterns show correct implementations:

- A simple pattern (e.g., `avatar`)
- A complex pattern (e.g., `stream-of-thought`)
- A pattern with multiple variants (e.g., `suggestions`)

- [ ] **Step 4: Run lint and type-check**

```bash
pnpm lint && pnpm type-check
```

Expected: No errors

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: snippet display issues"
```

---

## Verification Checklist

After completing all tasks:

1. [ ] All 42 patterns show full implementation code
2. [ ] Each framework tab shows correct imports (react-bootstrap, antd, @mantine/core)
3. [ ] No TypeScript errors
4. [ ] No lint errors
5. [ ] Dev server runs without errors
6. [ ] Code snippets are readable and properly formatted

## Notes

- The `snippet-templates.ts` file had ~900 lines of template strings
- The new approach reads directly from source files (~50-150 lines each × 42 patterns × 3 frameworks)
- Snippets will automatically stay in sync with actual implementations
- If a component is renamed or moved, the snippet will reflect the change
