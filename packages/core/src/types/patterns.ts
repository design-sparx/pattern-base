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

export interface ModeOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface ModesProps {
  modes: ModeOption[];
  selectedModeId: string;
  onModeChange: (modeId: string) => void;
  title?: string;
  variant?: "segmented" | "tabs";
}

export interface PresetStyle {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  values: Record<string, unknown>;
}

export interface PresetStylesProps {
  presets: PresetStyle[];
  selectedPresetId?: string;
  onApplyPreset: (presetId: string, values: Record<string, unknown>) => void;
  title?: string;
  variant?: "buttons" | "cards";
}

export interface PromptEnhancerProps {
  prompt: string;
  enhancedPrompt?: string;
  onEnhance: (prompt: string) => void;
  onApply?: (enhancedPrompt: string) => void;
  onEnhancedPromptChange?: (value: string) => void;
  isEnhancing?: boolean;
  title?: string;
  variant?: "split" | "inline";
  showDiff?: boolean;
}

export interface SavedStyleItem {
  id: string;
  name: string;
  description?: string;
  values: Record<string, unknown>;
  isDefault?: boolean;
}

export interface SavedStylesProps {
  styles: SavedStyleItem[];
  selectedStyleId?: string;
  onSelectStyle: (styleId: string) => void;
  onSaveStyle: (name: string) => void;
  onDeleteStyle?: (styleId: string) => void;
  title?: string;
  variant?: "list" | "cards";
  maxVisible?: number;
}

export interface VoiceToneAxis {
  id: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface VoiceAndToneProps {
  axes: VoiceToneAxis[];
  onChange: (axisId: string, value: number) => void;
  title?: string;
  showValues?: boolean;
  variant?: "sliders" | "compact";
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

export interface BranchItem {
  id: string;
  parentId?: string;
  label: string;
  preview?: string;
  depth?: number;
  createdAt?: Date;
}

export interface BranchesProps {
  branches: BranchItem[];
  activeBranchId?: string;
  onSelectBranch: (branchId: string) => void;
  onCreateBranch: (fromBranchId: string) => void;
  title?: string;
  variant?: "tree" | "list";
}

export interface ControlCapability {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
  locked?: boolean;
  status?: "active" | "disabled" | "restricted";
}

export interface ControlsProps {
  controls: ControlCapability[];
  onToggleControl: (controlId: string, enabled: boolean) => void;
  title?: string;
  variant?: "list" | "cards";
  showStatus?: boolean;
}

export interface DraftItem {
  id: string;
  number: number;
  label?: string;
  preview?: string;
  createdAt?: Date;
}

export interface DraftModeProps {
  drafts: DraftItem[];
  activeDraftId?: string;
  onSelectDraft: (draftId: string) => void;
  onRevertToDraft: (draftId: string) => void;
  onBranchFromDraft?: (draftId: string) => void;
  title?: string;
  variant?: "list" | "timeline";
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

export interface CaveatProps {
  message: string;
  variant?: "inline" | "banner" | "tooltip";
  severity?: "info" | "warning" | "error";
  title?: string;
  learnMoreUrl?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export interface ConsentItem {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  defaultChecked?: boolean;
}

export interface ConsentProps {
  items: ConsentItem[];
  onAccept: (acceptedIds: string[]) => void;
  onDecline?: () => void;
  title?: string;
  description?: string;
  acceptLabel?: string;
  declineLabel?: string;
  variant?: "modal" | "inline" | "banner";
}

// ── Additional Wayfinder Patterns ──

export interface FollowUpItem {
  id: string;
  text: string;
  icon?: string;
  category?: string;
}

export interface FollowUpProps {
  followUps: FollowUpItem[];
  onSelect: (followUp: FollowUpItem) => void;
  variant?: "chip" | "list" | "button";
  title?: string;
  maxVisible?: number;
}

export interface TemplateVariable {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select" | "number";
  options?: { label: string; value: string }[];
  defaultValue?: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  template: string;
  variables?: TemplateVariable[];
}

export interface TemplatesProps {
  templates: TemplateItem[];
  onSelect: (
    template: TemplateItem,
    variables?: Record<string, string>,
  ) => void;
  layout?: "grid" | "list";
  columns?: 2 | 3 | 4;
  searchable?: boolean;
  groupByCategory?: boolean;
}

export interface GalleryItem {
  id: string;
  type: "image" | "text" | "card";
  src?: string;
  alt?: string;
  content?: string;
  title?: string;
  metadata?: Record<string, unknown>;
  selected?: boolean;
}

export interface GalleryProps {
  items: GalleryItem[];
  onSelect?: (item: GalleryItem) => void;
  onLoadMore?: () => void;
  columns?: 2 | 3 | 4;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

// ── Additional Tuner Patterns ──

export interface AttachmentItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  previewUrl?: string;
  status?: "uploading" | "complete" | "error";
  progress?: number;
}

export interface AttachmentsProps {
  attachments: AttachmentItem[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  showPreview?: boolean;
  variant?: "compact" | "full";
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "select";
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface FiltersProps {
  groups: FilterGroup[];
  values: Record<string, unknown>;
  onChange: (groupId: string, value: unknown) => void;
  onClear?: () => void;
  layout?: "vertical" | "horizontal" | "popover";
  title?: string;
}

export interface ConnectorSource {
  id: string;
  name: string;
  type?: "file" | "url" | "database" | "api" | "knowledge-base";
  status: "connected" | "syncing" | "error" | "disconnected";
  description?: string;
  lastSyncedAt?: Date;
}

export interface ConnectorsProps {
  sources: ConnectorSource[];
  onConnect: (sourceId: string) => void;
  onDisconnect: (sourceId: string) => void;
  onSync?: (sourceId: string) => void;
  title?: string;
  variant?: "list" | "cards";
}

// ── Additional Governor Patterns ──

export interface ActionPlanStep {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed" | "failed" | "skipped";
  substeps?: ActionPlanStep[];
  estimatedDuration?: string;
  tool?: string;
}

export interface ActionPlanProps {
  steps: ActionPlanStep[];
  title?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onStepClick?: (stepId: string) => void;
  editable?: boolean;
  showEstimates?: boolean;
}

// ── Additional Prompt Action Patterns ──

export interface AutoFillSuggestion {
  id: string;
  text: string;
  matchScore?: number;
  source?: string;
}

export interface AutoFillProps {
  suggestions: AutoFillSuggestion[];
  onSelect: (suggestion: AutoFillSuggestion) => void;
  onQueryChange?: (query: string) => void;
  query?: string;
  isLoading?: boolean;
  placeholder?: string;
  maxSuggestions?: number;
  highlightMatch?: boolean;
}

export interface SummaryProps {
  content: string;
  originalLength?: number;
  summaryLength?: number;
  onRegenerate?: () => void;
  onCopy?: () => void;
  onExpand?: () => void;
  isGenerating?: boolean;
  title?: string;
  variant?: "card" | "inline" | "collapsible";
}

// ── Batch 2 Wayfinder Patterns ──

export interface InitialCtaAction {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface InitialCtaProps {
  title: string;
  subtitle?: string;
  actions: InitialCtaAction[];
  onAction: (action: InitialCtaAction) => void;
  variant?: "centered" | "cards" | "minimal";
}

export interface NudgeItem {
  id: string;
  message: string;
  type?: "tip" | "reminder" | "suggestion";
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface NudgesProps {
  nudges: NudgeItem[];
  onDismiss?: (id: string) => void;
  variant?: "toast" | "inline" | "banner";
  position?: "top" | "bottom";
  maxVisible?: number;
}

export interface PromptDetail {
  id: string;
  label: string;
  value: string;
  type?: "text" | "badge" | "link";
  url?: string;
}

export interface PromptDetailsProps {
  prompt: string;
  details: PromptDetail[];
  timestamp?: Date;
  model?: string;
  tokenCount?: number;
  variant?: "card" | "inline" | "popover";
}

export interface RandomizeProps {
  onRandomize: () => void;
  isRandomizing?: boolean;
  currentSeed?: string;
  onSeedChange?: (seed: string) => void;
  showSeed?: boolean;
  label?: string;
  variant?: "button" | "icon" | "fab";
}

// ── Batch 2 Prompt Action Patterns ──

export interface ExpandProps {
  content: string;
  onExpand: () => void;
  expandedContent?: string;
  isExpanding?: boolean;
  title?: string;
  variant?: "button" | "inline" | "accordion";
}

export interface TransformOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface TransformProps {
  content: string;
  options: TransformOption[];
  onTransform: (optionId: string) => void;
  transformedContent?: string;
  isTransforming?: boolean;
  title?: string;
  variant?: "buttons" | "dropdown" | "toolbar";
}

export interface InlineActionItem {
  id: string;
  label: string;
  icon?: string;
  type?: "primary" | "secondary" | "danger";
}

export interface InlineActionProps {
  actions: InlineActionItem[];
  onAction: (actionId: string) => void;
  content?: string;
  variant?: "toolbar" | "contextual" | "floating";
  size?: "small" | "medium";
}

export interface ChainedActionStep {
  id: string;
  label: string;
  description?: string;
  status?: "idle" | "active" | "completed" | "error";
  result?: string;
}

export interface ChainedActionProps {
  steps: ChainedActionStep[];
  onExecute: () => void;
  onStepClick?: (stepId: string) => void;
  isExecuting?: boolean;
  title?: string;
  variant?: "linear" | "branching";
}

// ── Batch 2 Trust Builder Patterns ──

export interface DataOwnershipItem {
  id: string;
  dataType: string;
  description?: string;
  retention?: string;
  deletable?: boolean;
}

export interface DataOwnershipProps {
  items: DataOwnershipItem[];
  onDelete?: (id: string) => void;
  onExport?: () => void;
  onDeleteAll?: () => void;
  title?: string;
  variant?: "list" | "card" | "table";
}

export interface FootprintEntry {
  id: string;
  action: string;
  timestamp: Date;
  model?: string;
  inputPreview?: string;
  outputPreview?: string;
  metadata?: Record<string, unknown>;
}

export interface FootprintsProps {
  entries: FootprintEntry[];
  onEntryClick?: (id: string) => void;
  onClear?: () => void;
  title?: string;
  maxVisible?: number;
  showTimestamps?: boolean;
  variant?: "timeline" | "list" | "compact";
}

// ── Batch 3 Prompt Action Patterns ──

export interface DescribeDetail {
  id: string;
  label: string;
  value: string;
  type?: "text" | "badge" | "code" | "json";
}

export interface DescribeProps {
  output: string;
  details: DescribeDetail[];
  inferredPrompt?: string;
  model?: string;
  seed?: string;
  parameters?: Record<string, unknown>;
  onReuse?: (prompt: string) => void;
  onCopy?: () => void;
  title?: string;
  variant?: "panel" | "popover" | "inline";
}

export interface InpaintingRegion {
  id: string;
  label?: string;
  selected?: boolean;
}

export interface InpaintingProps {
  content: string;
  regions: InpaintingRegion[];
  onRegionSelect: (regionId: string) => void;
  onApply: (regionId: string, prompt: string) => void;
  selectedRegionId?: string;
  isProcessing?: boolean;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
  title?: string;
  variant?: "brush" | "segment" | "inline";
}

export interface MadlibsVariable {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select" | "number" | "textarea";
  options?: { label: string; value: string }[];
  required?: boolean;
  defaultValue?: string;
}

export interface MadlibsProps {
  template: string;
  variables: MadlibsVariable[];
  values?: Record<string, string>;
  onChange: (variableId: string, value: string) => void;
  onSubmit: (values: Record<string, string>) => void;
  title?: string;
  description?: string;
  isGenerating?: boolean;
  showPreview?: boolean;
  variant?: "form" | "inline" | "wizard";
}

export interface RestructureOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface RestructureProps {
  content: string;
  options: RestructureOption[];
  onRestructure: (optionId: string) => void;
  restructuredContent?: string;
  isProcessing?: boolean;
  showDiff?: boolean;
  title?: string;
  variant?: "buttons" | "slider" | "presets";
}

export interface RestyleOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  preview?: string;
}

export interface RestyleProps {
  content: string;
  options: RestyleOption[];
  onRestyle: (optionId: string) => void;
  restyledContent?: string;
  isProcessing?: boolean;
  intensity?: number;
  onIntensityChange?: (value: number) => void;
  title?: string;
  variant?: "presets" | "gallery" | "slider";
}

export interface SynthesisSource {
  id: string;
  title: string;
  content: string;
  url?: string;
  relevance?: number;
}

export interface SynthesisInsight {
  id: string;
  text: string;
  confidence?: number;
  sourceIds: string[];
  type?: "fact" | "inference" | "theme";
}

export interface SynthesisProps {
  sources: SynthesisSource[];
  insights: SynthesisInsight[];
  onSourceClick?: (sourceId: string) => void;
  onRegenerate?: () => void;
  isProcessing?: boolean;
  title?: string;
  showSources?: boolean;
  showConfidence?: boolean;
  variant?: "aggregated" | "comparative" | "thematic";
}
