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

  "follow-up": {
    overview:
      "Follow Up prompts keep the conversation moving after an AI response by suggesting relevant next steps. They reduce the cognitive load of deciding what to ask next and help users explore a topic more deeply without composing prompts from scratch. Well-chosen follow-ups transform a single Q&A exchange into a productive exploration session.",
    variants: [
      {
        title: "Chip prompts",
        description:
          "Compact pill-shaped buttons displayed beneath a response, each containing a ready-to-send follow-up question.",
      },
      {
        title: "List prompts",
        description:
          "A vertical list of follow-up options with optional descriptions, suited for more complex or detailed suggestions.",
      },
      {
        title: "Contextual buttons",
        description:
          "Action-oriented buttons that adapt based on the content of the AI's response, such as 'Show code' or 'Explain further'.",
      },
    ],
    useCases: [
      "Chat assistants guiding users through multi-turn conversations",
      "Research tools that help users drill down into topics",
      "Customer support bots suggesting next troubleshooting steps",
      "Educational tools that encourage deeper exploration",
      "Content generation workflows where iterative refinement is common",
    ],
    bestPractices: [
      "Generate follow-ups contextually based on the AI's most recent response, not generic suggestions.",
      "Limit follow-ups to 3-5 options to prevent decision paralysis.",
      "Make follow-ups actionable — clicking should immediately send the prompt or pre-fill the input.",
      "Vary the type of follow-ups: include both deepening questions and broadening ones.",
      "Place follow-ups where users naturally look after reading a response — directly below the content.",
    ],
    relatedPatterns: ["Suggestions", "Open Input", "Regenerate"],
  },

  templates: {
    overview:
      "Templates provide users with structured, reusable prompts that include placeholders for customization. They bridge the gap between a blank input and a well-crafted prompt by offering proven patterns that users can adapt to their specific needs. Templates are especially valuable for repeated tasks where the prompt structure stays consistent but the details change each time.",
    variants: [
      {
        title: "Simple templates",
        description:
          "Fixed prompt strings with no variables — users select and send as-is or edit before sending.",
      },
      {
        title: "Variable templates",
        description:
          "Templates with named placeholders that users fill in via form fields before the prompt is assembled and sent.",
      },
      {
        title: "Category-grouped templates",
        description:
          "Templates organized by domain or use case, making it easy to browse and find the right starting point.",
      },
    ],
    useCases: [
      "Content creation workflows with repeatable formats (emails, reports, posts)",
      "Development tools offering common code generation patterns",
      "Customer support systems with standard response frameworks",
      "Marketing teams generating variations of campaign copy",
      "Data analysis workflows with standard query patterns",
    ],
    bestPractices: [
      "Group templates by category or use case so users can scan quickly.",
      "Make variable fields clearly labeled with helpful placeholders.",
      "Allow users to preview the assembled prompt before sending.",
      "Support search and filtering when the template library grows large.",
      "Let users create and save their own templates for recurring tasks.",
    ],
    relatedPatterns: ["Suggestions", "Open Input", "Parameter Control"],
  },

  gallery: {
    overview:
      "Gallery displays a collection of AI-generated or AI-curated items in a browsable grid layout. It's the natural presentation pattern when the output is visual or when users need to compare multiple options at a glance. Galleries support selection, lazy loading, and filtering, making them suitable for both small result sets and large, paginated collections.",
    variants: [
      {
        title: "Image gallery",
        description:
          "A grid of image thumbnails with selection support, commonly used for AI image generation results.",
      },
      {
        title: "Card gallery",
        description:
          "Content cards with titles and descriptions arranged in a grid, useful for text-based generated content.",
      },
      {
        title: "Mixed media gallery",
        description:
          "A grid combining different content types — images, text, and metadata — for heterogeneous result sets.",
      },
    ],
    useCases: [
      "AI image generation tools displaying multiple outputs",
      "Design tools showing template or style options",
      "Content libraries browsing AI-generated articles or posts",
      "Search results presented as visual cards",
      "Portfolio displays of AI-assisted creative work",
    ],
    bestPractices: [
      "Support keyboard navigation and selection for accessibility.",
      "Use consistent card sizes within a gallery for visual rhythm.",
      "Provide clear selection feedback — borders, checkmarks, or overlays.",
      "Implement lazy loading for large galleries to maintain performance.",
      "Offer column count adjustment for different screen sizes and preferences.",
    ],
    relatedPatterns: ["Variations", "Filters", "Suggestions"],
  },

  attachments: {
    overview:
      "Attachments enable users to provide files as context for AI processing. Whether uploading documents for summarization, images for analysis, or datasets for exploration, this pattern handles the full lifecycle from upload through processing to management. It must communicate file status clearly and handle errors gracefully, since file operations are inherently asynchronous and failure-prone.",
    variants: [
      {
        title: "Drop zone",
        description:
          "A drag-and-drop area with a click-to-browse fallback, providing the most intuitive upload experience.",
      },
      {
        title: "Compact list",
        description:
          "A minimal file list showing names and sizes, suitable for space-constrained layouts.",
      },
      {
        title: "Preview cards",
        description:
          "File entries with thumbnail previews for images and icons for other types, giving visual context about attachments.",
      },
    ],
    useCases: [
      "Document analysis tools that process PDFs and text files",
      "Image generation tools accepting reference images",
      "Data analysis platforms ingesting CSVs and spreadsheets",
      "Multi-modal AI assistants that accept mixed file types",
      "Code review tools that accept source files for analysis",
    ],
    bestPractices: [
      "Show upload progress for large files and clear error states for failures.",
      "Validate file types and sizes before upload begins, with helpful error messages.",
      "Display file metadata (name, size, type) so users can verify what they've attached.",
      "Support both drag-and-drop and click-to-browse for accessibility.",
      "Allow removal of individual attachments without affecting others.",
    ],
    relatedPatterns: ["Open Input", "Filters", "Parameter Control"],
  },

  filters: {
    overview:
      "Filters let users narrow AI-generated results or refine input parameters through structured controls like checkboxes, radio buttons, sliders, and dropdowns. They bring precision to broad queries by letting users specify exactly what they want without rewriting their prompt. Filters are especially valuable when AI produces large result sets or when users need to apply domain-specific constraints.",
    variants: [
      {
        title: "Sidebar filters",
        description:
          "A vertical panel of filter groups, common in search and browse interfaces where screen space allows a persistent filter panel.",
      },
      {
        title: "Horizontal filters",
        description:
          "Compact filter controls arranged in a row, suitable for simple filtering needs or toolbar integration.",
      },
      {
        title: "Popover filters",
        description:
          "Filters hidden behind a button that reveals a popover panel, conserving space while providing full filter capabilities on demand.",
      },
    ],
    useCases: [
      "Search result refinement by content type, quality, or date",
      "AI output filtering by confidence score or source",
      "Dataset exploration with multi-dimensional constraints",
      "Content moderation tools filtering by category or severity",
      "Model output comparison filtered by performance metrics",
    ],
    bestPractices: [
      "Show result counts next to filter options so users can gauge the impact of each filter.",
      "Provide a 'Clear all' action for quick filter reset.",
      "Preserve filter state across pagination and sorting changes.",
      "Use the right control type for each filter: checkboxes for multi-select, radios for single-select, sliders for ranges.",
      "Update results immediately as filters change rather than requiring a separate 'Apply' action.",
    ],
    relatedPatterns: ["Gallery", "Parameter Control", "Suggestions"],
  },

  "action-plan": {
    overview:
      "Action Plan makes the AI's intended steps visible and controllable before and during execution. Rather than letting the AI act autonomously, it presents a structured list of planned actions that users can review, approve, modify, or reject. This pattern is essential for agentic workflows where the AI performs multi-step tasks with real-world side effects — file modifications, API calls, data transformations — that users need to understand and authorize.",
    variants: [
      {
        title: "Pre-execution plan",
        description:
          "A list of proposed steps shown before any action begins, requiring explicit user approval to proceed.",
      },
      {
        title: "Live execution tracker",
        description:
          "A real-time view of steps as they execute, with status indicators showing progress, completion, and failures.",
      },
      {
        title: "Editable plan",
        description:
          "An interactive plan where users can reorder, remove, or modify steps before or during execution.",
      },
    ],
    useCases: [
      "AI coding agents that modify multiple files in a project",
      "Data pipeline tools that transform and move data across systems",
      "Automated workflow builders that chain multiple AI operations",
      "DevOps tools that plan and execute infrastructure changes",
      "Research assistants that gather and synthesize from multiple sources",
    ],
    bestPractices: [
      "Always show the plan before executing — users should review and approve before any side effects occur.",
      "Use clear status indicators for each step: pending, in-progress, completed, failed, skipped.",
      "Show estimated duration or cost per step when available.",
      "Allow users to pause, cancel, or roll back execution at any point.",
      "Surface the tools or APIs each step will use so users can assess risk.",
    ],
    relatedPatterns: ["Stream of Thought", "Cost Estimate", "Consent"],
  },

  caveat: {
    overview:
      "Caveats are contextual warnings and disclaimers that set appropriate expectations for AI-generated content. They acknowledge the inherent limitations of AI systems — potential inaccuracies, biases, or knowledge cutoffs — and empower users to approach outputs with informed skepticism. Unlike generic legal disclaimers, well-designed caveats are specific, timely, and proportional to the risk level of the content.",
    variants: [
      {
        title: "Banner caveat",
        description:
          "A prominent alert displayed above or below AI output, suitable for important warnings that apply to the entire response.",
      },
      {
        title: "Inline caveat",
        description:
          "A subtle text annotation within the content flow, appropriate for low-severity notes that shouldn't interrupt reading.",
      },
      {
        title: "Tooltip caveat",
        description:
          "A hover-triggered explanation attached to specific claims or data points, providing context on demand.",
      },
    ],
    useCases: [
      "Medical or legal AI tools where accuracy is critical",
      "Financial analysis tools with data freshness concerns",
      "Creative AI tools where outputs may contain unintended biases",
      "Research assistants working with potentially outdated information",
      "Any AI tool where outputs could be mistaken for authoritative facts",
    ],
    bestPractices: [
      "Match caveat severity to actual risk — don't cry wolf with warnings on low-stakes content.",
      "Be specific about what might be wrong rather than using generic 'AI may make mistakes' disclaimers.",
      "Place caveats near the content they apply to, not buried in footers or separate pages.",
      "Make caveats dismissible for repeat users who have acknowledged the limitations.",
      "Include a 'Learn more' link for users who want to understand the specific limitation.",
    ],
    relatedPatterns: ["Disclosure", "Citation", "Consent"],
  },

  consent: {
    overview:
      "Consent collects explicit user permission before AI systems process their data. As AI capabilities expand — analyzing personal documents, learning from conversations, sharing usage patterns — users need clear, granular control over what they're agreeing to. This pattern goes beyond a single 'I agree' checkbox by presenting each data processing activity separately, distinguishing required from optional consent, and making the implications transparent.",
    variants: [
      {
        title: "Inline consent",
        description:
          "Consent checkboxes embedded directly in the interface, shown at the point where data processing will occur.",
      },
      {
        title: "Modal consent",
        description:
          "A dedicated overlay that blocks interaction until the user has reviewed and responded to consent items.",
      },
      {
        title: "Banner consent",
        description:
          "A persistent bar at the top or bottom of the interface summarizing consent requirements with a link to details.",
      },
    ],
    useCases: [
      "First-run setup when AI features require data access",
      "Enabling conversation history storage or learning from user data",
      "Sharing anonymized usage data for model improvement",
      "Processing sensitive documents like medical records or financial data",
      "Activating AI features that access third-party integrations",
    ],
    bestPractices: [
      "Separate required consent (necessary for functionality) from optional consent (nice-to-have features).",
      "Use plain language that explains what will happen with the user's data, not legal jargon.",
      "Allow users to change their consent preferences at any time, not just during onboarding.",
      "Visually distinguish required items so users understand what's mandatory vs. optional.",
      "Never pre-check optional consent items — informed consent must be an active choice.",
    ],
    relatedPatterns: ["Disclosure", "Caveat", "Action Plan"],
  },

  "auto-fill": {
    overview:
      "Auto-fill accelerates prompt composition by suggesting completions as the user types. Drawing from recent queries, popular prompts, or AI-powered predictions, it reduces the keystrokes needed to express intent and helps users discover effective prompt patterns they might not have thought of. The key challenge is balancing helpfulness with unobtrusiveness — suggestions should appear quickly and disappear cleanly without interrupting the user's flow.",
    variants: [
      {
        title: "Dropdown suggestions",
        description:
          "A list of completion options that appears below the input field, filtered in real time as the user types.",
      },
      {
        title: "Inline ghost text",
        description:
          "Semi-transparent text that extends the cursor position, accepted with Tab or dismissed by continuing to type.",
      },
      {
        title: "Categorized suggestions",
        description:
          "Completions grouped by source (recent, popular, AI-predicted) with labels indicating provenance.",
      },
    ],
    useCases: [
      "Search interfaces where users benefit from query suggestions",
      "Chat interfaces that accelerate common prompt patterns",
      "Code editors providing AI-powered line completions",
      "Form fields that auto-populate based on context or history",
      "Command palettes that suggest actions matching partial input",
    ],
    bestPractices: [
      "Show suggestions after a short debounce (150-300ms) to avoid flickering during fast typing.",
      "Highlight the matching portion of each suggestion so users can see why it was offered.",
      "Support keyboard navigation (arrow keys, Enter to select, Escape to dismiss).",
      "Limit visible suggestions to 4-6 to keep the dropdown scannable.",
      "Indicate the source of each suggestion (history, popular, AI-generated) for transparency.",
    ],
    relatedPatterns: ["Open Input", "Suggestions", "Follow Up"],
  },

  summary: {
    overview:
      "Summary condenses longer content into a brief, digestible overview using AI. Whether summarizing a document, a conversation thread, or a research paper, this pattern presents the essential information in a compact format while preserving access to the full content. It's a core AI capability that saves users time and helps them decide whether deeper engagement with the source material is worthwhile.",
    variants: [
      {
        title: "Card summary",
        description:
          "A self-contained card with the summary text, metadata about compression ratio, and action buttons for regeneration or copying.",
      },
      {
        title: "Inline summary",
        description:
          "A brief summary rendered directly in the content flow, suitable for previews or hover states.",
      },
      {
        title: "Collapsible summary",
        description:
          "A summary that starts collapsed, showing a preview, and expands to reveal the full summarized text.",
      },
    ],
    useCases: [
      "Document processing tools that extract key points from long texts",
      "Email clients summarizing long threads",
      "Research tools condensing academic papers",
      "Meeting note tools that summarize transcripts",
      "News aggregators providing article summaries",
    ],
    bestPractices: [
      "Show the compression ratio (original vs. summary length) so users understand how much was condensed.",
      "Provide a way to regenerate the summary with different parameters (shorter, more detailed, different focus).",
      "Include a copy button for easy sharing of the summarized content.",
      "Offer access to the full original content for users who need more detail.",
      "Show a loading state with clear feedback during summary generation.",
    ],
    relatedPatterns: ["Regenerate", "Disclosure", "Citation"],
  },

  "initial-cta": {
    overview:
      "Initial CTA (Call-to-Action) is the first thing users see when they encounter an AI-powered feature for the first time. It introduces the system's capabilities, sets expectations, and provides clear entry points for getting started. A well-designed initial CTA reduces the intimidation of a blank state and guides users toward their first successful interaction with the AI.",
    variants: [
      {
        title: "Card-based CTA",
        description:
          "Action cards arranged in a grid, each representing a distinct capability or use case the AI can help with.",
      },
      {
        title: "Hero CTA",
        description:
          "A single prominent call-to-action with a headline and description, focused on the primary use case.",
      },
      {
        title: "Minimal CTA",
        description:
          "A simple text prompt with a subtle action button, suitable for interfaces where the AI feature is secondary.",
      },
    ],
    useCases: [
      "First-run experiences for AI assistants and chatbots",
      "Empty states in AI-powered dashboards and tools",
      "Onboarding flows that introduce AI capabilities gradually",
      "Feature discovery moments when new AI features are launched",
      "Landing pages for AI-powered products",
    ],
    bestPractices: [
      "Limit initial actions to 3-5 options to prevent overwhelming new users.",
      "Use action-oriented labels that describe what will happen, not just feature names.",
      "Include brief descriptions that set expectations about what the AI can and cannot do.",
      "Make the primary action visually prominent while keeping secondary options accessible.",
      "Consider showing the CTA only for new or returning users who haven't interacted recently.",
    ],
    relatedPatterns: ["Suggestions", "Open Input", "Nudges"],
  },

  nudges: {
    overview:
      "Nudges are contextual, non-intrusive prompts that guide users toward productive behaviors or inform them of relevant opportunities. Unlike notifications that demand attention, nudges are gentle suggestions that users can acknowledge or dismiss without breaking their flow. They're particularly effective for feature discovery, usage optimization, and re-engagement.",
    variants: [
      {
        title: "Inline nudge",
        description:
          "A subtle message embedded within the content flow, appearing near the relevant context without overlaying other elements.",
      },
      {
        title: "Toast nudge",
        description:
          "A temporary notification that slides in from the edge of the screen, auto-dismissing after a set duration.",
      },
      {
        title: "Banner nudge",
        description:
          "A persistent or semi-persistent bar at the top or bottom of the interface, used for important but non-blocking information.",
      },
    ],
    useCases: [
      "Encouraging users to try underutilized AI features",
      "Reminding users of expiring credits or available upgrades",
      "Suggesting prompt improvements based on user behavior",
      "Highlighting new features or capabilities after updates",
      "Providing contextual tips during complex workflows",
    ],
    bestPractices: [
      "Limit nudge frequency to avoid notification fatigue — one at a time, with cooldown periods.",
      "Make nudges dismissible and remember dismissal preferences.",
      "Tie nudges to user context so they feel relevant, not random.",
      "Use progressive disclosure: start with the nudge, offer 'Learn more' for details.",
      "Distinguish nudge types visually — tips, reminders, and suggestions should look different.",
    ],
    relatedPatterns: ["Initial CTA", "Suggestions", "Follow Up"],
  },

  "prompt-details": {
    overview:
      "Prompt Details surfaces metadata and contextual information about a submitted prompt — what was sent, when, to which model, and at what cost. This transparency helps users understand the full context of their interactions, debug unexpected results, and maintain an audit trail. It's especially valuable in professional settings where prompt provenance matters for compliance, collaboration, or iterative refinement.",
    variants: [
      {
        title: "Card view",
        description:
          "A structured card showing the prompt text alongside metadata badges for model, timestamp, token count, and other details.",
      },
      {
        title: "Inline metadata",
        description:
          "Compact metadata displayed directly beneath or beside the prompt, minimizing visual footprint while maintaining transparency.",
      },
      {
        title: "Expandable details",
        description:
          "A collapsed summary that reveals full metadata on click, keeping the default view clean while offering depth on demand.",
      },
    ],
    useCases: [
      "Debugging AI responses by reviewing the exact prompt sent",
      "Auditing prompt history for compliance or quality assurance",
      "Collaborative environments where team members review each other's prompts",
      "Cost tracking by surfacing token counts and model information per prompt",
      "Iterative refinement where users compare prompts across attempts",
    ],
    bestPractices: [
      "Show the exact prompt text as sent, including any system-level modifications.",
      "Include timestamp, model, and token count as standard metadata fields.",
      "Support copying the prompt for reuse or sharing with team members.",
      "Link prompt details to the corresponding response for easy cross-reference.",
      "Allow filtering and searching through prompt history by metadata fields.",
    ],
    relatedPatterns: ["Footprints", "Cost Estimate", "Open Input"],
  },

  randomize: {
    overview:
      "Randomize gives users control over the stochastic element of AI generation. By exposing seed values and providing a 'shuffle' action, it lets users explore the natural variety of model outputs intentionally rather than accidentally. Users who find a result they like can lock the seed for reproducibility, while those seeking inspiration can keep randomizing until something clicks.",
    variants: [
      {
        title: "Shuffle button",
        description:
          "A single button that generates a new random seed and re-runs the generation, prioritizing simplicity and speed.",
      },
      {
        title: "Seed input",
        description:
          "A text field where users can enter or view specific seed values, enabling reproducible results and sharing.",
      },
      {
        title: "Seed with shuffle",
        description:
          "A combined interface with both a visible seed value and a randomize button, balancing exploration with reproducibility.",
      },
    ],
    useCases: [
      "Image generation tools where users explore visual variations",
      "Creative writing assistants offering different story directions",
      "Design tools generating random color palettes or layouts",
      "Game content generators creating procedural content",
      "Music generation tools exploring different melodic variations",
    ],
    bestPractices: [
      "Always show the current seed value so users can save and share reproducible results.",
      "Make the randomize action visually prominent and satisfying — it's a discovery tool.",
      "Support seed sharing via copy/paste so users can reproduce results across sessions.",
      "Remember the last few seeds so users can go back to a previous variation.",
      "Combine with parameter controls to let users randomize within constrained bounds.",
    ],
    relatedPatterns: ["Variations", "Regenerate", "Parameter Control"],
  },

  expand: {
    overview:
      "Expand allows users to request additional detail on AI-generated content. When an initial response is too brief or high-level, users can ask the AI to elaborate on specific sections without rewriting their prompt. This pattern supports progressive disclosure of AI content — starting concise and adding depth on demand — which respects both quick-scanning users and those seeking comprehensive information.",
    variants: [
      {
        title: "Accordion expand",
        description:
          "Content sections that collapse and expand, letting users reveal additional detail for specific parts of the response.",
      },
      {
        title: "Inline expand",
        description:
          "An 'Expand' button that triggers AI generation of additional content, appended directly below the original text.",
      },
      {
        title: "Detail panel",
        description:
          "A side panel that shows expanded content alongside the original, preserving context while adding depth.",
      },
    ],
    useCases: [
      "Research summaries where users want to drill into specific findings",
      "Technical documentation that offers different levels of detail",
      "News digests where users can expand stories of interest",
      "Code explanations that start with an overview and expand to line-by-line detail",
      "Product descriptions that offer progressive detail for interested buyers",
    ],
    bestPractices: [
      "Clearly indicate which sections can be expanded with visual affordances.",
      "Show a loading state while additional content is being generated.",
      "Preserve the original content — expansion should add, not replace.",
      "Allow collapsing back to the original view after expansion.",
      "Consider pre-generating expanded content for commonly expanded sections.",
    ],
    relatedPatterns: ["Summary", "Regenerate", "Stream of Thought"],
  },

  transform: {
    overview:
      "Transform enables users to convert AI-generated content from one format, tone, or style to another without starting from scratch. Whether making text more formal, translating to another language, converting prose to bullet points, or changing the target audience, this pattern treats the existing output as raw material for rapid iteration. It's a powerful alternative to re-prompting when the content is good but the presentation needs adjustment.",
    variants: [
      {
        title: "Button bar",
        description:
          "A row of transformation buttons (e.g. 'Make formal', 'Shorten', 'Simplify') displayed alongside the content.",
      },
      {
        title: "Dropdown menu",
        description:
          "A dropdown offering a larger set of transformation options, suitable when many transforms are available.",
      },
      {
        title: "Custom prompt",
        description:
          "A text input where users describe the desired transformation in their own words for maximum flexibility.",
      },
    ],
    useCases: [
      "Tone adjustment for professional communication (formal, casual, friendly)",
      "Content reformatting (prose to bullets, email to memo, long to short)",
      "Language translation of generated content",
      "Audience adaptation (technical to non-technical, expert to beginner)",
      "Style transfer for creative content (literary styles, brand voices)",
    ],
    bestPractices: [
      "Show a preview of the transformation before committing to the change.",
      "Preserve the original content so users can revert or compare.",
      "Group related transforms together (tone transforms, format transforms).",
      "Support chaining multiple transforms in sequence.",
      "Show a loading indicator during transformation to set expectations.",
    ],
    relatedPatterns: ["Regenerate", "Variations", "Inline Action"],
  },

  "inline-action": {
    overview:
      "Inline Actions are contextual action buttons embedded directly alongside AI-generated content. They provide quick access to common operations — copy, edit, delete, share, bookmark — without requiring users to navigate to a separate menu or toolbar. By placing actions where users are already looking, they reduce interaction cost and support rapid iteration on AI outputs.",
    variants: [
      {
        title: "Toolbar",
        description:
          "A horizontal row of icon buttons displayed above or below the content, providing a consistent set of actions.",
      },
      {
        title: "Hover actions",
        description:
          "Actions that appear on mouse hover, keeping the interface clean by default and revealing options on demand.",
      },
      {
        title: "Floating menu",
        description:
          "A compact floating button that expands into a radial or dropdown menu of actions when clicked.",
      },
    ],
    useCases: [
      "Copy and share buttons on AI-generated text responses",
      "Edit and regenerate actions on individual response sections",
      "Feedback actions (thumbs up/down) for response quality",
      "Bookmark and save actions for useful AI outputs",
      "Quick-format actions on generated content blocks",
    ],
    bestPractices: [
      "Limit visible actions to 3-5 most common operations; overflow into a menu.",
      "Use consistent iconography with tooltips for clarity.",
      "Group actions by type: constructive (copy, save), destructive (delete), and navigational (share, link).",
      "Visually distinguish destructive actions (delete, discard) from safe ones.",
      "Ensure keyboard accessibility for all inline actions.",
    ],
    relatedPatterns: ["Transform", "Regenerate", "Expand"],
  },

  "chained-action": {
    overview:
      "Chained Actions represent multi-step workflows where each step depends on the completion of the previous one. This pattern visualizes the pipeline of operations — data fetching, analysis, generation, notification — and lets users monitor progress, inspect intermediate results, and intervene when needed. It's essential for complex AI workflows that go beyond single-prompt interactions.",
    variants: [
      {
        title: "Linear pipeline",
        description:
          "A sequential list of steps connected by arrows or lines, showing the progression from input to output.",
      },
      {
        title: "Branching pipeline",
        description:
          "A workflow with conditional branches, showing different paths the execution might take based on intermediate results.",
      },
      {
        title: "Compact stepper",
        description:
          "A minimal step indicator that shows progress through the chain without displaying full details of each step.",
      },
    ],
    useCases: [
      "Data pipelines that fetch, transform, and load data using AI",
      "Content workflows that draft, review, edit, and publish in sequence",
      "Research processes that search, analyze, synthesize, and summarize",
      "Automated testing pipelines that generate, execute, and report results",
      "Multi-model workflows that route tasks to different AI models",
    ],
    bestPractices: [
      "Show the status of each step clearly: idle, active, completed, or failed.",
      "Display intermediate results so users can verify correctness at each stage.",
      "Allow users to pause, retry, or skip individual steps in the chain.",
      "Estimate and display expected duration for the full pipeline.",
      "Surface errors clearly with options to retry the failed step or restart the chain.",
    ],
    relatedPatterns: ["Action Plan", "Stream of Thought", "Cost Estimate"],
  },

  "data-ownership": {
    overview:
      "Data Ownership gives users visibility into and control over the data that AI systems collect, store, and process on their behalf. It presents a clear inventory of data types, their retention periods, and the actions users can take — export, delete, or modify retention. This pattern is critical for building trust and meeting privacy regulations like GDPR, which require transparent data management and the right to erasure.",
    variants: [
      {
        title: "Data inventory list",
        description:
          "A table or list of data categories with retention info and action buttons for each, providing a comprehensive overview.",
      },
      {
        title: "Dashboard cards",
        description:
          "Visual cards for each data category with storage metrics, retention timelines, and prominent action buttons.",
      },
      {
        title: "Settings panel",
        description:
          "A privacy settings section where data management controls are grouped alongside other privacy preferences.",
      },
    ],
    useCases: [
      "AI assistants that store conversation history and user preferences",
      "Enterprise tools managing team-level AI interaction data",
      "Applications subject to GDPR or other data privacy regulations",
      "Multi-tenant platforms where data isolation must be transparent",
      "Tools that process sensitive documents and need clear data lifecycle management",
    ],
    bestPractices: [
      "List all data types collected with clear descriptions of what each contains.",
      "Show retention periods and explain what happens when data expires.",
      "Provide both individual item deletion and bulk 'delete all' options.",
      "Include data export functionality so users can take their data elsewhere.",
      "Confirm destructive actions and explain their consequences before proceeding.",
    ],
    relatedPatterns: ["Consent", "Footprints", "Disclosure"],
  },

  footprints: {
    overview:
      "Footprints provide a chronological record of AI interactions — what was asked, what was generated, which model was used, and when. This audit trail serves multiple purposes: users can revisit past conversations, learn from previous prompts, track their usage patterns, and maintain accountability. For teams, footprints enable collaboration by making AI usage transparent across members.",
    variants: [
      {
        title: "Timeline view",
        description:
          "A chronological list of interactions with timestamps, showing the flow of AI usage over time.",
      },
      {
        title: "Table view",
        description:
          "A structured table with sortable columns for action, model, timestamp, and token usage, suited for power users.",
      },
      {
        title: "Compact feed",
        description:
          "A condensed activity feed showing recent interactions with expandable details, optimized for sidebar placement.",
      },
    ],
    useCases: [
      "Personal AI usage tracking and prompt history",
      "Team audit trails for compliance and accountability",
      "Debugging by reviewing the sequence of AI interactions",
      "Usage analytics for optimizing AI costs and patterns",
      "Onboarding new team members by sharing interaction history",
    ],
    bestPractices: [
      "Show timestamps in a human-friendly format (relative for recent, absolute for older).",
      "Include input and output previews so users can scan without opening each entry.",
      "Support filtering by model, date range, and action type.",
      "Provide a 'Clear history' option with appropriate confirmation.",
      "Allow clicking into any entry to view the full interaction details.",
    ],
    relatedPatterns: ["Prompt Details", "Data Ownership", "Cost Estimate"],
  },
};
