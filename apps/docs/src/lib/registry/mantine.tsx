"use client";

import * as React from "react";

import {
  ActionPlan as MnActionPlan,
  Attachments as MnAttachments,
  AutoFill as MnAutoFill,
  Avatar as MnAvatar,
  Branches as MnBranches,
  Caveat as MnCaveat,
  ChainedAction as MnChainedAction,
  CitationsList as MnCitationsList,
  Color as MnColor,
  Connectors as MnConnectors,
  Consent as MnConsent,
  Controls as MnControls,
  CostEstimate as MnCostEstimate,
  DataOwnership as MnDataOwnership,
  Describe as MnDescribe,
  Disclosure as MnDisclosure,
  DraftMode as MnDraftMode,
  Expand as MnExpand,
  Filters as MnFilters,
  FollowUp as MnFollowUp,
  Footprints as MnFootprints,
  Gallery as MnGallery,
  IncognitoMode as MnIncognitoMode,
  InitialCta as MnInitialCta,
  InlineAction as MnInlineAction,
  Inpainting as MnInpainting,
  Madlibs as MnMadlibs,
  Memory as MnMemory,
  ModelManagement as MnModelManagement,
  Modes as MnModes,
  Nudges as MnNudges,
  OpenInput as MnOpenInput,
  ParameterControl as MnParameterControl,
  PresetStyles as MnPresetStyles,
  PromptDetails as MnPromptDetails,
  PromptEnhancer as MnPromptEnhancer,
  Randomize as MnRandomize,
  References as MnReferences,
  Regenerate as MnRegenerate,
  Restructure as MnRestructure,
  Restyle as MnRestyle,
  SampleResponse as MnSampleResponse,
  SavedStyles as MnSavedStyles,
  SharedVision as MnSharedVision,
  StreamOfThought as MnStreamOfThought,
  Suggestions as MnSuggestions,
  Summary as MnSummary,
  Synthesis as MnSynthesis,
  Templates as MnTemplates,
  Transform as MnTransform,
  Variations as MnVariations,
  Verification as MnVerification,
  VoiceAndTone as MnVoiceAndTone,
  Watermark as MnWatermark,
} from "@patternbase/mantine";

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

export const mantineRegistry: Record<string, React.ComponentType> = {
  "open-input": () => (
    <MnOpenInput
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
    <MnSuggestions
      suggestions={demoSuggestions}
      onSelect={noop}
      variant="card"
      columns={2}
    />
  ),

  "parameter-control": () => (
    <MnParameterControl
      parameters={demoParameters}
      onChange={noop}
      title="Generation Settings"
    />
  ),

  "preset-styles": () => (
    <MnPresetStyles
      presets={demoPresetStyles}
      selectedPresetId="blog-clean"
      onApplyPreset={noop}
      title="Style Presets"
      variant="cards"
    />
  ),

  "prompt-enhancer": () => (
    <MnPromptEnhancer
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
    <MnStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
  ),

  citation: () => (
    <MnCitationsList citations={demoCitations} title="Sources" maxVisible={3} />
  ),

  regenerate: () => (
    <MnRegenerate
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
      <MnDisclosure variant="badge" type="ai-generated" model="GPT-4" />
      <MnDisclosure
        variant="banner"
        type="ai-assisted"
        model="Claude"
        timestamp={new Date()}
      />
      <p>
        This content was <MnDisclosure variant="inline" type="ai-suggested" />
      </p>
    </div>
  ),

  variations: () => (
    <MnVariations
      variations={demoVariations}
      selectedId="1"
      onSelect={noop}
      layout="grid"
      columns={3}
    />
  ),

  "cost-estimate": () => (
    <MnCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
  ),

  "model-management": () => (
    <MnModelManagement
      models={demoModels}
      selectedModelId="gpt4"
      onSelectModel={noop}
      showDetails
      groupByProvider
    />
  ),

  modes: () => (
    <MnModes
      modes={demoModes}
      selectedModeId="balanced"
      onModeChange={noop}
      title="Assistant Mode"
      variant="segmented"
    />
  ),

  "follow-up": () => (
    <MnFollowUp
      followUps={demoFollowUps}
      onSelect={noop}
      variant="chip"
      title="Suggested follow-ups"
    />
  ),

  templates: () => (
    <MnTemplates
      templates={demoTemplates}
      onSelect={noop}
      layout="grid"
      columns={2}
      searchable
    />
  ),

  gallery: () => (
    <MnGallery
      items={demoGalleryItems}
      onSelect={noop}
      columns={3}
      selectable
    />
  ),

  attachments: () => (
    <MnAttachments
      attachments={demoAttachments}
      onAdd={noop}
      onRemove={noop}
      maxFiles={5}
    />
  ),

  filters: () => (
    <MnFilters
      groups={demoFilterGroups}
      values={{ type: ["text"], quality: "high", length: 2000 }}
      onChange={noop}
      onClear={noop}
      title="Filter Results"
    />
  ),

  "action-plan": () => (
    <MnActionPlan
      steps={demoActionPlanSteps}
      title="Execution Plan"
      onApprove={noop}
      onReject={noop}
      showEstimates
    />
  ),

  branches: () => (
    <MnBranches
      branches={demoBranches}
      activeBranchId="perf-path"
      onSelectBranch={noop}
      onCreateBranch={noop}
      title="Conversation Branches"
      variant="tree"
    />
  ),

  controls: () => (
    <MnControls
      controls={demoControls}
      onToggleControl={noop}
      title="AI Capability Controls"
      variant="list"
      showStatus
    />
  ),

  "draft-mode": () => (
    <MnDraftMode
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
    <MnMemory
      memories={demoMemories}
      onEditMemory={noop}
      onDeleteMemory={noop}
      title="Stored Memory"
      variant="list"
      showTimestamps
    />
  ),

  references: () => (
    <MnReferences
      references={demoReferences}
      onSelectReference={noop}
      onRemoveReference={noop}
      title="Session References"
      variant="list"
      showRelevance
    />
  ),

  "sample-response": () => (
    <MnSampleResponse
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
    <MnSharedVision
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
    <MnVerification
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
      <MnCaveat
        message="AI-generated content may contain inaccuracies. Please verify important information."
        variant="banner"
        severity="warning"
        title="AI Disclaimer"
        dismissible
      />
      <p>
        This response was generated by AI.{" "}
        <MnCaveat
          message="Results may vary."
          variant="inline"
          severity="info"
        />
      </p>
    </div>
  ),

  consent: () => (
    <MnConsent
      items={demoConsentItems}
      onAccept={noop}
      onDecline={noop}
      title="Data Processing Consent"
      description="Please review and accept the following before proceeding."
    />
  ),

  "incognito-mode": () => (
    <MnIncognitoMode
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
    <MnAvatar
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
    <MnColor
      options={demoColorOptions}
      selectedColorId="c1"
      onSelectColor={noop}
      title="AI Identity Palette"
      showLabels
      variant="card"
    />
  ),

  watermark: () => (
    <MnWatermark
      label={demoWatermark.label}
      visibility={demoWatermark.visibility}
      confidence={demoWatermark.confidence}
      algorithm={demoWatermark.algorithm}
      onVerify={noop}
      variant="banner"
    />
  ),

  connectors: () => (
    <MnConnectors
      sources={demoConnectors}
      onConnect={noop}
      onDisconnect={noop}
      onSync={noop}
      title="Connected Sources"
    />
  ),

  "auto-fill": () => (
    <MnAutoFill
      suggestions={demoAutoFillSuggestions}
      onSelect={noop}
      placeholder="How do I implement..."
      maxSuggestions={5}
    />
  ),

  summary: () => (
    <MnSummary
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
    <MnInitialCta
      title="Welcome to AI Assistant"
      subtitle="What would you like to do today?"
      actions={demoInitialCtaActions}
      onAction={noop}
      variant="cards"
    />
  ),

  nudges: () => (
    <MnNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
  ),

  "prompt-details": () => (
    <MnPromptDetails
      prompt="Explain the difference between React Server Components and Client Components"
      details={demoPromptDetails}
      timestamp={new Date()}
      model="GPT-4 Turbo"
      tokenCount={48}
      variant="card"
    />
  ),

  randomize: () => (
    <MnRandomize
      onRandomize={noop}
      showSeed
      currentSeed="42"
      onSeedChange={noop}
    />
  ),

  expand: () => (
    <MnExpand
      content="React Server Components allow you to render components on the server..."
      onExpand={noop}
      title="Server Components Overview"
      variant="accordion"
    />
  ),

  transform: () => (
    <MnTransform
      content={demoTransformContent}
      options={demoTransformOptions}
      onTransform={noop}
      title="Content Transform"
      variant="buttons"
    />
  ),

  "inline-action": () => (
    <MnInlineAction
      actions={demoInlineActions}
      onAction={noop}
      variant="toolbar"
    />
  ),

  "chained-action": () => (
    <MnChainedAction
      steps={demoChainedSteps}
      onExecute={noop}
      title="Data Pipeline"
    />
  ),

  "data-ownership": () => (
    <MnDataOwnership
      items={demoDataOwnershipItems}
      onDelete={noop}
      onExport={noop}
      onDeleteAll={noop}
      title="Your Data"
    />
  ),

  footprints: () => (
    <MnFootprints
      entries={demoFootprintEntries}
      onEntryClick={noop}
      onClear={noop}
      title="Activity History"
      showTimestamps
    />
  ),

  describe: () => (
    <MnDescribe
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
    <MnInpainting
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
    <MnMadlibs
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
    <MnRestructure
      content={demoRestructureContent}
      options={demoRestructureOptions}
      onRestructure={noop}
      title="Restructure Content"
    />
  ),

  restyle: () => (
    <MnRestyle
      content={demoRestyleContent}
      options={demoRestyleOptions}
      onRestyle={noop}
      title="Restyle Content"
    />
  ),

  "saved-styles": () => (
    <MnSavedStyles
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
    <MnVoiceAndTone
      axes={demoVoiceToneAxes}
      onChange={noop}
      title="Voice and Tone"
      showValues
      variant="sliders"
    />
  ),

  synthesis: () => (
    <MnSynthesis
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
