export interface PatternExplanation {
  overview: string;
  variants: { title: string; description: string }[];
  useCases: string[];
  bestPractices: string[];
  relatedPatterns: string[];
}

export const patternExplanations: Record<string, PatternExplanation> = {
  "open-input": {
    overview:
      "Open Input is the foundational interaction point between users and AI systems. It provides a natural language interface — typically a text field — where users express their intent in their own words. While this feels immediately intuitive, it introduces a classic cold-start challenge: users often don't know what to type after their first message. Effective open input design bridges this gap by combining the free-form prompt area with supportive affordances like scope indicators, contextual hints, and graceful error handling.",
    variants: [
      {
        title: "Chat box",
        description:
          "A persistent input anchored at the bottom of a conversation thread. Well suited for iterative, back-and-forth dialogue and follow-up questions.",
      },
      {
        title: "Inline composer",
        description:
          "A prompt that activates at the cursor position within an editor. Ideal for targeted edits such as rewriting a paragraph or generating content at a specific location.",
      },
      {
        title: "Command-style prompt",
        description:
          "A single-line field paired with structured flags or controls. Favored by power users who want precision and repeatability.",
      },
      {
        title: "Side panel composer",
        description:
          "A prompt housed in a dedicated panel that can reference files, tools, and settings. Best for complex, multi-source tasks that require extended context.",
      },
    ],
    useCases: [
      "Conversational AI assistants and chatbots",
      "Document and content generation tools",
      "Code completion and programming assistants",
      "Creative tools like image or music generators",
      "Search interfaces with natural language queries",
    ],
    bestPractices: [
      "Define a clear default scope and make scope changes a single-step action so users always know what the AI is operating on.",
      "Respond to edge cases with constructive guidance rather than generic error messages or silent failures.",
      "Don't assume users are skilled prompt engineers — provide wayfinding aids like suggestions, templates, and inline hints.",
      "Keep advanced controls accessible without cluttering the default view; progressive disclosure works well here.",
      "Maintain user agency at every stage — always surface options for parameters, model selection, and output formatting.",
    ],
    relatedPatterns: [
      "Suggestions",
      "Parameter Control",
      "Regenerate",
      "Model Management",
    ],
  },

  suggestions: {
    overview:
      "Suggestions are the icebreakers of AI interaction. They surface a small set of ready-made prompts — usually three to five — that help users discover what the system can do and overcome the blank-canvas problem. When a user selects a suggestion, it either prefills the input for editing or triggers the action immediately. Beyond onboarding, suggestions keep the conversation moving by proposing relevant follow-ups based on the current context, turning a potentially aimless exchange into a guided experience.",
    variants: [
      {
        title: "Static suggestions",
        description:
          "Fixed starter prompts displayed during onboarding or first-run experiences. They may change by mode but aren't personalized to the individual user.",
      },
      {
        title: "Contextual suggestions",
        description:
          "Prompts that shift dynamically based on what the user is viewing, the active document, or the current mode — for example, offering code-related questions inside an IDE.",
      },
      {
        title: "Adaptive suggestions",
        description:
          "Prompts that evolve over time as the system learns user preferences, team conventions, or past interaction patterns.",
      },
    ],
    useCases: [
      "First-run onboarding to demonstrate system capabilities",
      "Idle states where the user hasn't interacted for a while",
      "Context switches such as opening a new document or changing modes",
      "Follow-up prompts after the AI delivers a response",
      "Discovery features that surface lesser-known capabilities",
    ],
    bestPractices: [
      "Show three to six suggestions ranked by relevance or engagement. Too many creates scanning fatigue; too few limits discovery.",
      "Make suggestions actionable — selecting one should either execute the prompt or prefill it for editing, not just display text.",
      "Ground suggestions in the current context (active file, page content, recent conversation) so they feel relevant, not generic.",
      "Place suggestions where users need direction: onboarding screens, idle states, and after mode changes. Avoid showing them during focus-intensive tasks.",
      "For suggestions that trigger data access, publishing, or heavy computation, show a preview or confirmation step before committing.",
    ],
    relatedPatterns: ["Open Input", "Regenerate", "Parameter Control"],
  },

  "parameter-control": {
    overview:
      "Parameters sit between user intent and model behavior, acting as the dials that control how the AI interprets input and generates output. They let users specify how exploratory or constrained, how creative or deterministic, and how concise or verbose the generation should be. The pattern has evolved from typed inline flags — popularized by early image generators — into more accessible controls like sliders, toggles, dropdowns, and preset bundles that welcome users at every skill level.",
    variants: [
      {
        title: "Inline flags",
        description:
          "Typed tokens within the prompt itself that modify generation behavior. High precision for experts but a steep learning curve for newcomers.",
      },
      {
        title: "Toggles and switches",
        description:
          "Binary controls for two-state parameters such as formal vs. casual tone, or speed vs. quality trade-offs.",
      },
      {
        title: "Sliders",
        description:
          "Continuous or stepped controls for adjusting numerical weights like temperature, length, or creativity levels.",
      },
      {
        title: "Presets",
        description:
          "Bundled configurations that wrap multiple parameters into clear choices like 'Draft' vs. 'Publish-ready', simplifying decision-making.",
      },
    ],
    useCases: [
      "Fine-tuning generation temperature and creativity",
      "Controlling output length, format, and aspect ratio",
      "Selecting tone, voice, or writing style before generation",
      "Adjusting speed vs. quality trade-offs for different workflows",
      "Bundling advanced settings into beginner-friendly presets",
    ],
    bestPractices: [
      "Ship with sensible defaults — most users won't adjust parameters, so the out-of-the-box experience should produce good results.",
      "Use progressive disclosure: surface one or two key controls by default and tuck advanced options behind expandable panels.",
      "Bundle complex parameter combinations into named presets that clearly communicate their effect (e.g. 'Creative Draft' vs. 'Precise Report').",
      "Label any option that affects cost, speed, or resource usage so users can make informed choices before generation.",
      "Guard against extreme settings that could produce failures — warn when values are likely to cause truncation, nonsensical output, or excessive cost.",
    ],
    relatedPatterns: ["Model Management", "Cost Estimate", "Open Input"],
  },

  "stream-of-thought": {
    overview:
      "Stream of Thought makes the AI's internal reasoning visible to the user. Instead of presenting only the final answer, it reveals the plan formed, tools invoked, code executed, and decisions made along the way. This transparency transforms a black-box interaction into an auditable process where users can verify logic, catch mistakes early, and build trust in the system's capabilities. The level of detail can scale from a brief progress summary for simple tasks to a full execution trace for complex, multi-step workflows.",
    variants: [
      {
        title: "Human-readable plans",
        description:
          "A preview of the steps the AI intends to take, shown before execution begins. Users can review, edit, or approve the plan.",
      },
      {
        title: "Execution logs",
        description:
          "A real-time record of tool calls, code runs, and intermediate results as the AI works through a task.",
      },
      {
        title: "Compact summaries",
        description:
          "Condensed accounts of reasoning, key insights, and decisions — useful when full logs would overwhelm the user.",
      },
    ],
    useCases: [
      "Multi-step agentic workflows where the AI calls tools or APIs",
      "Debugging and code generation tasks where reasoning matters",
      "Research and analysis where source evaluation is important",
      "Compliance and audit scenarios requiring decision traceability",
      "Educational contexts where users want to learn from the AI's process",
    ],
    bestPractices: [
      "Show the plan before acting — let users review intended steps, estimated scope, and required permissions before execution begins.",
      "Keep three layers distinct: what will happen (plan), what is happening (execution), and what supports the result (evidence). Sync them but don't merge them.",
      "Scale detail to task complexity: a simple question needs minimal trace, while a multi-step workflow benefits from a full log.",
      "Treat each step as a clear state — queued, running, waiting for approval, error, retried, or completed — and pair states with visual progress cues.",
      "Adapt the presentation to the medium: text interfaces can link outputs to source steps, voice interfaces should summarize the current action concisely.",
    ],
    relatedPatterns: ["Citation", "Cost Estimate", "Regenerate"],
  },

  citation: {
    overview:
      "Citations connect an AI-generated response back to its underlying source material — whether that's a PDF, a web page, a transcript, or an internal knowledge base. By surfacing where information comes from, they let users verify claims, explore primary sources, and judge the reliability of the output. This is especially important because AI summaries can contain inaccuracies or misrepresentations; inline references give users a quick path to the truth rather than forcing blind trust.",
    variants: [
      {
        title: "Inline highlights",
        description:
          "Linked annotations within the response text that point to specific passages in attached or referenced documents.",
      },
      {
        title: "Direct quotations",
        description:
          "Exact quotes pulled from the source material, displayed alongside or within the generated summary.",
      },
      {
        title: "Multi-source references",
        description:
          "Grouped references with metadata such as titles, favicons, and relevance indicators, enabling quick scanning across multiple sources.",
      },
      {
        title: "Lightweight links",
        description:
          "Simple URL references that prioritize transparency and verifiability over visual polish.",
      },
    ],
    useCases: [
      "Research assistants that synthesize information from multiple sources",
      "Enterprise knowledge bases where accuracy is critical",
      "Legal or medical tools that require traceable references",
      "Content summarization where users need to fact-check claims",
      "RAG (retrieval-augmented generation) pipelines surfacing retrieved documents",
    ],
    bestPractices: [
      "Match citation granularity to the claim: factual statements need exact passages, while discovery-oriented content can use broader references.",
      "Position citations where users naturally expect them — inline for sentence-level claims, in a side panel for exploratory browsing.",
      "Provide hover or click previews that show the relevant excerpt without requiring a full navigation away from the response.",
      "Explicitly surface when a source is unavailable or could not be retrieved rather than silently dropping the reference.",
      "Allow users to re-scope or filter references without regenerating the entire response.",
    ],
    relatedPatterns: ["Stream of Thought", "Disclosure", "Variations"],
  },

  regenerate: {
    overview:
      "Regenerate lets users ask the AI to produce a new response to the same prompt without additional input. Because generative models are inherently non-deterministic, re-running the same request naturally yields different wording, structure, or reasoning. This makes regeneration a fast — if imprecise — way to explore alternatives when the first result doesn't land. Unlike targeted controls such as prompt editing or parameter adjustment, regeneration trades precision for speed: one click, a fresh take.",
    variants: [
      {
        title: "Overwrite",
        description:
          "The new output replaces the previous one in place. Common in chat-style interfaces where conversation flow is linear.",
      },
      {
        title: "Branching",
        description:
          "Each regeneration creates a separate version that users can browse and compare. Used in editors and tools where preserving history matters.",
      },
      {
        title: "Guided regeneration",
        description:
          "Users can tweak a parameter or add a style hint before re-running, giving slightly more control than a blind retry.",
      },
    ],
    useCases: [
      "Creative writing where users want to explore different phrasings",
      "Image generation to discover alternative visual interpretations",
      "Code generation when the first solution doesn't fit the codebase style",
      "Quick recovery from hallucinated or low-quality responses",
      "A/B exploration when users aren't sure what they want yet",
    ],
    bestPractices: [
      "Set clear expectations about whether regeneration overwrites the current output or creates a new branch alongside it.",
      "Make previous results easy to recover — provide navigation arrows, a version history, or undo support so nothing feels lost.",
      "Offer both one-click regeneration for speed and optional adjustment controls for users who want a bit more direction.",
      "Use seed values or variation controls when consistency matters, so users can iterate predictably rather than randomly.",
      "Match the regeneration model to the use case: creative workflows benefit from high variance, while convergent tasks need tighter repetition.",
    ],
    relatedPatterns: ["Variations", "Open Input", "Parameter Control"],
  },

  disclosure: {
    overview:
      "Disclosure makes AI involvement visible. It labels content, features, and actors so users always know when they're interacting with — or viewing the output of — an AI system. This matters because AI-generated content can be indistinguishable from human work, and users deserve to make informed judgments about what they're reading, sharing, or acting on. In products where AI and human content coexist, clear labeling prevents users from unknowingly presenting machine-generated work as their own.",
    variants: [
      {
        title: "Actor labeling",
        description:
          "Distinct names, avatars, and badges that identify non-human participants in conversations or collaborative spaces.",
      },
      {
        title: "Feature-level indicators",
        description:
          "Inline chips, icons, or labels (e.g. 'AI Assist') that mark specific features or actions as AI-powered.",
      },
      {
        title: "Output attribution",
        description:
          "Watermarks, badges, or tags on generated content that describe the nature of AI involvement — generated, edited, or summarized.",
      },
    ],
    useCases: [
      "Chat interfaces where AI bots participate alongside humans",
      "Content editors that blend AI-generated and human-written text",
      "Customer support handoffs between AI agents and human operators",
      "Social platforms where AI-generated media could be mistaken for real content",
      "Compliance contexts where AI use must be disclosed by regulation",
    ],
    bestPractices: [
      "Name the AI actor consistently and give it a visually distinct identity — users should never mistake it for a human participant.",
      "Use specific action verbs in labels ('Summarized with AI', 'AI-generated draft') rather than a vague 'AI' tag, so users know exactly what happened.",
      "Apply subtle visual differentiation — color, background, or border — to AI content without making it feel lesser or untrustworthy.",
      "Never simulate human interaction, especially in sensitive contexts like support or healthcare, where misattribution erodes trust.",
      "Provide opt-out or consent mechanisms when AI is introduced into shared spaces, particularly for recording or data-processing features.",
    ],
    relatedPatterns: ["Citation", "Cost Estimate", "Stream of Thought"],
  },

  variations: {
    overview:
      "Generative AI is probabilistic by nature, meaning every run can produce a different result. The Variations pattern embraces this by generating multiple outputs from a single prompt and presenting them side by side for comparison. Users can browse divergent options — some closely matching their intent, others offering unexpected directions — and select the one that works best. This turns the model's inherent randomness from a liability into a creative advantage, supporting both exploratory brainstorming and convergent decision-making.",
    variants: [
      {
        title: "Branched variations",
        description:
          "Multiple outputs generated simultaneously from the same seed, displayed as a grid of thumbnails or cards. Users can refine any individual variation further.",
      },
      {
        title: "Convergent variations",
        description:
          "A shortlist of alternatives presented inline within content or code. The user picks one, and it merges into the main output. Often triggered on demand or when model confidence is low.",
      },
      {
        title: "Preset variations",
        description:
          "Outputs with pre-applied stylistic or tonal adjustments — e.g. formal vs. casual, concise vs. detailed — grouped together for quick comparison.",
      },
    ],
    useCases: [
      "Image generation where visual style exploration is key",
      "Copywriting to compare different tones and angles",
      "Code generation to evaluate alternative implementations",
      "Design tools offering multiple layout or color options",
      "Translation tools presenting equivalent phrasing options",
    ],
    bestPractices: [
      "Keep follow-up actions close at hand — once a user selects a variation, the next step (edit, refine, export) should be immediately accessible.",
      "Allow regeneration of the entire variation set when none of the options hit the mark.",
      "Expose controls for variation count, seed consistency, and divergence level so users can tune the spread of results.",
      "Track metadata about how each variation was produced so users can understand why outputs differ.",
      "Never overwrite the original output without explicit confirmation — accidental loss of a preferred version breaks trust quickly.",
    ],
    relatedPatterns: ["Regenerate", "Parameter Control", "Cost Estimate"],
  },

  "cost-estimate": {
    overview:
      "Every AI generation consumes compute resources, and costs can accumulate quickly when users iterate on prompts, chain multi-step workflows, or select premium models. The Cost Estimate pattern makes this spending visible by displaying projected expenses alongside the actions that incur them. Rather than hiding costs behind opaque credit systems or surprising users with end-of-month bills, it empowers them to compare the relative expense of different prompt, parameter, and model combinations before anything runs.",
    variants: [
      {
        title: "Token-based breakdown",
        description:
          "Displays input and output token counts alongside their per-unit cost, giving technically-oriented users precise visibility into resource consumption.",
      },
      {
        title: "Credit-based estimate",
        description:
          "Translates raw compute costs into product-specific credits, simplifying the mental model for non-technical users at the expense of cross-platform comparability.",
      },
      {
        title: "Workflow-level rollup",
        description:
          "Aggregates costs across chained steps or multi-action workflows, showing both per-step and total estimates.",
      },
    ],
    useCases: [
      "API playgrounds and developer tools where per-call costs vary",
      "Enterprise dashboards tracking team or project-level AI spend",
      "Multi-step agent workflows where each tool call has a cost",
      "Model selection interfaces where users compare price-performance",
      "Budget-conscious applications that need spend guardrails",
    ],
    bestPractices: [
      "Make the unit of measurement explicit — tokens, characters, seconds, or credits — so users always know what they're looking at.",
      "Ground estimates in units people understand and display ranges when output length is unpredictable, updating during streaming.",
      "Break estimates into components (input cost, output cost, tool calls) so users can identify which part of a workflow is expensive.",
      "Suggest cheaper alternatives when available, such as a smaller model, batch processing, or cached responses.",
      "Position cost information at decision points — next to the generate button or model selector — not buried in settings or billing pages.",
    ],
    relatedPatterns: [
      "Model Management",
      "Parameter Control",
      "Stream of Thought",
    ],
  },

  "model-management": {
    overview:
      "Different AI models come with different strengths, trade-offs, and price points. Model Management gives users the ability to choose which model powers their generation — whether they're optimizing for accuracy, speed, cost, creative style, or compliance requirements. Users may prototype on a lightweight model and switch to a premium one for final output, benchmark the same prompt across providers, or avoid certain models when handling sensitive data. This pattern surfaces those choices clearly rather than hiding them behind automatic routing.",
    variants: [
      {
        title: "Dropdown selector",
        description:
          "A compact picker that lists available models with key metadata like provider, capability tier, and price indicator.",
      },
      {
        title: "Grouped catalog",
        description:
          "Models organized by provider, tier (free / pro / enterprise), or domain specialization, with expandable detail cards.",
      },
      {
        title: "Inline indicator",
        description:
          "A persistent label near the input or output area showing the active model, clickable to switch without navigating away.",
      },
    ],
    useCases: [
      "Multi-provider platforms offering models from OpenAI, Anthropic, Google, and others",
      "Development environments where engineers benchmark across models",
      "Cost optimization workflows where users shift to cheaper models for drafts",
      "Compliance-sensitive environments restricting certain model providers",
      "Creative applications where different models produce distinct aesthetic styles",
    ],
    bestPractices: [
      "Always display the active model visibly near the generation point so users know what's powering their output.",
      "Translate model differences into practical terms — accuracy, speed, creativity, cost, recency — rather than relying on technical model names alone.",
      "Allow seamless mid-conversation model switching without losing context or chat history.",
      "Surface usage costs within the selector so users can weigh price against capability before committing.",
      "Support both automatic routing (system picks the best model) and manual override (user picks explicitly), defaulting to whichever fits the audience.",
    ],
    relatedPatterns: ["Cost Estimate", "Parameter Control", "Open Input"],
  },
};
