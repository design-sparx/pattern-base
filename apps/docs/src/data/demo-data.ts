/**
 * Shared demo data used by the component registry and previews.
 */

export const demoSuggestions = [
  {
    id: "1",
    title: "Write a story",
    prompt: "Write a short story about...",
    icon: "\u270D\uFE0F",
    description: "Generate creative fiction",
  },
  {
    id: "2",
    title: "Analyze data",
    prompt: "Analyze the following data...",
    icon: "\uD83D\uDCCA",
    description: "Get insights from your data",
  },
  {
    id: "3",
    title: "Debug code",
    prompt: "Help me debug this code...",
    icon: "\uD83D\uDC1B",
    description: "Find and fix code issues",
  },
  {
    id: "4",
    title: "Brainstorm",
    prompt: "Help me brainstorm ideas for...",
    icon: "\uD83D\uDCA1",
    description: "Generate creative ideas",
  },
];

export const demoParameters = [
  {
    id: "temp",
    label: "Temperature",
    type: "slider" as const,
    value: 0.7,
    min: 0,
    max: 2,
    step: 0.1,
    description: "Controls randomness of output",
  },
  {
    id: "tokens",
    label: "Max Tokens",
    type: "slider" as const,
    value: 1024,
    min: 1,
    max: 4096,
    step: 1,
    description: "Maximum response length",
  },
  {
    id: "stream",
    label: "Streaming",
    type: "toggle" as const,
    value: true,
    description: "Stream response tokens",
  },
  {
    id: "style",
    label: "Style",
    type: "select" as const,
    value: "balanced",
    options: [
      { label: "Creative", value: "creative" },
      { label: "Balanced", value: "balanced" },
      { label: "Precise", value: "precise" },
    ],
  },
];

export const demoSteps = [
  {
    id: "1",
    type: "thinking" as const,
    content:
      "Analyzing the user query to determine the best approach for generating a comprehensive response.",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "tool_call" as const,
    content:
      "Searching knowledge base for relevant information about React component patterns.",
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "action" as const,
    content:
      "Synthesizing information from 3 sources to create a coherent and accurate response.",
    timestamp: new Date(),
  },
  {
    id: "4",
    type: "result" as const,
    content:
      "Generated comprehensive response with citations and code examples.",
    timestamp: new Date(),
  },
];

export const demoCitations = [
  {
    id: "1",
    source: "React Documentation",
    url: "https://react.dev",
    snippet:
      "React lets you build user interfaces out of individual pieces called components.",
    relevance: 0.95,
  },
  {
    id: "2",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    snippet:
      "JavaScript is a lightweight, interpreted programming language with first-class functions.",
    relevance: 0.72,
  },
  {
    id: "3",
    source: "TypeScript Handbook",
    url: "https://typescriptlang.org",
    snippet:
      "TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor.",
    relevance: 0.61,
  },
  {
    id: "4",
    source: "Next.js Docs",
    url: "https://nextjs.org/docs",
    snippet:
      "Next.js is a React framework for building full-stack web applications.",
    relevance: 0.55,
  },
];

export const demoVariations = [
  {
    id: "1",
    label: "Formal",
    content:
      "Dear Sir/Madam, I am writing to express my sincere interest in the Software Engineer position at your esteemed organization.",
  },
  {
    id: "2",
    label: "Casual",
    content:
      "Hey there! I saw your job posting and got really excited - I think I would be a great fit for your team!",
  },
  {
    id: "3",
    label: "Creative",
    content:
      "Imagine a candidate who brings not just technical expertise, but a genuine passion for crafting elegant solutions to complex problems.",
  },
];

export const demoCostBreakdown = {
  inputTokens: 1250,
  outputTokens: 830,
  totalTokens: 2080,
  inputCost: 0.00375,
  outputCost: 0.00498,
  totalCost: 0.00873,
  model: "GPT-4 Turbo",
};

export const demoModels = [
  {
    id: "gpt4",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most capable model",
    contextWindow: 128000,
    costPer1kInput: 0.01,
    capabilities: ["chat", "code", "vision"],
  },
  {
    id: "gpt35",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and affordable",
    contextWindow: 16000,
    costPer1kInput: 0.0005,
    capabilities: ["chat", "code"],
  },
  {
    id: "claude3",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Best for complex tasks",
    contextWindow: 200000,
    costPer1kInput: 0.015,
    capabilities: ["chat", "code", "vision"],
  },
  {
    id: "claude-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "Fastest response time",
    contextWindow: 200000,
    costPer1kInput: 0.00025,
    capabilities: ["chat", "code"],
  },
];
