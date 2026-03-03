# AI Vory — Pattern Library Build Plan

> **Living document** — updated as work progresses.
> Last updated: 2026-03-03

---

## What We Are Building

**AI Vory** is a multi-framework React component library for AI user interfaces. Every component implements a named UX pattern from [shapeof.ai](https://www.shapeof.ai) — a pattern language for designing AI products.

### Core philosophy

The library **composes on top of existing UI frameworks** rather than replacing them. Users install their preferred UI library (Ant Design or React Bootstrap) and then pull in `@ai-ui/antd` or `@ai-ui/bootstrap` for the AI-specific pattern components. This means:

- No design system lock-in — drop into any project that already uses antd or react-bootstrap
- Each pattern has identical prop interfaces regardless of framework (defined once in `@ai-ui/core`)
- The docs site (`apps/docs`) shows live, interactive previews of both implementations side-by-side

### Repo layout

```
ai-vory/
├── packages/
│   ├── core/          @ai-ui/core      — types, hooks, utils (framework-agnostic)
│   ├── antd/          @ai-ui/antd      — Ant Design implementations
│   ├── bootstrap/     @ai-ui/bootstrap — React Bootstrap implementations
│   ├── eslint-config/ @ai-ui/eslint-config
│   └── vitest-config/ @ai-ui/vitest-config
└── apps/
    └── docs/          @ai-ui/docs      — Next.js 16 docs site (Mantine UI)
```

### Every pattern requires work in these layers

1. **`packages/core/src/types/patterns.ts`** — add TypeScript interfaces for the pattern's props and any sub-types
2. **`packages/antd/src/components/<name>/`** — Ant Design implementation (`<name>.tsx` + `index.ts`)
3. **`packages/bootstrap/src/components/<name>/`** — React Bootstrap implementation
4. **`packages/antd/src/index.ts`** — barrel export
5. **`packages/bootstrap/src/index.ts`** — barrel export
6. **`apps/docs/src/data/patterns.ts`** — add `PatternMeta` entry (id, slug, category, description, tags)
7. **`apps/docs/src/data/demo-data.ts`** — add demo constants used by the registry
8. **`apps/docs/src/lib/registry.tsx`** — register both framework components with demo props
9. **`apps/docs/src/data/snippet-templates.ts`** — add code snippet template function
10. **`apps/docs/src/data/pattern-explanations.ts`** — add explanation (overview, variants, useCases, bestPractices, relatedPatterns)

---

## Pattern Source

All patterns are sourced from [shapeof.ai](https://www.shapeof.ai). The site organises patterns into five categories that map directly to our docs routing:

| Category       | Route prefix                | shapeof.ai section           |
| -------------- | --------------------------- | ---------------------------- |
| Prompt Actions | `/patterns/prompt-actions/` | Prompt Actions               |
| Wayfinders     | `/patterns/wayfinders/`     | Wayfinders                   |
| Tuners         | `/patterns/tuners/`         | Tuners                       |
| Governors      | `/patterns/governors/`      | Governors                    |
| Trust Builders | `/patterns/trust-builders/` | Trust Builders + Identifiers |

---

## Progress Overview

| Status                     | Count  |
| -------------------------- | ------ |
| ✅ Implemented & committed | 39     |
| 🔄 In progress             | 0      |
| ⬜ Planned                 | 15     |
| **Total**                  | **54** |

---

## Completed Patterns — 39

### Prompt Actions (10/10 complete for this sub-group)

- [x] **Open Input** — Chat-style prompt input with submit, file attach, and model selector
- [x] **Regenerate** — Re-run generation button; supports variant selection before retry
- [x] **Expand** — Lengthen or elaborate AI-generated content with a click
- [x] **Transform** — Rewrite content into a different format, tone, or language
- [x] **Inline Action** — Quick action toolbar (copy, edit, share) anchored to AI content
- [x] **Chained Action** — Multi-step action sequences executed in order with progress tracking
- [x] **Auto-fill** — Typeahead that completes user prompts from a suggestion list
- [x] **Summary** — AI-generated content summaries with regeneration controls
- [x] **Describe** — Deconstruct AI outputs to reveal the prompt, parameters, and settings that produced them _(added in latest commit)_
- [x] **Inpainting** — Selectively edit specific regions of AI-generated content while preserving the rest _(added in latest commit)_
- [x] **Madlibs** — Structured prompt templates with fill-in-the-blank variables _(added in latest commit)_
- [x] **Restructure** — Change the structural form of content — condense, expand, reorder, extract _(added in latest commit)_
- [x] **Restyle** — Alter the surface style of AI outputs without changing underlying content _(added in latest commit)_

### Wayfinders (7 complete)

- [x] **Suggestions** — Starter prompt chips/cards to solve the blank canvas problem
- [x] **Follow Up** — Suggested next prompts to keep the conversation flowing
- [x] **Templates** — Pre-built prompt templates with customisable variables
- [x] **Gallery** — Grid display for browsing and selecting generated content
- [x] **Initial CTA** — First-run call-to-action that introduces AI capabilities
- [x] **Nudges** — Contextual tips and reminders to guide user behaviour
- [x] **Prompt Details** — Metadata and context display for submitted prompts
- [x] **Randomize** — Random seed control for exploring generation variety

### Tuners (7 complete)

- [x] **Parameter Control** — Sliders, toggles, selects for fine-tuning AI parameters
- [x] **Model Management** — Model selector with provider grouping and capability details
- [x] **Attachments** — File upload and attachment management for AI context
- [x] **Filters** — Multi-type filter controls for refining AI output or input
- [x] **Connectors** — Integrate external data sources into AI context with connection and sync status indicators _(added in latest commit)_
- [x] **Modes** — Discrete operating modes that change AI behavior wholesale _(added in latest commit)_
- [x] **Preset Styles** — One-click style presets that apply a bundle of parameter values at once _(added in latest commit)_

### Governors (5 complete)

- [x] **Stream of Thought** — Step-by-step display of AI reasoning process
- [x] **Citation** — Source attribution with relevance scores for AI-generated content
- [x] **Variations** — Side-by-side comparison of generation alternatives
- [x] **Cost Estimate** — Token usage and cost transparency display
- [x] **Action Plan** — Step-by-step execution plan with approval controls
- [x] **Synthesis** — Combine data from multiple sources to extract patterns and insights _(added in latest commit)_

### Trust Builders (6 complete)

- [x] **Disclosure** — AI-generated content badge and banner indicators
- [x] **Caveat** — Contextual warnings and disclaimers for AI-generated content
- [x] **Consent** — Explicit user consent collection for AI data processing
- [x] **Data Ownership** — User control over their data lifecycle and retention
- [x] **Footprints** — Activity history and audit trail of AI interactions

---

## Remaining Patterns — 15

### Batch 2: Tuners — 3 patterns ⬅️ NEXT

These 3 patterns complete the Tuners category. They all deal with adjusting AI _behaviour and style_ before or during generation — distinct from parameter sliders (which tune _model settings_).

- [ ] **Prompt Enhancer** — Automatically rewrites or augments a user's raw prompt before submission to improve output quality; shows before/after diff
- [ ] **Saved Styles** — Persist and recall user-defined style configurations; like bookmarks for parameter combinations
- [ ] **Voice and Tone** — Axis control for adjusting the communication register of AI outputs (formal↔casual, technical↔plain, etc.)

### Batch 3: Governors — 8 patterns

These patterns give users visibility and control over _how_ the AI works — building trust through transparency and edit access to intermediate states.

- [ ] **Branches** — Fork a conversation at any point into parallel threads; compare divergent paths from the same context
- [ ] **Controls** — Master on/off controls for AI capabilities (e.g. web search, memory, code execution); gives users agency over feature flags
- [ ] **Draft Mode** — Iterative draft-and-refine workflow; shows numbered drafts with the ability to revert or branch from any prior draft
- [ ] **Memory** — Surface what the AI has stored about the user; allow viewing, editing, and deleting individual memories
- [ ] **References** — Manage and display the documents, URLs, or context chunks the AI is drawing from in a given session
- [ ] **Sample Response** — Preview a short AI-generated example before committing to full generation; like a "taste" button
- [ ] **Shared Vision** — Collaborative workspace where multiple users contribute context or goals that the AI synthesises
- [ ] **Verification** — Inline fact-check overlay; highlights claims with confidence scores and links to supporting sources

### Batch 4: Trust Builders + Identifiers — 4 remaining

These patterns handle AI _identity_ and user _trust signals_ — the layer users see to understand they are working with AI and what kind.

- [ ] **Incognito Mode** — Session that leaves no history; clearly signals data is not retained after the session ends
- [ ] **Watermark** — Embeds a visible or invisible AI-provenance marker in generated content
- [ ] **Avatar** — Visual identity for the AI agent; configurable icon, name, and persona
- [ ] **Color** — Brand-colour assignment for AI identity elements across the UI

> **Note:** Identifiers (Iconography, Name, Personality) are likely styling/branding concerns rather than standalone interactive components. They may be documented as guidelines in the docs rather than implemented as component exports. To be decided when we reach that batch.

---

## Implementation Strategy & Rationale

### Why this ordering?

**Prompt Actions first** — these are the most interaction-rich patterns that most closely map to what developers reach for first when building an AI UI. Starting here produces the most immediately useful artefacts and validates the monorepo pipeline end-to-end.

**Tuners second** — tightly coupled to Prompt Actions; a real AI UI almost always needs both input controls (Prompt Actions) and behaviour tuning (Tuners) together. Completing this group gives developers a coherent set of primitives.

**Governors third** — adds the transparency and trust layer. Slightly more complex to model (branching conversations, memory management) so benefits from the patterns established in the first two batches.

**Trust Builders last** — identity and branding patterns are the least urgently needed for a functioning AI UI. Many projects will want the input/output patterns first and layer trust signals on later.

### Why identical prop interfaces across frameworks?

The entire value proposition of the library rests on this. If a team switches from antd to react-bootstrap, they should only change their import path — not their prop usage. All interfaces live in `@ai-ui/core` and both framework packages are type-checked against them via TypeScript strict mode.

### Why Turborepo?

The core package must build before antd/bootstrap can resolve its types. Turborepo's task graph (`antd#build` depends on `core#build`) handles this automatically and caches unchanged packages so the dev loop stays fast. The docs site additionally depends on all three packages.

### Why tsup for package builds?

tsup produces both CJS and ESM outputs with `.d.ts` declarations in a single config file. It handles React JSX, externalises peer deps (react, antd, react-bootstrap), and is significantly faster than tsc alone for library builds.

### Build quality gates (run on every commit via husky)

1. `prettier --write` on staged files (lint-staged)
2. `pnpm lint` — ESLint across all packages (0 errors tolerated; warnings acceptable)
3. `pnpm build` — tsup + Next.js static export must succeed
4. `pnpm type-check` — tsc strict mode across all packages
5. `pnpm test` — Vitest unit tests (currently 17 tests in core utilities)

---

## Docs Site Architecture

The docs site at `apps/docs` uses a **registry pattern** to render live previews:

```
URL: /patterns/{category}/{pattern-slug}
        ↓
page.tsx → looks up PatternMeta from patterns.ts
        ↓
<ComponentPreview patternId={pattern.id} />
        ↓
registry.tsx → { bootstrap: <Component />, antd: <Component /> }
        ↓
framework-tabs.tsx → renders active framework's component
```

**Adding a new pattern to docs requires touching exactly 5 files:**

| File                               | What to add                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/data/patterns.ts`             | `PatternMeta` entry in `patterns[]` array                                                     |
| `src/data/demo-data.ts`            | Demo constants (data the preview renders with)                                                |
| `src/lib/registry.tsx`             | Import components + add `[patternId]: { bootstrap, antd }` entry                              |
| `src/data/snippet-templates.ts`    | Code snippet function returning install + usage example                                       |
| `src/data/pattern-explanations.ts` | `PatternExplanation` object with overview, variants, useCases, bestPractices, relatedPatterns |

---

## Known Issues & Tech Debt

| Issue                                                | Severity | Notes                                                                                                                                                     |
| ---------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~47 ESLint warnings across antd + bootstrap packages | Low      | All warnings, no errors; pre-existing; patterns: `no-nested-ternary`, `jsx-a11y/click-events-have-key-events`, `eqeqeq`. Not blocking.                    |
| LF→CRLF line ending warnings on Windows              | Cosmetic | Git autocrlf on Windows; file contents are correct.                                                                                                       |
| No component-level tests in antd/bootstrap           | Medium   | Only core utility tests exist. Should add smoke tests (renders without crashing) for each component, particularly after the full pattern set is complete. |
| `simple-import-sort` warnings in new antd files      | Low      | import order in describe, inpainting, synthesis antd components; prettier writes them differently to what the linter expects. Fix with `pnpm lint:fix`.   |

---

## Definition of Done (per pattern)

A pattern is **done** when:

- [ ] TypeScript interfaces added to `packages/core/src/types/patterns.ts`
- [ ] Ant Design component created, builds without errors
- [ ] React Bootstrap component created, builds without errors
- [ ] Both components exported from their package `index.ts`
- [ ] `PatternMeta` entry added to docs `patterns.ts`
- [ ] Demo data added to `demo-data.ts`
- [ ] Registry entry added in `registry.tsx` with realistic demo props
- [ ] Code snippet template added to `snippet-templates.ts`
- [ ] Explanation added to `pattern-explanations.ts`
- [ ] `pnpm build` passes (all 4 packages + docs static generation)
- [ ] `pnpm lint` passes (0 errors)
- [ ] Committed with conventional commit message (`feat: add <Pattern> pattern`)
