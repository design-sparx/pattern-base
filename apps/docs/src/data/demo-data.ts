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

export const demoFollowUps = [
  { id: "1", text: "Tell me more about this topic", icon: "\u27A1\uFE0F" },
  { id: "2", text: "Can you give an example?", icon: "\uD83D\uDCA1" },
  {
    id: "3",
    text: "How does this compare to alternatives?",
    icon: "\u2696\uFE0F",
  },
  { id: "4", text: "What are the limitations?", icon: "\u26A0\uFE0F" },
];

export const demoTemplates = [
  {
    id: "1",
    name: "Blog Post",
    description: "Generate a structured blog post",
    icon: "\uD83D\uDCDD",
    category: "Writing",
    template: "Write a blog post about {{topic}} for {{audience}}",
    variables: [
      { id: "topic", label: "Topic", placeholder: "e.g. AI trends" },
      { id: "audience", label: "Audience", placeholder: "e.g. developers" },
    ],
  },
  {
    id: "2",
    name: "Code Review",
    description: "Review code for best practices",
    icon: "\uD83D\uDD0D",
    category: "Development",
    template: "Review this {{language}} code for best practices",
    variables: [
      {
        id: "language",
        label: "Language",
        type: "select" as const,
        options: [
          { label: "TypeScript", value: "typescript" },
          { label: "Python", value: "python" },
          { label: "Go", value: "go" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Email Draft",
    description: "Draft a professional email",
    icon: "\uD83D\uDCE7",
    category: "Writing",
    template: "Draft an email to {{recipient}} about {{subject}}",
  },
  {
    id: "4",
    name: "Data Analysis",
    description: "Analyze dataset patterns",
    icon: "\uD83D\uDCCA",
    category: "Development",
    template: "Analyze this dataset and highlight key patterns",
  },
];

export const demoGalleryItems = [
  {
    id: "1",
    type: "card" as const,
    title: "Abstract Design",
    content: "A modern geometric pattern with vibrant gradients",
  },
  {
    id: "2",
    type: "card" as const,
    title: "Nature Scene",
    content: "Serene mountain landscape at golden hour",
  },
  {
    id: "3",
    type: "card" as const,
    title: "Urban Sketch",
    content: "Architectural line drawing of a city skyline",
  },
  {
    id: "4",
    type: "card" as const,
    title: "Portrait Study",
    content: "Minimalist portrait with bold color blocking",
  },
  {
    id: "5",
    type: "card" as const,
    title: "Data Visualization",
    content: "Interactive chart showing growth trends",
  },
  {
    id: "6",
    type: "card" as const,
    title: "Icon Set",
    content: "Consistent icon family for a design system",
  },
];

export const demoAttachments = [
  {
    id: "1",
    name: "report.pdf",
    type: "application/pdf",
    size: 245000,
    status: "complete" as const,
  },
  {
    id: "2",
    name: "data.csv",
    type: "text/csv",
    size: 18200,
    status: "complete" as const,
  },
  {
    id: "3",
    name: "image.png",
    type: "image/png",
    size: 1520000,
    status: "uploading" as const,
    progress: 65,
  },
];

export const demoFilterGroups = [
  {
    id: "type",
    label: "Content Type",
    type: "checkbox" as const,
    options: [
      { id: "text", label: "Text", value: "text", count: 24 },
      { id: "image", label: "Image", value: "image", count: 12 },
      { id: "code", label: "Code", value: "code", count: 8 },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    type: "radio" as const,
    options: [
      { id: "high", label: "High", value: "high" },
      { id: "medium", label: "Medium", value: "medium" },
      { id: "draft", label: "Draft", value: "draft" },
    ],
  },
  {
    id: "length",
    label: "Length",
    type: "range" as const,
    min: 0,
    max: 5000,
    step: 100,
  },
];

export const demoActionPlanSteps = [
  {
    id: "1",
    title: "Analyze input data",
    status: "completed" as const,
    description: "Parse and validate the provided dataset",
    estimatedDuration: "~2s",
    tool: "DataParser",
  },
  {
    id: "2",
    title: "Generate initial draft",
    status: "in-progress" as const,
    description: "Create first version based on analysis",
    estimatedDuration: "~5s",
  },
  {
    id: "3",
    title: "Apply formatting rules",
    status: "pending" as const,
    description: "Format output according to style guide",
    estimatedDuration: "~1s",
  },
  {
    id: "4",
    title: "Run quality checks",
    status: "pending" as const,
    description: "Verify accuracy and completeness",
    estimatedDuration: "~3s",
  },
];

export const demoConsentItems = [
  {
    id: "1",
    label: "Process my data with AI",
    description: "Allow AI models to analyze your input",
    required: true,
  },
  {
    id: "2",
    label: "Store conversation history",
    description: "Save your conversations for future reference",
    required: false,
    defaultChecked: true,
  },
  {
    id: "3",
    label: "Share anonymized usage data",
    description: "Help improve the AI by sharing anonymous usage patterns",
    required: false,
  },
];

export const demoAutoFillSuggestions = [
  {
    id: "1",
    text: "How do I implement authentication in React?",
    source: "Recent searches",
    matchScore: 0.95,
  },
  {
    id: "2",
    text: "How do I implement pagination?",
    source: "Popular queries",
    matchScore: 0.85,
  },
  {
    id: "3",
    text: "How do I implement dark mode?",
    source: "Trending",
    matchScore: 0.78,
  },
  {
    id: "4",
    text: "How do I implement caching strategies?",
    source: "Recent searches",
    matchScore: 0.72,
  },
];

export const demoSummaryContent =
  "The research paper presents a novel approach to transformer architectures that reduces computational complexity from quadratic to linear time. Key contributions include a new attention mechanism called 'sparse flash attention' that maintains 97% of standard attention quality while using 60% less memory. The authors demonstrate improvements across language modeling, translation, and summarization benchmarks, with particularly strong results on long-document tasks where context windows exceed 32K tokens.";

export const demoInitialCtaActions = [
  {
    id: "1",
    label: "Write something",
    description: "Generate text, emails, or documents",
    icon: "\u270D\uFE0F",
  },
  {
    id: "2",
    label: "Analyze data",
    description: "Get insights from your datasets",
    icon: "\uD83D\uDCCA",
  },
  {
    id: "3",
    label: "Generate code",
    description: "Create or debug source code",
    icon: "\uD83D\uDCBB",
  },
];

export const demoNudges = [
  {
    id: "1",
    message: "Try using more specific prompts for better results",
    type: "tip" as const,
    icon: "\uD83D\uDCA1",
    actionLabel: "Show examples",
  },
  {
    id: "2",
    message: "You have unused credits expiring soon",
    type: "reminder" as const,
    icon: "\u23F0",
    actionLabel: "View credits",
  },
  {
    id: "3",
    message: "New feature: You can now upload images for analysis",
    type: "suggestion" as const,
    icon: "\u2728",
  },
];

export const demoPromptDetails = [
  { id: "1", label: "Language", value: "English", type: "badge" as const },
  {
    id: "2",
    label: "Context",
    value: "Technical documentation",
    type: "text" as const,
  },
  {
    id: "3",
    label: "Reference",
    value: "React docs",
    type: "link" as const,
    url: "https://react.dev",
  },
];

export const demoTransformOptions = [
  { id: "formal", label: "Make formal", icon: "\uD83C\uDF93" },
  { id: "casual", label: "Make casual", icon: "\uD83D\uDE0A" },
  { id: "shorter", label: "Make shorter", icon: "\u2702\uFE0F" },
  { id: "longer", label: "Make longer", icon: "\uD83D\uDCDD" },
];

export const demoTransformContent =
  "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.";

export const demoInlineActions = [
  {
    id: "copy",
    label: "Copy",
    icon: "\uD83D\uDCCB",
    type: "secondary" as const,
  },
  { id: "edit", label: "Edit", icon: "\u270F\uFE0F", type: "primary" as const },
  {
    id: "delete",
    label: "Delete",
    icon: "\uD83D\uDDD1\uFE0F",
    type: "danger" as const,
  },
];

export const demoChainedSteps = [
  {
    id: "1",
    label: "Fetch latest data",
    description: "Pull data from API",
    status: "completed" as const,
    result: "Retrieved 142 records",
  },
  {
    id: "2",
    label: "Analyze patterns",
    description: "Run statistical analysis",
    status: "active" as const,
  },
  {
    id: "3",
    label: "Generate report",
    description: "Create summary document",
    status: "idle" as const,
  },
  {
    id: "4",
    label: "Send notification",
    description: "Email results to team",
    status: "idle" as const,
  },
];

export const demoDataOwnershipItems = [
  {
    id: "1",
    dataType: "Conversation History",
    description: "All chat messages and AI responses",
    retention: "90 days",
    deletable: true,
  },
  {
    id: "2",
    dataType: "Uploaded Files",
    description: "Documents and images you've shared",
    retention: "30 days",
    deletable: true,
  },
  {
    id: "3",
    dataType: "Usage Analytics",
    description: "Anonymous usage patterns and statistics",
    retention: "1 year",
    deletable: false,
  },
  {
    id: "4",
    dataType: "Model Preferences",
    description: "Your saved settings and preferences",
    retention: "Permanent",
    deletable: true,
  },
];

export const demoFootprintEntries = [
  {
    id: "1",
    action: "Generated blog post outline",
    timestamp: new Date(Date.now() - 300000),
    model: "GPT-4",
    inputPreview: "Write an outline for a blog post about...",
    outputPreview: "1. Introduction to AI trends...",
  },
  {
    id: "2",
    action: "Code review completed",
    timestamp: new Date(Date.now() - 600000),
    model: "Claude 3",
    inputPreview: "Review this React component...",
    outputPreview: "The component has 3 issues...",
  },
  {
    id: "3",
    action: "Image analysis",
    timestamp: new Date(Date.now() - 900000),
    model: "GPT-4 Vision",
    inputPreview: "Describe what you see in this image",
    outputPreview: "The image shows a dashboard...",
  },
  {
    id: "4",
    action: "Translation completed",
    timestamp: new Date(Date.now() - 1200000),
    model: "GPT-3.5",
    inputPreview: "Translate to Spanish: Hello world",
    outputPreview: "Hola mundo",
  },
];

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

export const demoDescribeDetails = [
  { id: "1", label: "Model", value: "Midjourney v6", type: "badge" as const },
  { id: "2", label: "Aspect Ratio", value: "16:9", type: "text" as const },
  { id: "3", label: "Quality", value: "High", type: "text" as const },
  { id: "4", label: "Stylize", value: "750", type: "code" as const },
];

export const demoDescribeOutput =
  "A vibrant digital illustration of a futuristic cityscape at sunset, with flying vehicles and holographic billboards reflecting off glass towers.";

export const demoDescribeInferredPrompt =
  "futuristic cityscape, sunset, flying vehicles, holographic billboards, glass towers, vibrant digital illustration --ar 16:9 --stylize 750";

export const demoInpaintingRegions = [
  { id: "intro", label: "Introduction" },
  { id: "body", label: "Main Body" },
  { id: "conclusion", label: "Conclusion" },
  { id: "tone", label: "Tone Adjustment" },
];

export const demoInpaintingContent =
  "The quarterly report shows strong growth across all divisions. Revenue increased by 23% year-over-year, driven primarily by the expansion of our cloud services platform. Customer satisfaction scores reached an all-time high of 94%.";

export const demoMadlibsVariables = [
  {
    id: "topic",
    label: "Topic",
    placeholder: "e.g. AI trends in healthcare",
    required: true as const,
  },
  {
    id: "audience",
    label: "Target Audience",
    placeholder: "e.g. healthcare professionals",
    required: true as const,
  },
  {
    id: "tone",
    label: "Tone",
    type: "select" as const,
    options: [
      { label: "Professional", value: "professional" },
      { label: "Conversational", value: "conversational" },
      { label: "Academic", value: "academic" },
    ],
  },
  {
    id: "length",
    label: "Word Count",
    type: "number" as const,
    placeholder: "e.g. 500",
    defaultValue: "500",
  },
];

export const demoMadlibsTemplate =
  "Write a {{tone}} blog post about {{topic}} targeted at {{audience}}. The post should be approximately {{length}} words long.";

export const demoRestructureOptions = [
  { id: "condense", label: "Make Shorter", icon: "📝" },
  { id: "expand", label: "Elaborate", icon: "📖" },
  { id: "bullets", label: "To Bullet Points", icon: "📋" },
  { id: "reorder", label: "Reorder by Priority", icon: "🔄" },
  { id: "extract", label: "Extract Key Points", icon: "🎯" },
];

export const demoRestructureContent =
  "Machine learning has transformed how businesses operate. Companies now use predictive analytics for customer behavior, natural language processing for support automation, and computer vision for quality control. The adoption rate has grown 340% since 2020, with mid-size companies showing the fastest growth trajectory.";

export const demoRestyleOptions = [
  {
    id: "formal",
    label: "Formal",
    icon: "🎩",
    description: "Professional business tone",
  },
  {
    id: "casual",
    label: "Casual",
    icon: "😊",
    description: "Friendly conversational style",
  },
  {
    id: "technical",
    label: "Technical",
    icon: "⚙️",
    description: "Precise technical language",
  },
  {
    id: "creative",
    label: "Creative",
    icon: "🎨",
    description: "Expressive literary style",
  },
];

export const demoRestyleContent =
  "Our new product helps teams work better together. It combines project management with real-time collaboration tools, making it easy to track progress and share updates.";

export const demoSynthesisSources = [
  {
    id: "s1",
    title: "McKinsey AI Report 2025",
    content: "AI adoption in enterprises has reached 72%, up from 55% in 2023.",
    url: "https://mckinsey.com/ai-report",
    relevance: 0.95,
  },
  {
    id: "s2",
    title: "Gartner Technology Trends",
    content:
      "Generative AI is the most impactful technology trend, with 65% of organizations experimenting.",
    url: "https://gartner.com/tech-trends",
    relevance: 0.88,
  },
  {
    id: "s3",
    title: "Stanford AI Index",
    content:
      "Private AI investment reached $93.5B in 2024, with healthcare and finance leading sectors.",
    url: "https://aiindex.stanford.edu",
    relevance: 0.82,
  },
];

export const demoSynthesisInsights = [
  {
    id: "i1",
    text: "Enterprise AI adoption has accelerated significantly, with over 70% of large organizations now deploying AI solutions.",
    confidence: 0.92,
    sourceIds: ["s1", "s2"],
    type: "fact" as const,
  },
  {
    id: "i2",
    text: "Healthcare and finance are emerging as the primary sectors driving AI investment growth.",
    confidence: 0.78,
    sourceIds: ["s3"],
    type: "theme" as const,
  },
  {
    id: "i3",
    text: "The gap between AI experimentation and production deployment is narrowing, suggesting maturation of enterprise AI strategies.",
    confidence: 0.65,
    sourceIds: ["s1", "s2", "s3"],
    type: "inference" as const,
  },
];
