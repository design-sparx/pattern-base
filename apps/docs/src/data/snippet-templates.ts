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

  "follow-up": (fw) => `import { FollowUp } from '@ai-ui/${fw}';

const followUps = [
  { id: '1', text: 'Tell me more about this topic', icon: '\u27A1\uFE0F' },
  { id: '2', text: 'Can you give an example?', icon: '\uD83D\uDCA1' },
  { id: '3', text: 'How does this compare to alternatives?', icon: '\u2696\uFE0F' },
];

<FollowUp
  followUps={followUps}
  onSelect={(f) => console.log('Selected:', f.text)}
  variant="chip"
  title="Suggested follow-ups"
/>`,

  templates: (fw) => `import { Templates } from '@ai-ui/${fw}';

const templates = [
  { id: '1', name: 'Blog Post', description: 'Generate a structured blog post', icon: '\uD83D\uDCDD', category: 'Writing', template: 'Write a blog post about {{topic}}' },
  { id: '2', name: 'Code Review', description: 'Review code for best practices', icon: '\uD83D\uDD0D', category: 'Development', template: 'Review this code for best practices' },
  { id: '3', name: 'Email Draft', description: 'Draft a professional email', icon: '\uD83D\uDCE7', category: 'Writing', template: 'Draft an email about {{subject}}' },
];

<Templates
  templates={templates}
  onSelect={(t) => console.log('Selected template:', t.name)}
  layout="grid"
  columns={2}
  searchable
/>`,

  gallery: (fw) => `import { Gallery } from '@ai-ui/${fw}';

const items = [
  { id: '1', type: 'card', title: 'Abstract Design', content: 'A modern geometric pattern' },
  { id: '2', type: 'card', title: 'Nature Scene', content: 'Serene mountain landscape' },
  { id: '3', type: 'card', title: 'Urban Sketch', content: 'City skyline drawing' },
];

<Gallery
  items={items}
  onSelect={(item) => console.log('Selected:', item.title)}
  columns={3}
  selectable
/>`,

  attachments: (fw) => `import { Attachments } from '@ai-ui/${fw}';

const [files, setFiles] = useState([
  { id: '1', name: 'report.pdf', type: 'application/pdf', size: 245000, status: 'complete' },
]);

<Attachments
  attachments={files}
  onAdd={(newFiles) => console.log('Added:', newFiles)}
  onRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
  maxFiles={5}
  acceptedTypes={['application/pdf', 'text/csv', 'image/*']}
/>`,

  filters: (fw) => `import { Filters } from '@ai-ui/${fw}';

const groups = [
  { id: 'type', label: 'Content Type', type: 'checkbox', options: [
    { id: 'text', label: 'Text', value: 'text', count: 24 },
    { id: 'image', label: 'Image', value: 'image', count: 12 },
  ]},
  { id: 'quality', label: 'Quality', type: 'radio', options: [
    { id: 'high', label: 'High', value: 'high' },
    { id: 'medium', label: 'Medium', value: 'medium' },
  ]},
];

<Filters
  groups={groups}
  values={{ type: ['text'], quality: 'high' }}
  onChange={(groupId, value) => console.log(groupId, value)}
  onClear={() => console.log('Cleared')}
  title="Filter Results"
/>`,

  "action-plan": (fw) => `import { ActionPlan } from '@ai-ui/${fw}';

const steps = [
  { id: '1', title: 'Analyze input data', status: 'completed', description: 'Parse and validate the dataset', tool: 'DataParser' },
  { id: '2', title: 'Generate initial draft', status: 'in-progress', description: 'Create first version' },
  { id: '3', title: 'Apply formatting rules', status: 'pending', description: 'Format output' },
  { id: '4', title: 'Run quality checks', status: 'pending', description: 'Verify accuracy' },
];

<ActionPlan
  steps={steps}
  title="Execution Plan"
  onApprove={() => console.log('Approved')}
  onReject={() => console.log('Rejected')}
  showEstimates
/>`,

  caveat: (fw) => `import { Caveat } from '@ai-ui/${fw}';

{/* Banner variant */}
<Caveat
  message="AI-generated content may contain inaccuracies. Please verify important information."
  variant="banner"
  severity="warning"
  title="AI Disclaimer"
  dismissible
/>

{/* Inline variant */}
<p>This response was generated by AI. <Caveat message="Results may vary." variant="inline" severity="info" /></p>`,

  consent: (fw) => `import { Consent } from '@ai-ui/${fw}';

const items = [
  { id: '1', label: 'Process my data with AI', description: 'Allow AI models to analyze your input', required: true },
  { id: '2', label: 'Store conversation history', description: 'Save conversations for future reference', defaultChecked: true },
  { id: '3', label: 'Share anonymized usage data', description: 'Help improve the AI' },
];

<Consent
  items={items}
  onAccept={(ids) => console.log('Accepted:', ids)}
  onDecline={() => console.log('Declined')}
  title="Data Processing Consent"
  description="Please review and accept the following."
/>`,

  "auto-fill": (fw) => `import { AutoFill } from '@ai-ui/${fw}';

const suggestions = [
  { id: '1', text: 'How do I implement authentication?', source: 'Recent searches' },
  { id: '2', text: 'How do I implement pagination?', source: 'Popular queries' },
  { id: '3', text: 'How do I implement dark mode?', source: 'Trending' },
];

<AutoFill
  suggestions={suggestions}
  onSelect={(s) => console.log('Selected:', s.text)}
  onQueryChange={(q) => console.log('Query:', q)}
  placeholder="How do I implement..."
  maxSuggestions={5}
/>`,

  summary: (fw) => `import { Summary } from '@ai-ui/${fw}';

<Summary
  content="The research paper presents a novel approach to transformer architectures..."
  title="Research Summary"
  originalLength={2450}
  summaryLength={420}
  onRegenerate={() => console.log('Regenerating...')}
  onCopy={() => navigator.clipboard.writeText(content)}
  variant="card"
/>`,

  "initial-cta": (fw) => `import { InitialCta } from '@ai-ui/${fw}';

const actions = [
  { id: '1', label: 'Write something', description: 'Generate text or documents', icon: '\u270D\uFE0F' },
  { id: '2', label: 'Analyze data', description: 'Get insights from datasets', icon: '\uD83D\uDCCA' },
  { id: '3', label: 'Generate code', description: 'Create or debug code', icon: '\uD83D\uDCBB' },
];

<InitialCta
  title="Welcome to AI Assistant"
  subtitle="What would you like to do today?"
  actions={actions}
  onAction={(a) => console.log('Selected:', a.label)}
  variant="cards"
/>`,

  nudges: (fw) => `import { Nudges } from '@ai-ui/${fw}';

const nudges = [
  { id: '1', message: 'Try using more specific prompts for better results', type: 'tip', icon: '\uD83D\uDCA1', actionLabel: 'Show examples' },
  { id: '2', message: 'You have unused credits expiring soon', type: 'reminder', icon: '\u23F0' },
];

<Nudges
  nudges={nudges}
  onDismiss={(id) => console.log('Dismissed:', id)}
  variant="inline"
/>`,

  "prompt-details": (fw) => `import { PromptDetails } from '@ai-ui/${fw}';

const details = [
  { id: '1', label: 'Language', value: 'English', type: 'badge' },
  { id: '2', label: 'Context', value: 'Technical documentation', type: 'text' },
];

<PromptDetails
  prompt="Explain the difference between RSC and Client Components"
  details={details}
  timestamp={new Date()}
  model="GPT-4 Turbo"
  tokenCount={48}
  variant="card"
/>`,

  randomize: (fw) => `import { Randomize } from '@ai-ui/${fw}';

<Randomize
  onRandomize={() => console.log('Randomizing...')}
  showSeed
  currentSeed="42"
  onSeedChange={(seed) => console.log('Seed:', seed)}
/>`,

  expand: (fw) => `import { Expand } from '@ai-ui/${fw}';

<Expand
  content="React Server Components allow you to render components on the server..."
  onExpand={() => fetchExpandedContent()}
  expandedContent={expandedText}
  title="Server Components Overview"
  variant="accordion"
/>`,

  transform: (fw) => `import { Transform } from '@ai-ui/${fw}';

const options = [
  { id: 'formal', label: 'Make formal', icon: '\uD83C\uDF93' },
  { id: 'casual', label: 'Make casual', icon: '\uD83D\uDE0A' },
  { id: 'shorter', label: 'Make shorter', icon: '\u2702\uFE0F' },
];

<Transform
  content="React is a JavaScript library for building UIs..."
  options={options}
  onTransform={(id) => console.log('Transform:', id)}
  title="Content Transform"
  variant="buttons"
/>`,

  "inline-action": (fw) => `import { InlineAction } from '@ai-ui/${fw}';

const actions = [
  { id: 'copy', label: 'Copy', icon: '\uD83D\uDCCB', type: 'secondary' },
  { id: 'edit', label: 'Edit', icon: '\u270F\uFE0F', type: 'primary' },
  { id: 'delete', label: 'Delete', icon: '\uD83D\uDDD1\uFE0F', type: 'danger' },
];

<InlineAction
  actions={actions}
  onAction={(id) => console.log('Action:', id)}
  variant="toolbar"
/>`,

  "chained-action": (fw) => `import { ChainedAction } from '@ai-ui/${fw}';

const steps = [
  { id: '1', label: 'Fetch latest data', status: 'completed', result: 'Retrieved 142 records' },
  { id: '2', label: 'Analyze patterns', status: 'active' },
  { id: '3', label: 'Generate report', status: 'idle' },
];

<ChainedAction
  steps={steps}
  onExecute={() => console.log('Executing...')}
  title="Data Pipeline"
/>`,

  "data-ownership": (fw) => `import { DataOwnership } from '@ai-ui/${fw}';

const items = [
  { id: '1', dataType: 'Conversation History', description: 'All chat messages', retention: '90 days', deletable: true },
  { id: '2', dataType: 'Uploaded Files', description: 'Documents you shared', retention: '30 days', deletable: true },
  { id: '3', dataType: 'Usage Analytics', description: 'Anonymous patterns', retention: '1 year', deletable: false },
];

<DataOwnership
  items={items}
  onDelete={(id) => console.log('Delete:', id)}
  onExport={() => console.log('Exporting...')}
  title="Your Data"
/>`,

  footprints: (fw) => `import { Footprints } from '@ai-ui/${fw}';

const entries = [
  { id: '1', action: 'Generated blog post', timestamp: new Date(), model: 'GPT-4', inputPreview: 'Write a blog post...' },
  { id: '2', action: 'Code review', timestamp: new Date(), model: 'Claude 3', inputPreview: 'Review this component...' },
];

<Footprints
  entries={entries}
  onEntryClick={(id) => console.log('Clicked:', id)}
  onClear={() => console.log('Cleared')}
  title="Activity History"
  showTimestamps
/>`,

  describe: (fw) => `import { Describe } from '@ai-ui/${fw}';

const details = [
  { id: '1', label: 'Model', value: 'Midjourney v6', type: 'badge' },
  { id: '2', label: 'Aspect Ratio', value: '16:9', type: 'text' },
  { id: '3', label: 'Quality', value: 'High', type: 'text' },
];

<Describe
  output="A vibrant digital illustration of a futuristic cityscape..."
  details={details}
  inferredPrompt="futuristic cityscape, sunset, flying vehicles --ar 16:9"
  model="Midjourney v6"
  seed="12345"
  onReuse={(prompt) => console.log('Reuse:', prompt)}
  onCopy={() => navigator.clipboard.writeText(output)}
/>`,

  inpainting: (fw) => `import { Inpainting } from '@ai-ui/${fw}';

const regions = [
  { id: 'intro', label: 'Introduction' },
  { id: 'body', label: 'Main Body' },
  { id: 'conclusion', label: 'Conclusion' },
];

<Inpainting
  content="The quarterly report shows strong growth across all divisions..."
  regions={regions}
  onRegionSelect={(id) => setSelectedRegion(id)}
  onApply={(regionId, prompt) => console.log('Apply:', regionId, prompt)}
  selectedRegionId={selectedRegion}
  onPromptChange={(p) => setPrompt(p)}
  title="Edit Content Region"
/>`,

  madlibs: (fw) => `import { Madlibs } from '@ai-ui/${fw}';

const variables = [
  { id: 'topic', label: 'Topic', placeholder: 'e.g. AI trends', required: true },
  { id: 'audience', label: 'Audience', placeholder: 'e.g. developers' },
  { id: 'tone', label: 'Tone', type: 'select', options: [
    { label: 'Professional', value: 'professional' },
    { label: 'Conversational', value: 'conversational' },
  ]},
];

<Madlibs
  template="Write a {{tone}} blog post about {{topic}} for {{audience}}."
  variables={variables}
  values={values}
  onChange={(id, val) => setValues(prev => ({ ...prev, [id]: val }))}
  onSubmit={(vals) => console.log('Generate:', vals)}
  title="Blog Post Generator"
  showPreview
/>`,

  restructure: (fw) => `import { Restructure } from '@ai-ui/${fw}';

const options = [
  { id: 'condense', label: 'Make Shorter', icon: '\uD83D\uDCDD' },
  { id: 'expand', label: 'Elaborate', icon: '\uD83D\uDCD6' },
  { id: 'bullets', label: 'To Bullet Points', icon: '\uD83D\uDCCB' },
  { id: 'reorder', label: 'Reorder by Priority', icon: '\uD83D\uDD04' },
];

<Restructure
  content="Machine learning has transformed how businesses operate..."
  options={options}
  onRestructure={(id) => console.log('Restructure:', id)}
  title="Restructure Content"
  showDiff
/>`,

  restyle: (fw) => `import { Restyle } from '@ai-ui/${fw}';

const options = [
  { id: 'formal', label: 'Formal', icon: '\uD83C\uDF93', description: 'Professional business tone' },
  { id: 'casual', label: 'Casual', icon: '\uD83D\uDE0A', description: 'Friendly conversational style' },
  { id: 'technical', label: 'Technical', icon: '\u2699\uFE0F', description: 'Precise technical language' },
];

<Restyle
  content="Our new product helps teams work better together..."
  options={options}
  onRestyle={(id) => console.log('Restyle:', id)}
  title="Restyle Content"
  variant="presets"
/>`,

  synthesis: (fw) => `import { Synthesis } from '@ai-ui/${fw}';

const sources = [
  { id: 's1', title: 'McKinsey AI Report', content: 'AI adoption reached 72%...', relevance: 0.95 },
  { id: 's2', title: 'Gartner Trends', content: '65% of orgs experimenting...', relevance: 0.88 },
];

const insights = [
  { id: 'i1', text: 'Enterprise AI adoption has accelerated significantly...', confidence: 0.92, sourceIds: ['s1', 's2'], type: 'fact' },
  { id: 'i2', text: 'Healthcare and finance lead investment growth...', confidence: 0.78, sourceIds: ['s2'], type: 'theme' },
];

<Synthesis
  sources={sources}
  insights={insights}
  onSourceClick={(id) => console.log('Source:', id)}
  onRegenerate={() => console.log('Regenerating...')}
  title="AI Industry Analysis"
  showSources
  showConfidence
/>`,
};

export const codeSnippets: Record<string, { bootstrap: string; antd: string }> =
  Object.fromEntries(
    Object.entries(snippetTemplates).map(([id, tmpl]) => [
      id,
      { bootstrap: tmpl("bootstrap"), antd: tmpl("antd") },
    ]),
  );
