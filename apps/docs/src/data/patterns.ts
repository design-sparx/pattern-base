import type { PatternMeta, CategoryInfo, PatternCategory } from '@ai-ui/core';

export const categories: CategoryInfo[] = [
  {
    id: 'prompt-actions',
    name: 'Prompt Actions',
    description: 'Components for submitting and managing AI prompts',
    icon: '\u2328\uFE0F',
  },
  {
    id: 'wayfinders',
    name: 'Wayfinders',
    description: 'Guide users to productive starting points',
    icon: '\uD83E\uDDED',
  },
  {
    id: 'tuners',
    name: 'Tuners',
    description: 'Controls for adjusting AI behavior and parameters',
    icon: '\uD83C\uDF9B\uFE0F',
  },
  {
    id: 'governors',
    name: 'Governors',
    description: 'Transparency and control over AI reasoning',
    icon: '\uD83D\uDD0D',
  },
  {
    id: 'trust-builders',
    name: 'Trust Builders',
    description: 'Build user confidence in AI-generated content',
    icon: '\uD83D\uDEE1\uFE0F',
  },
];

export const patterns: PatternMeta[] = [
  {
    id: 'open-input',
    name: 'Open Input',
    slug: 'open-input',
    category: 'prompt-actions',
    description: 'Chat-style prompt interface for submitting queries to AI',
    tags: ['input', 'prompt', 'chat'],
  },
  {
    id: 'suggestions',
    name: 'Suggestions',
    slug: 'suggestions',
    category: 'wayfinders',
    description: 'Starter prompt chips and cards to solve the blank canvas problem',
    tags: ['onboarding', 'prompts', 'starter'],
  },
  {
    id: 'parameter-control',
    name: 'Parameter Control',
    slug: 'parameter-control',
    category: 'tuners',
    description: 'Sliders, toggles, and selects for fine-tuning AI parameters',
    tags: ['settings', 'controls', 'parameters'],
  },
  {
    id: 'stream-of-thought',
    name: 'Stream of Thought',
    slug: 'stream-of-thought',
    category: 'governors',
    description: 'Step-by-step display of AI reasoning process',
    tags: ['reasoning', 'transparency', 'steps'],
  },
  {
    id: 'citation',
    name: 'Citation',
    slug: 'citation',
    category: 'governors',
    description: 'Source attribution with relevance scores for AI-generated content',
    tags: ['sources', 'references', 'trust'],
  },
  {
    id: 'regenerate',
    name: 'Regenerate',
    slug: 'regenerate',
    category: 'prompt-actions',
    description: 'Re-run generation button with variant options',
    tags: ['retry', 'generation', 'actions'],
  },
  {
    id: 'disclosure',
    name: 'Disclosure',
    slug: 'disclosure',
    category: 'trust-builders',
    description: 'AI-generated content badge and banner indicators',
    tags: ['badge', 'transparency', 'labeling'],
  },
  {
    id: 'variations',
    name: 'Variations',
    slug: 'variations',
    category: 'governors',
    description: 'Side-by-side comparison of generation alternatives',
    tags: ['comparison', 'alternatives', 'selection'],
  },
  {
    id: 'cost-estimate',
    name: 'Cost Estimate',
    slug: 'cost-estimate',
    category: 'governors',
    description: 'Token usage and cost transparency display',
    tags: ['tokens', 'cost', 'transparency'],
  },
  {
    id: 'model-management',
    name: 'Model Management',
    slug: 'model-management',
    category: 'tuners',
    description: 'Model selector with provider grouping and details',
    tags: ['models', 'selection', 'configuration'],
  },
];

export function getPatternsByCategory(category: PatternCategory): PatternMeta[] {
  return patterns.filter((p) => p.category === category);
}

export function getPatternBySlug(slug: string): PatternMeta | undefined {
  return patterns.find((p) => p.slug === slug);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}
