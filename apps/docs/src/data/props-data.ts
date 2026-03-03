export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export const propsData: Record<string, PropDefinition[]> = {
  "open-input": [
    {
      name: "placeholder",
      type: "string",
      default: "undefined",
      description: "Placeholder text for the input field",
    },
    {
      name: "onSubmit",
      type: "(prompt: string) => void",
      description: "Callback fired when the user submits a prompt",
    },
    {
      name: "isLoading",
      type: "boolean",
      default: "false",
      description: "Whether the input is in a loading/disabled state",
    },
    {
      name: "suggestions",
      type: "string[]",
      default: "undefined",
      description: "Optional autocomplete suggestion strings",
    },
    {
      name: "multiModal",
      type: "boolean",
      default: "false",
      description: "Enable file/image attachment support",
    },
    {
      name: "acceptedFileTypes",
      type: "string[]",
      default: "undefined",
      description: "MIME types accepted for file uploads (requires multiModal)",
    },
    {
      name: "maxLength",
      type: "number",
      default: "undefined",
      description: "Maximum character length for the prompt input",
    },
  ],

  suggestions: [
    {
      name: "suggestions",
      type: "StarterPrompt[]",
      description:
        "Array of starter prompts with id, title, description, prompt, category, and icon",
    },
    {
      name: "onSelect",
      type: "(prompt: StarterPrompt) => void",
      description: "Callback fired when a suggestion is selected",
    },
    {
      name: "columns",
      type: "2 | 3 | 4",
      default: "2",
      description: "Number of columns in the suggestion grid",
    },
    {
      name: "variant",
      type: '"chip" | "card"',
      default: '"chip"',
      description: "Visual style — chip for compact, card for detailed",
    },
  ],

  "parameter-control": [
    {
      name: "parameters",
      type: "ParameterControlItem[]",
      description:
        "Array of parameter definitions with id, label, type (slider | toggle | select | matrix), value, min, max, step, options, description",
    },
    {
      name: "onChange",
      type: "(id: string, value: unknown) => void",
      description:
        "Callback fired when a parameter value changes, with the parameter id and new value",
    },
    {
      name: "title",
      type: "string",
      default: "undefined",
      description: "Optional heading above the parameter controls",
    },
    {
      name: "layout",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Layout direction for the controls",
    },
  ],

  "preset-styles": [
    {
      name: "presets",
      type: "PresetStyle[]",
      description:
        "Array of presets with id, label, optional description/icon, and values object",
    },
    {
      name: "selectedPresetId",
      type: "string",
      default: "undefined",
      description: "ID of the currently active preset",
    },
    {
      name: "onApplyPreset",
      type: "(presetId: string, values: Record<string, unknown>) => void",
      description:
        "Callback fired when a preset is selected, including its id and values",
    },
    {
      name: "title",
      type: "string",
      default: '"Preset Styles"',
      description: "Optional heading for the preset control",
    },
    {
      name: "variant",
      type: '"buttons" | "cards"',
      default: '"buttons"',
      description: "Display style for showing preset options",
    },
  ],

  "prompt-enhancer": [
    {
      name: "prompt",
      type: "string",
      description: "Original user prompt before enhancement",
    },
    {
      name: "enhancedPrompt",
      type: "string",
      default: "undefined",
      description: "Enhanced prompt text generated or edited by the user",
    },
    {
      name: "onEnhance",
      type: "(prompt: string) => void",
      description: "Callback fired when enhancement is requested",
    },
    {
      name: "onApply",
      type: "(enhancedPrompt: string) => void",
      default: "undefined",
      description: "Optional callback to apply the enhanced prompt",
    },
    {
      name: "onEnhancedPromptChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Optional callback for editing enhanced prompt text",
    },
    {
      name: "isEnhancing",
      type: "boolean",
      default: "false",
      description: "Whether enhancement is currently in progress",
    },
    {
      name: "title",
      type: "string",
      default: '"Prompt Enhancer"',
      description: "Optional heading for the enhancer panel",
    },
    {
      name: "variant",
      type: '"split" | "inline"',
      default: '"split"',
      description: "Layout mode for comparing and editing prompt versions",
    },
    {
      name: "showDiff",
      type: "boolean",
      default: "true",
      description:
        "Whether to show a lightweight change summary between versions",
    },
  ],

  "saved-styles": [
    {
      name: "styles",
      type: "SavedStyleItem[]",
      description:
        "Array of saved style items with id, name, optional description, values map, and optional isDefault flag",
    },
    {
      name: "selectedStyleId",
      type: "string",
      default: "undefined",
      description: "ID of the currently selected saved style",
    },
    {
      name: "onSelectStyle",
      type: "(styleId: string) => void",
      description: "Callback fired when a saved style is selected",
    },
    {
      name: "onSaveStyle",
      type: "(name: string) => void",
      description: "Callback fired to save current settings under a style name",
    },
    {
      name: "onDeleteStyle",
      type: "(styleId: string) => void",
      default: "undefined",
      description: "Optional callback fired when deleting a saved style",
    },
    {
      name: "title",
      type: "string",
      default: '"Saved Styles"',
      description: "Optional heading for the saved styles panel",
    },
    {
      name: "variant",
      type: '"list" | "cards"',
      default: '"list"',
      description: "Display style for listing saved styles",
    },
    {
      name: "maxVisible",
      type: "number",
      default: "undefined",
      description: "Optional cap on number of style entries shown",
    },
  ],

  "voice-and-tone": [
    {
      name: "axes",
      type: "VoiceToneAxis[]",
      description:
        "Array of tone axes with id, label, left/right labels, value, and optional min/max/step",
    },
    {
      name: "onChange",
      type: "(axisId: string, value: number) => void",
      description: "Callback fired when an axis value changes",
    },
    {
      name: "title",
      type: "string",
      default: '"Voice and Tone"',
      description: "Optional heading for the voice/tone control panel",
    },
    {
      name: "showValues",
      type: "boolean",
      default: "true",
      description: "Whether to display current numeric values for each axis",
    },
    {
      name: "variant",
      type: '"sliders" | "compact"',
      default: '"sliders"',
      description: "Display density of the axis controls",
    },
  ],

  branches: [
    {
      name: "branches",
      type: "BranchItem[]",
      description:
        "Array of branch nodes with id, optional parentId, label, optional preview, optional depth, and optional createdAt",
    },
    {
      name: "activeBranchId",
      type: "string",
      default: "undefined",
      description: "ID of the currently active branch",
    },
    {
      name: "onSelectBranch",
      type: "(branchId: string) => void",
      description: "Callback fired when a branch is selected",
    },
    {
      name: "onCreateBranch",
      type: "(fromBranchId: string) => void",
      description: "Callback fired to fork from an existing branch",
    },
    {
      name: "title",
      type: "string",
      default: '"Branches"',
      description: "Optional heading for the branch explorer",
    },
    {
      name: "variant",
      type: '"tree" | "list"',
      default: '"tree"',
      description: "Visual presentation style for branch navigation",
    },
  ],

  controls: [
    {
      name: "controls",
      type: "ControlCapability[]",
      description:
        "Array of capability controls with id, label, optional description, enabled state, optional locked state, and optional status",
    },
    {
      name: "onToggleControl",
      type: "(controlId: string, enabled: boolean) => void",
      description: "Callback fired when a capability toggle changes",
    },
    {
      name: "title",
      type: "string",
      default: '"Controls"',
      description: "Optional heading for the capability control panel",
    },
    {
      name: "variant",
      type: '"list" | "cards"',
      default: '"list"',
      description: "Display style for the controls UI",
    },
    {
      name: "showStatus",
      type: "boolean",
      default: "true",
      description: "Whether to display capability status badges/tags",
    },
  ],

  "draft-mode": [
    {
      name: "drafts",
      type: "DraftItem[]",
      description:
        "Array of draft entries with id, number, optional label, optional preview, and optional createdAt",
    },
    {
      name: "activeDraftId",
      type: "string",
      default: "undefined",
      description: "ID of the currently active draft",
    },
    {
      name: "onSelectDraft",
      type: "(draftId: string) => void",
      description: "Callback fired when a draft is selected",
    },
    {
      name: "onRevertToDraft",
      type: "(draftId: string) => void",
      description: "Callback fired to revert to a selected draft",
    },
    {
      name: "onBranchFromDraft",
      type: "(draftId: string) => void",
      default: "undefined",
      description: "Optional callback to create a new branch from a draft",
    },
    {
      name: "title",
      type: "string",
      default: '"Draft Mode"',
      description: "Optional heading for the draft history panel",
    },
    {
      name: "variant",
      type: '"list" | "timeline"',
      default: '"list"',
      description: "Visual style for presenting draft history",
    },
  ],

  memory: [
    {
      name: "memories",
      type: "MemoryEntry[]",
      description:
        "Array of memory entries with id, label, value, optional category, optional updatedAt, and optional locked",
    },
    {
      name: "onEditMemory",
      type: "(memoryId: string, value: string) => void",
      description: "Callback fired when a memory value is edited and saved",
    },
    {
      name: "onDeleteMemory",
      type: "(memoryId: string) => void",
      description: "Callback fired when a memory entry is deleted",
    },
    {
      name: "title",
      type: "string",
      default: '"Memory"',
      description: "Optional heading for the memory management panel",
    },
    {
      name: "variant",
      type: '"list" | "cards"',
      default: '"list"',
      description: "Display style for memory entries",
    },
    {
      name: "showTimestamps",
      type: "boolean",
      default: "true",
      description: "Whether to show last-updated timestamps on memory entries",
    },
  ],

  references: [
    {
      name: "references",
      type: "ReferenceItem[]",
      description:
        "Array of reference entries with id, title, optional type, optional location, optional excerpt, optional selected, and optional relevance",
    },
    {
      name: "onSelectReference",
      type: "(referenceId: string) => void",
      default: "undefined",
      description: "Optional callback fired when a reference is selected",
    },
    {
      name: "onRemoveReference",
      type: "(referenceId: string) => void",
      default: "undefined",
      description: "Optional callback fired when a reference is removed",
    },
    {
      name: "title",
      type: "string",
      default: '"References"',
      description: "Optional heading for the references panel",
    },
    {
      name: "variant",
      type: '"list" | "cards"',
      default: '"list"',
      description: "Display style for reference entries",
    },
    {
      name: "showRelevance",
      type: "boolean",
      default: "true",
      description: "Whether to show relevance indicators for each reference",
    },
  ],

  "sample-response": [
    {
      name: "sample",
      type: "string",
      default: "undefined",
      description: "Optional preview text generated for the sample response",
    },
    {
      name: "prompt",
      type: "string",
      default: "undefined",
      description: "Optional prompt context displayed with the sample",
    },
    {
      name: "onGenerateSample",
      type: "() => void",
      description: "Callback fired to request a new sample response",
    },
    {
      name: "onRegenerateSample",
      type: "() => void",
      default: "undefined",
      description: "Optional callback fired to regenerate the sample",
    },
    {
      name: "onAcceptSample",
      type: "() => void",
      default: "undefined",
      description: "Optional callback fired to proceed with full generation",
    },
    {
      name: "isGenerating",
      type: "boolean",
      default: "false",
      description: "Whether sample generation is currently in progress",
    },
    {
      name: "title",
      type: "string",
      default: '"Sample Response"',
      description: "Optional heading for the sample response component",
    },
    {
      name: "variant",
      type: '"card" | "inline"',
      default: '"card"',
      description: "Display style for previewing the sample response",
    },
  ],

  "shared-vision": [
    {
      name: "participants",
      type: "SharedVisionParticipant[]",
      description:
        "Array of collaboration participants with id, name, optional role, and optional active state",
    },
    {
      name: "goals",
      type: "SharedVisionGoal[]",
      description:
        "Array of shared goals with id, text, optional priority, and optional ownerId",
    },
    {
      name: "context",
      type: "SharedVisionContextItem[]",
      description:
        "Array of context items with id, label, value, and optional type (constraint, assumption, input)",
    },
    {
      name: "onAddGoal",
      type: "(goal: string) => void",
      default: "undefined",
      description: "Optional callback fired when adding a new shared goal",
    },
    {
      name: "onSelectParticipant",
      type: "(participantId: string) => void",
      default: "undefined",
      description: "Optional callback fired when selecting a participant",
    },
    {
      name: "title",
      type: "string",
      default: '"Shared Vision"',
      description: "Optional heading for the shared collaboration panel",
    },
    {
      name: "variant",
      type: '"board" | "compact"',
      default: '"board"',
      description: "Display style for the collaboration view",
    },
  ],

  verification: [
    {
      name: "claims",
      type: "VerificationClaim[]",
      description:
        "Array of claims with id, text, confidence, optional status, optional source, and optional url",
    },
    {
      name: "onRunVerification",
      type: "() => void",
      default: "undefined",
      description: "Optional callback to trigger a verification run",
    },
    {
      name: "onSelectClaim",
      type: "(claimId: string) => void",
      default: "undefined",
      description: "Optional callback fired when a claim row is selected",
    },
    {
      name: "title",
      type: "string",
      default: '"Verification"',
      description: "Optional heading for the verification panel",
    },
    {
      name: "showSources",
      type: "boolean",
      default: "true",
      description: "Whether to show supporting source labels/links",
    },
    {
      name: "variant",
      type: '"list" | "inline"',
      default: '"list"',
      description: "Display style for showing verification results",
    },
  ],

  "incognito-mode": [
    {
      name: "enabled",
      type: "boolean",
      description: "Whether private/incognito session mode is currently active",
    },
    {
      name: "onToggle",
      type: "(enabled: boolean) => void",
      default: "undefined",
      description: "Optional callback fired when the mode toggle is changed",
    },
    {
      name: "onEndSession",
      type: "() => void",
      default: "undefined",
      description: "Optional callback to immediately end the private session",
    },
    {
      name: "title",
      type: "string",
      default: '"Incognito Mode"',
      description: "Heading text displayed for the incognito status section",
    },
    {
      name: "description",
      type: "string",
      default: "undefined",
      description:
        "Optional summary text describing the current retention state",
    },
    {
      name: "retentionNotice",
      type: "string",
      default: "undefined",
      description: "Optional explicit note about what data is discarded",
    },
    {
      name: "variant",
      type: '"card" | "banner" | "inline"',
      default: '"card"',
      description: "Presentation style for the incognito mode UI",
    },
  ],

  "stream-of-thought": [
    {
      name: "steps",
      type: "ThoughtStep[]",
      description:
        'Array of thought steps with id, type ("thinking" | "action" | "tool_call" | "result"), content, timestamp, and optional metadata',
    },
    {
      name: "isStreaming",
      type: "boolean",
      default: "false",
      description: "Whether new steps are still being streamed in",
    },
    {
      name: "collapsible",
      type: "boolean",
      default: "false",
      description: "Allow the thought stream to be collapsed/expanded",
    },
  ],

  citation: [
    {
      name: "citations",
      type: "CitationItem[]",
      description:
        "Array of citation items with id, source, url, snippet, and relevance score",
    },
    {
      name: "title",
      type: "string",
      default: "undefined",
      description: "Heading text above the citations list",
    },
    {
      name: "maxVisible",
      type: "number",
      default: "undefined",
      description: 'Maximum citations to show before a "show more" toggle',
    },
  ],

  regenerate: [
    {
      name: "onRegenerate",
      type: "() => void",
      description: "Callback fired when regeneration is triggered",
    },
    {
      name: "isRegenerating",
      type: "boolean",
      default: "false",
      description: "Whether regeneration is currently in progress",
    },
    {
      name: "variant",
      type: '"button" | "icon" | "dropdown"',
      default: '"button"',
      description:
        "Visual variant — button, icon-only, or dropdown with options",
    },
    {
      name: "options",
      type: "{ label: string; onSelect: () => void }[]",
      default: "undefined",
      description:
        'Dropdown menu options for regeneration variants (requires variant="dropdown")',
    },
  ],

  disclosure: [
    {
      name: "variant",
      type: '"badge" | "banner" | "inline"',
      description: "Display style of the disclosure indicator",
    },
    {
      name: "type",
      type: '"ai-generated" | "ai-assisted" | "ai-suggested"',
      description: "The nature of AI involvement in the content",
    },
    {
      name: "model",
      type: "string",
      default: "undefined",
      description: "Name of the AI model used (e.g. GPT-4, Claude)",
    },
    {
      name: "timestamp",
      type: "Date",
      default: "undefined",
      description: "When the AI-generated content was created",
    },
    {
      name: "customLabel",
      type: "string",
      default: "undefined",
      description: "Override the default disclosure label text",
    },
  ],

  variations: [
    {
      name: "variations",
      type: "VariationItem[]",
      description:
        "Array of variation items with id, content, optional label, and metadata",
    },
    {
      name: "selectedId",
      type: "string",
      default: "undefined",
      description: "ID of the currently selected variation",
    },
    {
      name: "onSelect",
      type: "(id: string) => void",
      default: "undefined",
      description: "Callback fired when a variation is selected",
    },
    {
      name: "layout",
      type: '"grid" | "list" | "tabs"',
      default: '"grid"',
      description: "Layout style for displaying variations",
    },
    {
      name: "columns",
      type: "2 | 3",
      default: "2",
      description: "Number of columns in grid layout",
    },
  ],

  "cost-estimate": [
    {
      name: "breakdown",
      type: "CostBreakdown",
      description:
        "Cost breakdown object with inputTokens, outputTokens, totalTokens, inputCost, outputCost, totalCost, and optional model",
    },
    {
      name: "currency",
      type: "string",
      default: '"USD"',
      description: "Currency code for cost display",
    },
    {
      name: "showTokens",
      type: "boolean",
      default: "false",
      description: "Whether to display token counts alongside costs",
    },
  ],

  "model-management": [
    {
      name: "models",
      type: "ModelInfo[]",
      description:
        "Array of model definitions with id, name, provider, description, contextWindow, maxTokens, costPer1kInput, costPer1kOutput, capabilities",
    },
    {
      name: "selectedModelId",
      type: "string",
      description: "ID of the currently selected model",
    },
    {
      name: "onSelectModel",
      type: "(modelId: string) => void",
      description: "Callback fired when a model is selected",
    },
    {
      name: "showDetails",
      type: "boolean",
      default: "false",
      description:
        "Whether to show expanded model details (context window, costs)",
    },
    {
      name: "groupByProvider",
      type: "boolean",
      default: "false",
      description: "Group models under their provider headings",
    },
  ],

  modes: [
    {
      name: "modes",
      type: "ModeOption[]",
      description:
        "Array of mode options with id, label, optional description/icon, and optional disabled flag",
    },
    {
      name: "selectedModeId",
      type: "string",
      description: "ID of the currently selected mode",
    },
    {
      name: "onModeChange",
      type: "(modeId: string) => void",
      description: "Callback fired when mode selection changes",
    },
    {
      name: "title",
      type: "string",
      default: '"Modes"',
      description: "Optional heading shown above mode controls",
    },
    {
      name: "variant",
      type: '"segmented" | "tabs"',
      default: '"segmented"',
      description: "Display style for mode selection",
    },
  ],

  connectors: [
    {
      name: "sources",
      type: "ConnectorSource[]",
      description:
        'Array of source entries with id, name, optional type, status ("connected" | "syncing" | "error" | "disconnected"), description, and lastSyncedAt',
    },
    {
      name: "onConnect",
      type: "(sourceId: string) => void",
      description: "Callback fired when the user connects a source",
    },
    {
      name: "onDisconnect",
      type: "(sourceId: string) => void",
      description: "Callback fired when the user disconnects a source",
    },
    {
      name: "onSync",
      type: "(sourceId: string) => void",
      default: "undefined",
      description:
        "Optional callback fired when the user manually triggers a sync",
    },
    {
      name: "title",
      type: "string",
      default: '"Connectors"',
      description: "Optional heading shown above the connectors list",
    },
    {
      name: "variant",
      type: '"list" | "cards"',
      default: '"list"',
      description: "Visual presentation style for source items",
    },
  ],
};
