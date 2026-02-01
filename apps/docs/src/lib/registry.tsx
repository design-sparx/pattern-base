'use client';

import React from 'react';

// Bootstrap components
import {
  OpenInput as BsOpenInput,
  Suggestions as BsSuggestions,
  ParameterControl as BsParameterControl,
  StreamOfThought as BsStreamOfThought,
  CitationsList as BsCitationsList,
  Regenerate as BsRegenerate,
  Disclosure as BsDisclosure,
  Variations as BsVariations,
  CostEstimate as BsCostEstimate,
  ModelManagement as BsModelManagement,
} from '@ai-ui/bootstrap';

// Antd components
import {
  OpenInput as AntOpenInput,
  Suggestions as AntSuggestions,
  ParameterControl as AntParameterControl,
  StreamOfThought as AntStreamOfThought,
  CitationsList as AntCitationsList,
  Regenerate as AntRegenerate,
  Disclosure as AntDisclosure,
  Variations as AntVariations,
  CostEstimate as AntCostEstimate,
  ModelManagement as AntModelManagement,
} from '@ai-ui/antd';

// ── Demo data ──

const demoSuggestions = [
  { id: '1', title: 'Write a story', prompt: 'Write a short story about...', icon: '\u270D\uFE0F', description: 'Generate creative fiction' },
  { id: '2', title: 'Analyze data', prompt: 'Analyze the following data...', icon: '\uD83D\uDCCA', description: 'Get insights from your data' },
  { id: '3', title: 'Debug code', prompt: 'Help me debug this code...', icon: '\uD83D\uDC1B', description: 'Find and fix code issues' },
  { id: '4', title: 'Brainstorm', prompt: 'Help me brainstorm ideas for...', icon: '\uD83D\uDCA1', description: 'Generate creative ideas' },
];

const demoParameters = [
  { id: 'temp', label: 'Temperature', type: 'slider' as const, value: 0.7, min: 0, max: 2, step: 0.1, description: 'Controls randomness of output' },
  { id: 'tokens', label: 'Max Tokens', type: 'slider' as const, value: 1024, min: 1, max: 4096, step: 1, description: 'Maximum response length' },
  { id: 'stream', label: 'Streaming', type: 'toggle' as const, value: true, description: 'Stream response tokens' },
  { id: 'style', label: 'Style', type: 'select' as const, value: 'balanced', options: [{ label: 'Creative', value: 'creative' }, { label: 'Balanced', value: 'balanced' }, { label: 'Precise', value: 'precise' }] },
];

const demoSteps = [
  { id: '1', type: 'thinking' as const, content: 'Analyzing the user query to determine the best approach for generating a comprehensive response.', timestamp: new Date() },
  { id: '2', type: 'tool_call' as const, content: 'Searching knowledge base for relevant information about React component patterns.', timestamp: new Date() },
  { id: '3', type: 'action' as const, content: 'Synthesizing information from 3 sources to create a coherent and accurate response.', timestamp: new Date() },
  { id: '4', type: 'result' as const, content: 'Generated comprehensive response with citations and code examples.', timestamp: new Date() },
];

const demoCitations = [
  { id: '1', source: 'React Documentation', url: 'https://react.dev', snippet: 'React lets you build user interfaces out of individual pieces called components.', relevance: 0.95 },
  { id: '2', source: 'MDN Web Docs', url: 'https://developer.mozilla.org', snippet: 'JavaScript is a lightweight, interpreted programming language with first-class functions.', relevance: 0.72 },
  { id: '3', source: 'TypeScript Handbook', url: 'https://typescriptlang.org', snippet: 'TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor.', relevance: 0.61 },
  { id: '4', source: 'Next.js Docs', url: 'https://nextjs.org/docs', snippet: 'Next.js is a React framework for building full-stack web applications.', relevance: 0.55 },
];

const demoVariations = [
  { id: '1', label: 'Formal', content: 'Dear Sir/Madam, I am writing to express my sincere interest in the Software Engineer position at your esteemed organization.' },
  { id: '2', label: 'Casual', content: 'Hey there! I saw your job posting and got really excited - I think I would be a great fit for your team!' },
  { id: '3', label: 'Creative', content: 'Imagine a candidate who brings not just technical expertise, but a genuine passion for crafting elegant solutions to complex problems.' },
];

const demoCostBreakdown = {
  inputTokens: 1250,
  outputTokens: 830,
  totalTokens: 2080,
  inputCost: 0.00375,
  outputCost: 0.00498,
  totalCost: 0.00873,
  model: 'GPT-4 Turbo',
};

const demoModels = [
  { id: 'gpt4', name: 'GPT-4 Turbo', provider: 'OpenAI', description: 'Most capable model', contextWindow: 128000, costPer1kInput: 0.01, capabilities: ['chat', 'code', 'vision'] },
  { id: 'gpt35', name: 'GPT-3.5 Turbo', provider: 'OpenAI', description: 'Fast and affordable', contextWindow: 16000, costPer1kInput: 0.0005, capabilities: ['chat', 'code'] },
  { id: 'claude3', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Best for complex tasks', contextWindow: 200000, costPer1kInput: 0.015, capabilities: ['chat', 'code', 'vision'] },
  { id: 'claude-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', description: 'Fastest response time', contextWindow: 200000, costPer1kInput: 0.00025, capabilities: ['chat', 'code'] },
];

// ── Registry ──

type RegistryEntry = {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
};

const noop = () => {};

export const componentRegistry: Record<string, RegistryEntry> = {
  'open-input': {
    bootstrap: () => (
      <BsOpenInput
        placeholder="Ask me anything..."
        onSubmit={noop}
        suggestions={['Write a poem', 'Summarize this article', 'Translate to French']}
      />
    ),
    antd: () => (
      <AntOpenInput
        placeholder="Ask me anything..."
        onSubmit={noop}
        suggestions={['Write a poem', 'Summarize this article', 'Translate to French']}
      />
    ),
  },

  suggestions: {
    bootstrap: () => (
      <BsSuggestions suggestions={demoSuggestions} onSelect={noop} variant="card" columns={2} />
    ),
    antd: () => (
      <AntSuggestions suggestions={demoSuggestions} onSelect={noop} variant="card" columns={2} />
    ),
  },

  'parameter-control': {
    bootstrap: () => (
      <BsParameterControl parameters={demoParameters} onChange={noop} title="Generation Settings" />
    ),
    antd: () => (
      <AntParameterControl parameters={demoParameters} onChange={noop} title="Generation Settings" />
    ),
  },

  'stream-of-thought': {
    bootstrap: () => (
      <BsStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
    antd: () => (
      <AntStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
  },

  citation: {
    bootstrap: () => (
      <BsCitationsList citations={demoCitations} title="Sources" maxVisible={3} />
    ),
    antd: () => (
      <AntCitationsList citations={demoCitations} title="Sources" maxVisible={3} />
    ),
  },

  regenerate: {
    bootstrap: () => (
      <BsRegenerate
        onRegenerate={noop}
        variant="dropdown"
        options={[
          { label: 'More creative', onSelect: noop },
          { label: 'More concise', onSelect: noop },
          { label: 'Different tone', onSelect: noop },
        ]}
      />
    ),
    antd: () => (
      <AntRegenerate
        onRegenerate={noop}
        variant="dropdown"
        options={[
          { label: 'More creative', onSelect: noop },
          { label: 'More concise', onSelect: noop },
          { label: 'Different tone', onSelect: noop },
        ]}
      />
    ),
  },

  disclosure: {
    bootstrap: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BsDisclosure variant="badge" type="ai-generated" model="GPT-4" />
        <BsDisclosure variant="banner" type="ai-assisted" model="Claude" timestamp={new Date()} />
        <p>This content was <BsDisclosure variant="inline" type="ai-suggested" /></p>
      </div>
    ),
    antd: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AntDisclosure variant="badge" type="ai-generated" model="GPT-4" />
        <AntDisclosure variant="banner" type="ai-assisted" model="Claude" timestamp={new Date()} />
        <p>This content was <AntDisclosure variant="inline" type="ai-suggested" /></p>
      </div>
    ),
  },

  variations: {
    bootstrap: () => (
      <BsVariations variations={demoVariations} selectedId="1" onSelect={noop} layout="grid" columns={3} />
    ),
    antd: () => (
      <AntVariations variations={demoVariations} selectedId="1" onSelect={noop} layout="grid" columns={3} />
    ),
  },

  'cost-estimate': {
    bootstrap: () => (
      <BsCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
    ),
    antd: () => (
      <AntCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
    ),
  },

  'model-management': {
    bootstrap: () => (
      <BsModelManagement models={demoModels} selectedModelId="gpt4" onSelectModel={noop} showDetails groupByProvider />
    ),
    antd: () => (
      <AntModelManagement models={demoModels} selectedModelId="gpt4" onSelectModel={noop} showDetails groupByProvider />
    ),
  },
};
