import type { CategoryInfo, PatternCategory, PatternMeta } from "@ai-ui/core";

export const categories: CategoryInfo[] = [
  {
    id: "prompt-actions",
    name: "Prompt Actions",
    description: "Components for submitting and managing AI prompts",
    icon: "\u2328\uFE0F",
  },
  {
    id: "wayfinders",
    name: "Wayfinders",
    description: "Guide users to productive starting points",
    icon: "\uD83E\uDDED",
  },
  {
    id: "tuners",
    name: "Tuners",
    description: "Controls for adjusting AI behavior and parameters",
    icon: "\uD83C\uDF9B\uFE0F",
  },
  {
    id: "governors",
    name: "Governors",
    description: "Transparency and control over AI reasoning",
    icon: "\uD83D\uDD0D",
  },
  {
    id: "trust-builders",
    name: "Trust Builders",
    description: "Build user confidence in AI-generated content",
    icon: "\uD83D\uDEE1\uFE0F",
  },
];

export const patterns: PatternMeta[] = [
  {
    id: "open-input",
    name: "Open Input",
    slug: "open-input",
    category: "prompt-actions",
    description: "Chat-style prompt interface for submitting queries to AI",
    tags: ["input", "prompt", "chat"],
  },
  {
    id: "suggestions",
    name: "Suggestions",
    slug: "suggestions",
    category: "wayfinders",
    description:
      "Starter prompt chips and cards to solve the blank canvas problem",
    tags: ["onboarding", "prompts", "starter"],
  },
  {
    id: "parameter-control",
    name: "Parameter Control",
    slug: "parameter-control",
    category: "tuners",
    description: "Sliders, toggles, and selects for fine-tuning AI parameters",
    tags: ["settings", "controls", "parameters"],
  },
  {
    id: "stream-of-thought",
    name: "Stream of Thought",
    slug: "stream-of-thought",
    category: "governors",
    description: "Step-by-step display of AI reasoning process",
    tags: ["reasoning", "transparency", "steps"],
  },
  {
    id: "citation",
    name: "Citation",
    slug: "citation",
    category: "governors",
    description:
      "Source attribution with relevance scores for AI-generated content",
    tags: ["sources", "references", "trust"],
  },
  {
    id: "regenerate",
    name: "Regenerate",
    slug: "regenerate",
    category: "prompt-actions",
    description: "Re-run generation button with variant options",
    tags: ["retry", "generation", "actions"],
  },
  {
    id: "disclosure",
    name: "Disclosure",
    slug: "disclosure",
    category: "trust-builders",
    description: "AI-generated content badge and banner indicators",
    tags: ["badge", "transparency", "labeling"],
  },
  {
    id: "variations",
    name: "Variations",
    slug: "variations",
    category: "governors",
    description: "Side-by-side comparison of generation alternatives",
    tags: ["comparison", "alternatives", "selection"],
  },
  {
    id: "cost-estimate",
    name: "Cost Estimate",
    slug: "cost-estimate",
    category: "governors",
    description: "Token usage and cost transparency display",
    tags: ["tokens", "cost", "transparency"],
  },
  {
    id: "model-management",
    name: "Model Management",
    slug: "model-management",
    category: "tuners",
    description: "Model selector with provider grouping and details",
    tags: ["models", "selection", "configuration"],
  },
  {
    id: "follow-up",
    name: "Follow Up",
    slug: "follow-up",
    category: "wayfinders",
    description: "Suggested follow-up prompts to keep the conversation flowing",
    tags: ["follow-up", "prompts", "conversation"],
  },
  {
    id: "templates",
    name: "Templates",
    slug: "templates",
    category: "wayfinders",
    description: "Pre-built prompt templates with customizable variables",
    tags: ["templates", "prompts", "reusable"],
  },
  {
    id: "gallery",
    name: "Gallery",
    slug: "gallery",
    category: "wayfinders",
    description: "Grid display for browsing and selecting generated content",
    tags: ["gallery", "grid", "browsing"],
  },
  {
    id: "attachments",
    name: "Attachments",
    slug: "attachments",
    category: "tuners",
    description: "File upload and attachment management for AI context",
    tags: ["files", "upload", "attachments"],
  },
  {
    id: "filters",
    name: "Filters",
    slug: "filters",
    category: "tuners",
    description: "Multi-type filter controls for refining AI output or input",
    tags: ["filters", "search", "refinement"],
  },
  {
    id: "connectors",
    name: "Connectors",
    slug: "connectors",
    category: "tuners",
    description:
      "Integrate external data sources into AI context with connection and sync status",
    tags: ["sources", "integration", "context"],
  },
  {
    id: "modes",
    name: "Modes",
    slug: "modes",
    category: "tuners",
    description:
      "Switch between discrete AI operating modes like Creative, Precise, or Safe",
    tags: ["mode", "behavior", "control"],
  },
  {
    id: "preset-styles",
    name: "Preset Styles",
    slug: "preset-styles",
    category: "tuners",
    description: "Apply bundled parameter/style configurations with one click",
    tags: ["presets", "style", "configuration"],
  },
  {
    id: "prompt-enhancer",
    name: "Prompt Enhancer",
    slug: "prompt-enhancer",
    category: "tuners",
    description:
      "Rewrite raw prompts into clearer, structured prompts with before/after review",
    tags: ["prompt", "rewrite", "quality"],
  },
  {
    id: "saved-styles",
    name: "Saved Styles",
    slug: "saved-styles",
    category: "tuners",
    description:
      "Persist and reuse custom style configurations across prompts and sessions",
    tags: ["saved", "styles", "presets"],
  },
  {
    id: "voice-and-tone",
    name: "Voice and Tone",
    slug: "voice-and-tone",
    category: "tuners",
    description:
      "Adjust communication style with controllable axes like formal-casual and technical-plain",
    tags: ["tone", "voice", "style"],
  },
  {
    id: "action-plan",
    name: "Action Plan",
    slug: "action-plan",
    category: "governors",
    description: "Step-by-step execution plan with approval controls",
    tags: ["plan", "steps", "approval"],
  },
  {
    id: "controls",
    name: "Controls",
    slug: "controls",
    category: "governors",
    description:
      "Master capability toggles for features like web search, memory, and tools",
    tags: ["toggles", "capabilities", "governance"],
  },
  {
    id: "draft-mode",
    name: "Draft Mode",
    slug: "draft-mode",
    category: "governors",
    description:
      "Iterative draft history with quick revert and branch actions from prior drafts",
    tags: ["drafts", "iteration", "history"],
  },
  {
    id: "memory",
    name: "Memory",
    slug: "memory",
    category: "governors",
    description:
      "View, edit, and delete user memory entries that the AI can reference",
    tags: ["memory", "profile", "control"],
  },
  {
    id: "references",
    name: "References",
    slug: "references",
    category: "governors",
    description:
      "Manage and inspect the URLs, documents, and snippets used as session context",
    tags: ["references", "sources", "context"],
  },
  {
    id: "branches",
    name: "Branches",
    slug: "branches",
    category: "governors",
    description:
      "Fork conversations into parallel paths and switch context between branches",
    tags: ["branching", "threads", "comparison"],
  },
  {
    id: "caveat",
    name: "Caveat",
    slug: "caveat",
    category: "trust-builders",
    description: "Contextual warnings and disclaimers for AI-generated content",
    tags: ["warning", "disclaimer", "trust"],
  },
  {
    id: "consent",
    name: "Consent",
    slug: "consent",
    category: "trust-builders",
    description: "Explicit user consent collection for AI data processing",
    tags: ["consent", "privacy", "permissions"],
  },
  {
    id: "auto-fill",
    name: "Auto-fill",
    slug: "auto-fill",
    category: "prompt-actions",
    description: "Typeahead suggestions that auto-complete user prompts",
    tags: ["autocomplete", "typeahead", "suggestions"],
  },
  {
    id: "summary",
    name: "Summary",
    slug: "summary",
    category: "prompt-actions",
    description: "AI-generated content summaries with regeneration controls",
    tags: ["summary", "condensed", "generation"],
  },
  {
    id: "initial-cta",
    name: "Initial CTA",
    slug: "initial-cta",
    category: "wayfinders",
    description: "First-run call-to-action that introduces AI capabilities",
    tags: ["onboarding", "cta", "welcome"],
  },
  {
    id: "nudges",
    name: "Nudges",
    slug: "nudges",
    category: "wayfinders",
    description: "Contextual tips and reminders to guide user behavior",
    tags: ["tips", "guidance", "notifications"],
  },
  {
    id: "prompt-details",
    name: "Prompt Details",
    slug: "prompt-details",
    category: "wayfinders",
    description: "Metadata and context display for submitted prompts",
    tags: ["metadata", "prompt", "details"],
  },
  {
    id: "randomize",
    name: "Randomize",
    slug: "randomize",
    category: "wayfinders",
    description: "Random seed control for exploring generation variety",
    tags: ["random", "seed", "variety"],
  },
  {
    id: "expand",
    name: "Expand",
    slug: "expand",
    category: "prompt-actions",
    description: "Expand AI-generated content with additional detail",
    tags: ["expand", "elaborate", "detail"],
  },
  {
    id: "transform",
    name: "Transform",
    slug: "transform",
    category: "prompt-actions",
    description: "Transform content between formats, tones, or styles",
    tags: ["transform", "convert", "rewrite"],
  },
  {
    id: "inline-action",
    name: "Inline Action",
    slug: "inline-action",
    category: "prompt-actions",
    description: "Quick action buttons embedded alongside AI content",
    tags: ["actions", "toolbar", "quick"],
  },
  {
    id: "chained-action",
    name: "Chained Action",
    slug: "chained-action",
    category: "prompt-actions",
    description: "Multi-step action sequences executed in order",
    tags: ["chain", "sequence", "workflow"],
  },
  {
    id: "data-ownership",
    name: "Data Ownership",
    slug: "data-ownership",
    category: "trust-builders",
    description: "User control over their data lifecycle and retention",
    tags: ["data", "privacy", "ownership"],
  },
  {
    id: "footprints",
    name: "Footprints",
    slug: "footprints",
    category: "trust-builders",
    description: "Activity history and audit trail of AI interactions",
    tags: ["history", "audit", "trail"],
  },
  {
    id: "describe",
    name: "Describe",
    slug: "describe",
    category: "prompt-actions",
    description:
      "Deconstruct AI outputs to reveal the prompt, parameters, and settings that produced them",
    tags: ["describe", "reverse-engineer", "transparency"],
  },
  {
    id: "inpainting",
    name: "Inpainting",
    slug: "inpainting",
    category: "prompt-actions",
    description:
      "Selectively edit specific regions of AI-generated content while preserving the rest",
    tags: ["edit", "region", "selective"],
  },
  {
    id: "madlibs",
    name: "Madlibs",
    slug: "madlibs",
    category: "prompt-actions",
    description:
      "Structured prompt templates with fill-in-the-blank variables for consistent generation",
    tags: ["template", "variables", "structured"],
  },
  {
    id: "restructure",
    name: "Restructure",
    slug: "restructure",
    category: "prompt-actions",
    description:
      "Change the structural form of content — condense, expand, reorder, or extract",
    tags: ["structure", "condense", "reorder"],
  },
  {
    id: "restyle",
    name: "Restyle",
    slug: "restyle",
    category: "prompt-actions",
    description:
      "Alter the surface style of AI outputs without changing underlying content",
    tags: ["style", "tone", "aesthetic"],
  },
  {
    id: "synthesis",
    name: "Synthesis",
    slug: "synthesis",
    category: "governors",
    description:
      "Combine data from multiple sources to extract patterns, insights, and themes",
    tags: ["synthesis", "insights", "multi-source"],
  },
];

export function getPatternsByCategory(
  category: PatternCategory,
): PatternMeta[] {
  return patterns.filter((p) => p.category === category);
}

export function getPatternBySlug(slug: string): PatternMeta | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}
