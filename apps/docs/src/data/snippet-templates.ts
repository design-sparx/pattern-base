/**
 * Code snippet templates that generate framework-specific code strings.
 * Replaces the duplicated code-snippets.ts file.
 */

type Framework = "bootstrap" | "antd";
type SnippetTemplate = (fw: Framework) => string;

const snippetTemplates: Record<string, SnippetTemplate> = {
  "open-input": (fw) => `import { OpenInput } from '@ai-ui/${fw}';

function MyChat() {
  const handleSubmit = (prompt: string) => {
    console.log('User prompt:', prompt);
  };

  return (
    <OpenInput
      placeholder="Ask me anything..."
      onSubmit={handleSubmit}
      isLoading={false}
      suggestions={['Write a poem', 'Summarize this', 'Translate to French']}
    />
  );
}`,

  suggestions: (fw) => `import { Suggestions } from '@ai-ui/${fw}';

const starters = [
  { id: '1', title: 'Write a story', prompt: 'Write a short story about...', icon: '\u270D\uFE0F' },
  { id: '2', title: 'Analyze data', prompt: 'Analyze the following data...', icon: '\uD83D\uDCCA' },
  { id: '3', title: 'Debug code', prompt: 'Help me debug this code...', icon: '\uD83D\uDC1B' },
  { id: '4', title: 'Brainstorm', prompt: 'Help me brainstorm ideas for...', icon: '\uD83D\uDCA1' },
];

<Suggestions
  suggestions={starters}
  onSelect={(s) => console.log('Selected:', s.prompt)}
  variant="card"
  columns={2}
/>`,

  "parameter-control": (fw) => `import { ParameterControl } from '@ai-ui/${fw}';

const [params, setParams] = useState({
  temperature: 0.7,
  maxTokens: 1024,
  streaming: true,
  style: 'balanced',
});

<ParameterControl
  title="Generation Settings"
  parameters={[
    { id: 'temp', label: 'Temperature', type: 'slider', value: params.temperature, min: 0, max: 2, step: 0.1 },
    { id: 'tokens', label: 'Max Tokens', type: 'slider', value: params.maxTokens, min: 1, max: 4096, step: 1 },
    { id: 'stream', label: 'Streaming', type: 'toggle', value: params.streaming },
    { id: 'style', label: 'Style', type: 'select', value: params.style, options: [
      { label: 'Creative', value: 'creative' },
      { label: 'Balanced', value: 'balanced' },
      { label: 'Precise', value: 'precise' },
    ]},
  ]}
  onChange={(id, value) => setParams(prev => ({ ...prev, [id]: value }))}
/>`,

  "stream-of-thought": (fw) => `import { StreamOfThought } from '@ai-ui/${fw}';

const steps = [
  { id: '1', type: 'thinking', content: 'Analyzing the user query...', timestamp: new Date() },
  { id: '2', type: 'tool_call', content: 'Searching knowledge base for relevant information...', timestamp: new Date() },
  { id: '3', type: 'action', content: 'Synthesizing information from 3 sources...', timestamp: new Date() },
  { id: '4', type: 'result', content: 'Generated comprehensive response with citations.', timestamp: new Date() },
];

<StreamOfThought steps={steps} isStreaming={false} collapsible />`,

  citation: (fw) => `import { CitationsList } from '@ai-ui/${fw}';

const citations = [
  { id: '1', source: 'React Documentation', url: 'https://react.dev', snippet: 'React lets you build user interfaces out of individual pieces called components.', relevance: 0.95 },
  { id: '2', source: 'MDN Web Docs', url: 'https://developer.mozilla.org', snippet: 'JavaScript is a lightweight, interpreted programming language.', relevance: 0.72 },
  { id: '3', source: 'TypeScript Handbook', url: 'https://typescriptlang.org', snippet: 'TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor.', relevance: 0.61 },
];

<CitationsList citations={citations} title="Sources" maxVisible={3} />`,

  regenerate: (fw) => `import { Regenerate } from '@ai-ui/${fw}';

<Regenerate
  onRegenerate={() => console.log('Regenerating...')}
  isRegenerating={false}
  variant="dropdown"
  options={[
    { label: 'More creative', onSelect: () => {} },
    { label: 'More concise', onSelect: () => {} },
    { label: 'Different tone', onSelect: () => {} },
  ]}
/>`,

  disclosure: (fw) => `import { Disclosure } from '@ai-ui/${fw}';

{/* Badge variant */}
<Disclosure variant="badge" type="ai-generated" model="GPT-4" />

{/* Banner variant */}
<Disclosure variant="banner" type="ai-assisted" model="Claude" timestamp={new Date()} />

{/* Inline variant */}
<p>This content was <Disclosure variant="inline" type="ai-suggested" /></p>`,

  variations: (fw) => `import { Variations } from '@ai-ui/${fw}';

const variations = [
  { id: '1', label: 'Formal', content: 'Dear Sir/Madam, I am writing to express my interest in the position...' },
  { id: '2', label: 'Casual', content: 'Hey! I saw your job posting and I think I would be a great fit...' },
  { id: '3', label: 'Creative', content: 'Imagine a candidate who brings both passion and expertise...' },
];

<Variations
  variations={variations}
  selectedId="1"
  onSelect={(id) => console.log('Selected:', id)}
  layout="grid"
  columns={3}
/>`,

  "cost-estimate": (fw) => `import { CostEstimate } from '@ai-ui/${fw}';

<CostEstimate
  breakdown={{
    inputTokens: 1250,
    outputTokens: 830,
    totalTokens: 2080,
    inputCost: 0.00375,
    outputCost: 0.00498,
    totalCost: 0.00873,
    model: 'GPT-4 Turbo',
  }}
  currency="USD"
  showTokens
/>`,

  "model-management": (fw) => `import { ModelManagement } from '@ai-ui/${fw}';

const models = [
  { id: 'gpt4', name: 'GPT-4 Turbo', provider: 'OpenAI', contextWindow: 128000, costPer1kInput: 0.01, capabilities: ['chat', 'code', 'vision'] },
  { id: 'gpt35', name: 'GPT-3.5 Turbo', provider: 'OpenAI', contextWindow: 16000, costPer1kInput: 0.0005, capabilities: ['chat', 'code'] },
  { id: 'claude3', name: 'Claude 3 Opus', provider: 'Anthropic', contextWindow: 200000, costPer1kInput: 0.015, capabilities: ['chat', 'code', 'vision'] },
  { id: 'claude-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', contextWindow: 200000, costPer1kInput: 0.00025, capabilities: ['chat', 'code'] },
];

<ModelManagement
  models={models}
  selectedModelId="gpt4"
  onSelectModel={(id) => console.log('Selected model:', id)}
  showDetails
  groupByProvider
/>`,
};

export const codeSnippets: Record<string, { bootstrap: string; antd: string }> =
  Object.fromEntries(
    Object.entries(snippetTemplates).map(([id, tmpl]) => [
      id,
      { bootstrap: tmpl("bootstrap"), antd: tmpl("antd") },
    ]),
  );
