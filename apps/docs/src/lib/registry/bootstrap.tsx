"use client";

import * as React from "react";

import {
  ActionPlan as BsActionPlan,
  Attachments as BsAttachments,
  AutoFill as BsAutoFill,
  Avatar as BsAvatar,
  Branches as BsBranches,
  Caveat as BsCaveat,
  ChainedAction as BsChainedAction,
  CitationsList as BsCitationsList,
  Color as BsColor,
  Connectors as BsConnectors,
  Consent as BsConsent,
  Controls as BsControls,
  CostEstimate as BsCostEstimate,
  DataOwnership as BsDataOwnership,
  Describe as BsDescribe,
  Disclosure as BsDisclosure,
  DraftMode as BsDraftMode,
  Expand as BsExpand,
  Filters as BsFilters,
  FollowUp as BsFollowUp,
  Footprints as BsFootprints,
  Gallery as BsGallery,
  IncognitoMode as BsIncognitoMode,
  InitialCta as BsInitialCta,
  InlineAction as BsInlineAction,
  Inpainting as BsInpainting,
  Madlibs as BsMadlibs,
  Memory as BsMemory,
  ModelManagement as BsModelManagement,
  Modes as BsModes,
  Nudges as BsNudges,
  OpenInput as BsOpenInput,
  ParameterControl as BsParameterControl,
  PresetStyles as BsPresetStyles,
  PromptDetails as BsPromptDetails,
  PromptEnhancer as BsPromptEnhancer,
  Randomize as BsRandomize,
  References as BsReferences,
  Regenerate as BsRegenerate,
  Restructure as BsRestructure,
  Restyle as BsRestyle,
  SampleResponse as BsSampleResponse,
  SavedStyles as BsSavedStyles,
  SharedVision as BsSharedVision,
  StreamOfThought as BsStreamOfThought,
  Suggestions as BsSuggestions,
  Summary as BsSummary,
  Synthesis as BsSynthesis,
  Templates as BsTemplates,
  Transform as BsTransform,
  Variations as BsVariations,
  Verification as BsVerification,
  VoiceAndTone as BsVoiceAndTone,
  Watermark as BsWatermark,
} from "@patternbase/bootstrap";

import {
  demoActionPlanSteps,
  demoAttachments,
  demoAutoFillSuggestions,
  demoAvatar,
  demoBranches,
  demoChainedSteps,
  demoCitations,
  demoColorOptions,
  demoConnectors,
  demoConsentItems,
  demoControls,
  demoCostBreakdown,
  demoDataOwnershipItems,
  demoDescribeDetails,
  demoDescribeInferredPrompt,
  demoDescribeOutput,
  demoDrafts,
  demoFilterGroups,
  demoFollowUps,
  demoFootprintEntries,
  demoGalleryItems,
  demoIncognitoState,
  demoInitialCtaActions,
  demoInlineActions,
  demoInpaintingContent,
  demoInpaintingRegions,
  demoMadlibsTemplate,
  demoMadlibsVariables,
  demoMemories,
  demoModels,
  demoModes,
  demoNudges,
  demoParameters,
  demoPresetStyles,
  demoPromptDetails,
  demoPromptEnhancerEnhanced,
  demoPromptEnhancerOriginal,
  demoReferences,
  demoRestructureContent,
  demoRestructureOptions,
  demoRestyleContent,
  demoRestyleOptions,
  demoSampleResponsePrompt,
  demoSampleResponseText,
  demoSavedStyles,
  demoSharedVisionContext,
  demoSharedVisionGoals,
  demoSharedVisionParticipants,
  demoSteps,
  demoSuggestions,
  demoSummaryContent,
  demoSynthesisInsights,
  demoSynthesisSources,
  demoTemplates,
  demoTransformContent,
  demoTransformOptions,
  demoVariations,
  demoVerificationClaims,
  demoVoiceToneAxes,
  demoWatermark,
} from "@/data/demo-data";

const noop = () => {
  /* no-op for demo callbacks */
};

export const bootstrapRegistry: Record<string, React.ComponentType> = {
  "open-input": () => (
    <BsOpenInput
      placeholder="Ask me anything..."
      onSubmit={noop}
      suggestions={[
        "Write a poem",
        "Summarize this article",
        "Translate to French",
      ]}
    />
  ),

  suggestions: () => (
    <BsSuggestions
      suggestions={demoSuggestions}
      onSelect={noop}
      variant="card"
      columns={2}
    />
  ),

  "parameter-control": () => (
    <BsParameterControl
      parameters={demoParameters}
      onChange={noop}
      title="Generation Settings"
    />
  ),

  "preset-styles": () => (
    <BsPresetStyles
      presets={demoPresetStyles}
      selectedPresetId="blog-clean"
      onApplyPreset={noop}
      title="Style Presets"
      variant="cards"
    />
  ),

  "prompt-enhancer": () => (
    <BsPromptEnhancer
      prompt={demoPromptEnhancerOriginal}
      enhancedPrompt={demoPromptEnhancerEnhanced}
      onEnhance={noop}
      onApply={noop}
      onEnhancedPromptChange={noop}
      variant="split"
      showDiff
    />
  ),

  "stream-of-thought": () => (
    <BsStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
  ),

  citation: () => (
    <BsCitationsList citations={demoCitations} title="Sources" maxVisible={3} />
  ),

  regenerate: () => (
    <BsRegenerate
      onRegenerate={noop}
      variant="dropdown"
      options={[
        { label: "More creative", onSelect: noop },
        { label: "More concise", onSelect: noop },
        { label: "Different tone", onSelect: noop },
      ]}
    />
  ),

  disclosure: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <BsDisclosure variant="badge" type="ai-generated" model="GPT-4" />
      <BsDisclosure
        variant="banner"
        type="ai-assisted"
        model="Claude"
        timestamp={new Date()}
      />
      <p>
        This content was <BsDisclosure variant="inline" type="ai-suggested" />
      </p>
    </div>
  ),

  variations: () => (
    <BsVariations
      variations={demoVariations}
      selectedId="1"
      onSelect={noop}
      layout="grid"
      columns={3}
    />
  ),

  "cost-estimate": () => (
    <BsCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
  ),

  "model-management": () => (
    <BsModelManagement
      models={demoModels}
      selectedModelId="gpt4"
      onSelectModel={noop}
      showDetails
      groupByProvider
    />
  ),

  modes: () => (
    <BsModes
      modes={demoModes}
      selectedModeId="balanced"
      onModeChange={noop}
      title="Assistant Mode"
      variant="segmented"
    />
  ),

  "follow-up": () => (
    <BsFollowUp
      followUps={demoFollowUps}
      onSelect={noop}
      variant="chip"
      title="Suggested follow-ups"
    />
  ),

  templates: () => (
    <BsTemplates
      templates={demoTemplates}
      onSelect={noop}
      layout="grid"
      columns={2}
      searchable
    />
  ),

  gallery: () => (
    <BsGallery
      items={demoGalleryItems}
      onSelect={noop}
      columns={3}
      selectable
    />
  ),

  attachments: () => (
    <BsAttachments
      attachments={demoAttachments}
      onAdd={noop}
      onRemove={noop}
      maxFiles={5}
    />
  ),

  filters: () => (
    <BsFilters
      groups={demoFilterGroups}
      values={{ type: ["text"], quality: "high", length: 2000 }}
      onChange={noop}
      onClear={noop}
      title="Filter Results"
    />
  ),

  "action-plan": () => (
    <BsActionPlan
      steps={demoActionPlanSteps}
      title="Execution Plan"
      onApprove={noop}
      onReject={noop}
      showEstimates
    />
  ),

  branches: () => (
    <BsBranches
      branches={demoBranches}
      activeBranchId="perf-path"
      onSelectBranch={noop}
      onCreateBranch={noop}
      title="Conversation Branches"
      variant="tree"
    />
  ),

  controls: () => (
    <BsControls
      controls={demoControls}
      onToggleControl={noop}
      title="AI Capability Controls"
      variant="list"
      showStatus
    />
  ),

  "draft-mode": () => (
    <BsDraftMode
      drafts={demoDrafts}
      activeDraftId="draft-4"
      onSelectDraft={noop}
      onRevertToDraft={noop}
      onBranchFromDraft={noop}
      title="Draft History"
      variant="timeline"
    />
  ),

  memory: () => (
    <BsMemory
      memories={demoMemories}
      onEditMemory={noop}
      onDeleteMemory={noop}
      title="Stored Memory"
      variant="list"
      showTimestamps
    />
  ),

  references: () => (
    <BsReferences
      references={demoReferences}
      onSelectReference={noop}
      onRemoveReference={noop}
      title="Session References"
      variant="list"
      showRelevance
    />
  ),

  "sample-response": () => (
    <BsSampleResponse
      prompt={demoSampleResponsePrompt}
      sample={demoSampleResponseText}
      onGenerateSample={noop}
      onRegenerateSample={noop}
      onAcceptSample={noop}
      title="Preview Before Full Run"
      variant="card"
    />
  ),

  "shared-vision": () => (
    <BsSharedVision
      participants={demoSharedVisionParticipants}
      goals={demoSharedVisionGoals}
      context={demoSharedVisionContext}
      onAddGoal={noop}
      onSelectParticipant={noop}
      title="Team Alignment Board"
      variant="board"
    />
  ),

  verification: () => (
    <BsVerification
      claims={demoVerificationClaims}
      onRunVerification={noop}
      onSelectClaim={noop}
      title="Claim Verification"
      showSources
      variant="list"
    />
  ),

  caveat: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <BsCaveat
        message="AI-generated content may contain inaccuracies. Please verify important information."
        variant="banner"
        severity="warning"
        title="AI Disclaimer"
        dismissible
      />
      <p>
        This response was generated by AI.{" "}
        <BsCaveat
          message="Results may vary."
          variant="inline"
          severity="info"
        />
      </p>
    </div>
  ),

  consent: () => (
    <BsConsent
      items={demoConsentItems}
      onAccept={noop}
      onDecline={noop}
      title="Data Processing Consent"
      description="Please review and accept the following before proceeding."
    />
  ),

  "incognito-mode": () => (
    <BsIncognitoMode
      enabled={demoIncognitoState.enabled}
      onToggle={noop}
      onEndSession={noop}
      title="Private Session"
      description={demoIncognitoState.description}
      retentionNotice={demoIncognitoState.retentionNotice}
      variant="card"
    />
  ),

  avatar: () => (
    <BsAvatar
      name={demoAvatar.name}
      persona={demoAvatar.persona}
      badgeLabel={demoAvatar.badgeLabel}
      status={demoAvatar.status}
      size="medium"
      variant="card"
      onSelect={noop}
    />
  ),

  color: () => (
    <BsColor
      options={demoColorOptions}
      selectedColorId="c1"
      onSelectColor={noop}
      title="AI Identity Palette"
      showLabels
      variant="card"
    />
  ),

  watermark: () => (
    <BsWatermark
      label={demoWatermark.label}
      visibility={demoWatermark.visibility}
      confidence={demoWatermark.confidence}
      algorithm={demoWatermark.algorithm}
      onVerify={noop}
      variant="banner"
    />
  ),

  connectors: () => (
    <BsConnectors
      sources={demoConnectors}
      onConnect={noop}
      onDisconnect={noop}
      onSync={noop}
      title="Connected Sources"
    />
  ),

  "auto-fill": () => (
    <BsAutoFill
      suggestions={demoAutoFillSuggestions}
      onSelect={noop}
      placeholder="How do I implement..."
      maxSuggestions={5}
    />
  ),

  summary: () => (
    <BsSummary
      content={demoSummaryContent}
      title="Research Summary"
      originalLength={2450}
      summaryLength={420}
      onRegenerate={noop}
      onCopy={noop}
      variant="card"
    />
  ),

  "initial-cta": () => (
    <BsInitialCta
      title="Welcome to AI Assistant"
      subtitle="What would you like to do today?"
      actions={demoInitialCtaActions}
      onAction={noop}
      variant="cards"
    />
  ),

  nudges: () => (
    <BsNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
  ),

  "prompt-details": () => (
    <BsPromptDetails
      prompt="Explain the difference between React Server Components and Client Components"
      details={demoPromptDetails}
      timestamp={new Date()}
      model="GPT-4 Turbo"
      tokenCount={48}
      variant="card"
    />
  ),

  randomize: () => (
    <BsRandomize
      onRandomize={noop}
      showSeed
      currentSeed="42"
      onSeedChange={noop}
    />
  ),

  expand: () => (
    <BsExpand
      content="React Server Components allow you to render components on the server..."
      onExpand={noop}
      title="Server Components Overview"
      variant="accordion"
    />
  ),

  transform: () => (
    <BsTransform
      content={demoTransformContent}
      options={demoTransformOptions}
      onTransform={noop}
      title="Content Transform"
      variant="buttons"
    />
  ),

  "inline-action": () => (
    <BsInlineAction
      actions={demoInlineActions}
      onAction={noop}
      variant="toolbar"
    />
  ),

  "chained-action": () => (
    <BsChainedAction
      steps={demoChainedSteps}
      onExecute={noop}
      title="Data Pipeline"
    />
  ),

  "data-ownership": () => (
    <BsDataOwnership
      items={demoDataOwnershipItems}
      onDelete={noop}
      onExport={noop}
      onDeleteAll={noop}
      title="Your Data"
    />
  ),

  footprints: () => (
    <BsFootprints
      entries={demoFootprintEntries}
      onEntryClick={noop}
      onClear={noop}
      title="Activity History"
      showTimestamps
    />
  ),

  describe: () => (
    <BsDescribe
      output={demoDescribeOutput}
      details={demoDescribeDetails}
      inferredPrompt={demoDescribeInferredPrompt}
      model="Midjourney v6"
      seed="12345"
      onReuse={noop}
      onCopy={noop}
    />
  ),

  inpainting: () => (
    <BsInpainting
      content={demoInpaintingContent}
      regions={demoInpaintingRegions}
      onRegionSelect={noop}
      onApply={noop}
      selectedRegionId="body"
      onPromptChange={noop}
      title="Edit Content Region"
    />
  ),

  madlibs: () => (
    <BsMadlibs
      template={demoMadlibsTemplate}
      variables={demoMadlibsVariables}
      onChange={noop}
      onSubmit={noop}
      title="Blog Post Generator"
      description="Fill in the fields below to generate a customized blog post."
      showPreview
    />
  ),

  restructure: () => (
    <BsRestructure
      content={demoRestructureContent}
      options={demoRestructureOptions}
      onRestructure={noop}
      title="Restructure Content"
    />
  ),

  restyle: () => (
    <BsRestyle
      content={demoRestyleContent}
      options={demoRestyleOptions}
      onRestyle={noop}
      title="Restyle Content"
    />
  ),

  "saved-styles": () => (
    <BsSavedStyles
      styles={demoSavedStyles}
      selectedStyleId="style-customer"
      onSelectStyle={noop}
      onSaveStyle={noop}
      onDeleteStyle={noop}
      title="My Saved Styles"
      variant="list"
    />
  ),

  "voice-and-tone": () => (
    <BsVoiceAndTone
      axes={demoVoiceToneAxes}
      onChange={noop}
      title="Voice and Tone"
      showValues
      variant="sliders"
    />
  ),

  synthesis: () => (
    <BsSynthesis
      sources={demoSynthesisSources}
      insights={demoSynthesisInsights}
      onSourceClick={noop}
      onRegenerate={noop}
      title="AI Industry Analysis"
      showSources
      showConfidence
    />
  ),
};
