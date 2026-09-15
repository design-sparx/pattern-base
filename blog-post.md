# PatternBase: A Shared Design Language for AI UX

Every AI product today faces the same interface problems: the prompt input, the regenerate button, the cost breakdown, the disclosure badge saying "AI-generated." Teams building AI features end up reinventing these patterns from scratch — often inconsistently, and almost always with accessibility gaps.

[PatternBase](https://github.com/design-sparx/pattern-base) is a multi-framework React component library that solves this. It provides **54 AI UX patterns** implemented across **four UI libraries** — Ant Design, Mantine, shadcn/ui, and Bootstrap — all sharing a single set of prop interfaces and framework-agnostic core hooks.

---

## The problem: AI UX is a new medium, and everyone is inventing it alone

The [shapeof.ai](https://www.shapeof.ai) catalog documents the recurring interface patterns that emerge when you put an AI in front of a user. You've seen them everywhere:

- An **open input** that suggests starter prompts
- A **parameter control** panel for temperature or model selection
- A **stream of thought** trace showing reasoning steps
- A **citation** card that links back to a source
- A **disclosure** badge: "AI-generated"
- A **cost estimate** breakdown showing tokens and price

Each of these has non-trivial UX concerns. A disclosure badge needs the right accessibility semantics. A citation card needs to handle missing URLs gracefully. A parameter control needs a consistent slider API across sliders, toggles, selects, and matrix controls.

Most teams build these from scratch. The result is inconsistent UX across products, duplicated effort, and subtle bugs that erode user trust.

---

## What PatternBase gives you

PatternBase covers **54 patterns** across five categories, each implemented as a typed React component with identical prop interfaces in every framework:

| Category           | Patterns                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt Actions** | OpenInput, Regenerate, Expand, Transform, InlineAction, ChainedAction, AutoFill, Summary, Describe, Inpainting, Madlibs, Restructure, Restyle                             |
| **Wayfinders**     | Suggestions, FollowUp, Templates, Gallery, InitialCta, Nudges, PromptDetails, Randomize                                                                                   |
| **Tuners**         | ParameterControl, ModelManagement, Attachments, Filters, Connectors, Modes, PresetStyles, PromptEnhancer, SavedStyles, VoiceAndTone                                       |
| **Governors**      | StreamOfThought, Citation, Variations, CostEstimate, ActionPlan, Synthesis, Branches, Controls, DraftMode, Memory, References, SampleResponse, SharedVision, Verification |
| **Trust Builders** | Disclosure, Caveat, Consent, DataOwnership, Footprints, IncognitoMode, Watermark, Avatar, Color                                                                           |

The key architectural promise: **same props, different UI**. You can swap from Mantine to shadcn/ui by changing your import — your component tree, types, and state logic stay identical.

```tsx
// Mantine
import { OpenInput, Suggestions } from "@patternbase/mantine";

// shadcn/ui — same props, different primitives
import { OpenInput, Suggestions } from "@patternbase/shadcn";
```

The shared types and hooks live in `@patternbase/core` — a zero-UI dependency package. This means you can use the core state logic (streaming response handling, generation state, prompt history) without importing any framework at all.

---

## Where this is actually useful

### 1. You're building an AI-native product

If you're shipping a chatbot, a writing assistant, an image generator, or any product where a model responds to user input, these patterns are your interface vocabulary. Instead of building a `Disclosure` badge or a `Citation` card from scratch, you import a tested, typed component and wire up your data.

The `OpenInput` pattern alone covers a surprising amount of complexity: placeholder text, loading state, suggestions, multimodal file attachment, accepted file types, and character limits — all behind one props interface.

### 2. You're on a design system team with framework diversity

Many organizations standardize on one UI library, but some — especially those with multiple products or a migration in progress — need the same component in Ant Design and Mantine. PatternBase's prop parity means the product team's interaction logic doesn't change when the design system does.

This is especially valuable when you have:

- A greenfield product in shadcn/ui and a legacy product in Ant Design
- A migration from Bootstrap to Mantine
- Teams in different squads choosing their own stack

The shared `@patternbase/core` types are your contract. Everyone agrees on the shape of `ParameterControlItem` or `CitationProps` once, and the implementations stay aligned.

### 3. You're prototyping or doing UX research

The docs site ships with live, interactive previews of every pattern in all four frameworks. You can open a pattern page, toggle between Ant Design and Mantine, and see the same component behavior across libraries instantly. This is a fast way to evaluate which library's rendering matches your product's visual language before committing.

### 4. You want consistent AI disclosure and trust patterns

The Trust Builders category covers the patterns that separate thoughtful AI products from those that feel sketchy:

- **Disclosure** — clearly label AI-generated, AI-assisted, or AI-suggested content
- **Caveat** — show context-aware warnings with severity levels
- **Consent** — structured consent flows with accept/decline semantics
- **DataOwnership** — let users see, export, and delete their data
- **Footprints** — an activity log of AI interactions
- **IncognitoMode** — ephemeral sessions with retention notices

These patterns are where AI products most visibly earn or lose trust. Having them pre-built with the right variants (`badge`, `banner`, `inline`, `modal`) means you don't accidentally ship a disclosure component that screen readers miss.

---

## The architecture in brief

```
packages/
  core/      @patternbase/core   — types, hooks, utils (no UI deps)
  antd/      @patternbase/antd   — Ant Design implementations
  mantine/   @patternbase/mantine — Mantine implementations
  shadcn/    @patternbase/shadcn  — shadcn/ui implementations
  bootstrap/ @patternbase/bootstrap — Bootstrap implementations
```

The core package exports TypeScript interfaces for every pattern's props, plus shared hooks:

- `useAIGeneration` — orchestrates the generate → stream → complete lifecycle
- `useStreamingResponse` — handles incremental response rendering
- `usePromptHistory` — manages prompt history state
- `useGenerationState` — tracks loading, error, and result state

Each framework package imports only its host library's primitives. The Ant Design package uses `antd` Card and Button. The Mantine package uses `@mantine/core`. The shadcn package uses vendored Radix primitives and Tailwind v4. Nothing leaks between them.

---

## Getting started

```bash
git clone https://github.com/design-sparx/pattern-base.git
cd pattern-base
pnpm install
pnpm build
pnpm dev --filter=@patternbase/docs
```

Then pick the framework you use:

```tsx
// shadcn/ui
import { OpenInput, Suggestions, ParameterControl } from "@patternbase/shadcn";

// Ant Design
import { OpenInput, Suggestions, ParameterControl } from "@patternbase/antd";
```

Each component is documented in the live docs site with prop tables, code snippets, and interactive previews. You can inspect the component's props, copy the usage example, and swap the framework toggle to see the same component in a different library.

---

## Why this matters now

The AI interface design space is still early. We're in the equivalent of the web's 2005 era — patterns are being discovered and named. Most teams will eventually converge on a shared vocabulary for things like "the component that shows reasoning steps" or "the component that lets you pick a model."

PatternBase is an attempt to document that vocabulary as typed, reusable components — and to do it in a way that respects the reality that most teams are already invested in a specific UI library.

The project is MIT-licensed, published to npm, and open to contributions.

---

**Links**

- GitHub: [design-sparx/pattern-base](https://github.com/design-sparx/pattern-base)
- npm: `@patternbase/antd`, `@patternbase/mantine`, `@patternbase/shadcn`, `@patternbase/core`
- Pattern reference: [shapeof.ai](https://www.shapeof.ai)
