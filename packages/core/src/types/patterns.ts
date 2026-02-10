/**
 * Core type definitions for AI UX patterns
 */

// ── Wayfinder Patterns ──

export interface StarterPrompt {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  category?: string;
  icon?: string;
}

export interface SuggestionsProps {
  suggestions: StarterPrompt[];
  onSelect: (prompt: StarterPrompt) => void;
  columns?: 2 | 3 | 4;
  variant?: "chip" | "card";
}

// ── Input Patterns ──

export interface OpenInputProps {
  placeholder?: string;
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
  multiModal?: boolean;
  acceptedFileTypes?: string[];
  maxLength?: number;
}

// ── Tuner Patterns ──

export interface ParameterControlItem {
  id: string;
  label: string;
  type: "slider" | "toggle" | "select" | "matrix";
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: unknown }[];
  description?: string;
}

export interface ParameterControlProps {
  parameters: ParameterControlItem[];
  onChange: (id: string, value: unknown) => void;
  title?: string;
  layout?: "vertical" | "horizontal";
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  description?: string;
  contextWindow?: number;
  maxTokens?: number;
  costPer1kInput?: number;
  costPer1kOutput?: number;
  capabilities?: string[];
}

export interface ModelManagementProps {
  models: ModelInfo[];
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  showDetails?: boolean;
  groupByProvider?: boolean;
}

// ── Governor Patterns ──

export interface ThoughtStep {
  id: string;
  type: "thinking" | "action" | "tool_call" | "result";
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface StreamOfThoughtProps {
  steps: ThoughtStep[];
  isStreaming?: boolean;
  collapsible?: boolean;
}

export interface CitationItem {
  id: string;
  source: string;
  url?: string;
  snippet: string;
  relevance?: number;
}

export interface CitationProps {
  citation: CitationItem;
}

export interface CitationsListProps {
  citations: CitationItem[];
  title?: string;
  maxVisible?: number;
}

export interface InlineCitationProps {
  citationNumber: number;
  source: string;
  url?: string;
}

export interface VariationItem {
  id: string;
  content: string;
  label?: string;
  metadata?: Record<string, unknown>;
}

export interface VariationsProps {
  variations: VariationItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  layout?: "grid" | "list" | "tabs";
  columns?: 2 | 3;
}

export interface CostBreakdown {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  model?: string;
}

export interface CostEstimateProps {
  breakdown: CostBreakdown;
  currency?: string;
  showTokens?: boolean;
}

// ── Prompt Action Patterns ──

export interface RegenerateProps {
  onRegenerate: () => void;
  isRegenerating?: boolean;
  variant?: "button" | "icon" | "dropdown";
  options?: {
    label: string;
    onSelect: () => void;
  }[];
}

// ── Trust Builder Patterns ──

export interface DisclosureProps {
  variant: "badge" | "banner" | "inline";
  type: "ai-generated" | "ai-assisted" | "ai-suggested";
  model?: string;
  timestamp?: Date;
  customLabel?: string;
}
