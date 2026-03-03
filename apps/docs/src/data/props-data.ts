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
