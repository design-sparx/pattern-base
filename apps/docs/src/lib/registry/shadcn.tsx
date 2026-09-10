"use client";

import * as React from "react";

import {
  ActionPlan as ShActionPlan,
  Attachments as ShAttachments,
  AutoFill as ShAutoFill,
  Avatar as ShAvatar,
  Branches as ShBranches,
  Caveat as ShCaveat,
  ChainedAction as ShChainedAction,
  CitationsList as ShCitationsList,
  Color as ShColor,
  Connectors as ShConnectors,
  Consent as ShConsent,
  Controls as ShControls,
  CostEstimate as ShCostEstimate,
  DataOwnership as ShDataOwnership,
  Describe as ShDescribe,
  Disclosure as ShDisclosure,
  DraftMode as ShDraftMode,
  Expand as ShExpand,
  Filters as ShFilters,
  FollowUp as ShFollowUp,
  Footprints as ShFootprints,
  Gallery as ShGallery,
  IncognitoMode as ShIncognitoMode,
  InitialCta as ShInitialCta,
  InlineAction as ShInlineAction,
  Inpainting as ShInpainting,
  Madlibs as ShMadlibs,
  Memory as ShMemory,
  ModelManagement as ShModelManagement,
  Modes as ShModes,
  Nudges as ShNudges,
  OpenInput as ShOpenInput,
  ParameterControl as ShParameterControl,
  PresetStyles as ShPresetStyles,
  PromptDetails as ShPromptDetails,
  PromptEnhancer as ShPromptEnhancer,
  Randomize as ShRandomize,
  References as ShReferences,
  Regenerate as ShRegenerate,
  Restructure as ShRestructure,
  Restyle as ShRestyle,
  SampleResponse as ShSampleResponse,
  SavedStyles as ShSavedStyles,
  SharedVision as ShSharedVision,
  StreamOfThought as ShStreamOfThought,
  Suggestions as ShSuggestions,
  Summary as ShSummary,
  Synthesis as ShSynthesis,
  Templates as ShTemplates,
  Transform as ShTransform,
  Variations as ShVariations,
  Verification as ShVerification,
  VoiceAndTone as ShVoiceAndTone,
  Watermark as ShWatermark,
} from "@patternbase/shadcn";

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

export const shadcnRegistry: Record<string, React.ComponentType | undefined> = {
  "open-input": () => (
    <ShOpenInput
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
    <ShSuggestions
      suggestions={demoSuggestions}
      onSelect={noop}
      variant="card"
      columns={2}
    />
  ),

  "parameter-control": () => (
    <ShParameterControl
      parameters={demoParameters}
      onChange={noop}
      title="Generation Settings"
    />
  ),

  "preset-styles": () => (
    <ShPresetStyles
      presets={demoPresetStyles}
      selectedPresetId="blog-clean"
      onApplyPreset={noop}
      title="Style Presets"
      variant="cards"
    />
  ),

  "prompt-enhancer": () => (
    <ShPromptEnhancer
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
    <ShStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
  ),

  citation: () => (
    <ShCitationsList citations={demoCitations} title="Sources" maxVisible={3} />
  ),

  regenerate: () => (
    <ShRegenerate
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
      <ShDisclosure variant="badge" type="ai-generated" model="GPT-4" />
      <ShDisclosure
        variant="banner"
        type="ai-assisted"
        model="Claude"
        timestamp={new Date()}
      />
      <p>
        This content was <ShDisclosure variant="inline" type="ai-suggested" />
      </p>
    </div>
  ),

  variations: () => (
    <ShVariations
      variations={demoVariations}
      selectedId="1"
      onSelect={noop}
      layout="grid"
      columns={3}
    />
  ),

  "cost-estimate": () => (
    <ShCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
  ),

  "model-management": () => (
    <ShModelManagement
      models={demoModels}
      selectedModelId="gpt4"
      onSelectModel={noop}
      showDetails
      groupByProvider
    />
  ),

  modes: () => (
    <ShModes
      modes={demoModes}
      selectedModeId="balanced"
      onModeChange={noop}
      title="Assistant Mode"
      variant="segmented"
    />
  ),

  "follow-up": () => (
    <ShFollowUp
      followUps={demoFollowUps}
      onSelect={noop}
      variant="chip"
      title="Suggested follow-ups"
    />
  ),

  templates: () => (
    <ShTemplates
      templates={demoTemplates}
      onSelect={noop}
      layout="grid"
      columns={2}
      searchable
    />
  ),

  gallery: () => (
    <ShGallery
      items={demoGalleryItems}
      onSelect={noop}
      columns={3}
      selectable
    />
  ),

  attachments: () => (
    <ShAttachments
      attachments={demoAttachments}
      onAdd={noop}
      onRemove={noop}
      maxFiles={5}
    />
  ),

  filters: () => (
    <ShFilters
      groups={demoFilterGroups}
      values={{ type: ["text"], quality: "high", length: 2000 }}
      onChange={noop}
      onClear={noop}
      title="Filter Results"
    />
  ),

  "action-plan": () => (
    <ShActionPlan
      steps={demoActionPlanSteps}
      title="Execution Plan"
      onApprove={noop}
      onReject={noop}
      showEstimates
    />
  ),

  branches: () => (
    <ShBranches
      branches={demoBranches}
      activeBranchId="perf-path"
      onSelectBranch={noop}
      onCreateBranch={noop}
      title="Conversation Branches"
      variant="tree"
    />
  ),

  controls: () => (
    <ShControls
      controls={demoControls}
      onToggleControl={noop}
      title="AI Capability Controls"
      variant="list"
      showStatus
    />
  ),

  "draft-mode": () => (
    <ShDraftMode
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
    <ShMemory
      memories={demoMemories}
      onEditMemory={noop}
      onDeleteMemory={noop}
      title="Stored Memory"
      variant="list"
      showTimestamps
    />
  ),

  references: () => (
    <ShReferences
      references={demoReferences}
      onSelectReference={noop}
      onRemoveReference={noop}
      title="Session References"
      variant="list"
      showRelevance
    />
  ),

  "sample-response": () => (
    <ShSampleResponse
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
    <ShSharedVision
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
    <ShVerification
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
      <ShCaveat
        message="AI-generated content may contain inaccuracies. Please verify important information."
        variant="banner"
        severity="warning"
        title="AI Disclaimer"
        dismissible
      />
      <p>
        This response was generated by AI.{" "}
        <ShCaveat
          message="Results may vary."
          variant="inline"
          severity="info"
        />
      </p>
    </div>
  ),

  consent: () => (
    <ShConsent
      items={demoConsentItems}
      onAccept={noop}
      onDecline={noop}
      title="Data Processing Consent"
      description="Please review and accept the following before proceeding."
    />
  ),

  "incognito-mode": () => (
    <ShIncognitoMode
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
    <ShAvatar
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
    <ShColor
      options={demoColorOptions}
      selectedColorId="c1"
      onSelectColor={noop}
      title="AI Identity Palette"
      showLabels
      variant="card"
    />
  ),

  watermark: () => (
    <ShWatermark
      label={demoWatermark.label}
      visibility={demoWatermark.visibility}
      confidence={demoWatermark.confidence}
      algorithm={demoWatermark.algorithm}
      onVerify={noop}
      variant="banner"
    />
  ),

  connectors: () => (
    <ShConnectors
      sources={demoConnectors}
      onConnect={noop}
      onDisconnect={noop}
      onSync={noop}
      title="Connected Sources"
    />
  ),

  "auto-fill": () => (
    <ShAutoFill
      suggestions={demoAutoFillSuggestions}
      onSelect={noop}
      placeholder="How do I implement..."
      maxSuggestions={5}
    />
  ),

  summary: () => (
    <ShSummary
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
    <ShInitialCta
      title="Welcome to AI Assistant"
      subtitle="What would you like to do today?"
      actions={demoInitialCtaActions}
      onAction={noop}
      variant="cards"
    />
  ),

  nudges: () => (
    <ShNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
  ),

  "prompt-details": () => (
    <ShPromptDetails
      prompt="Explain the difference between React Server Components and Client Components"
      details={demoPromptDetails}
      timestamp={new Date()}
      model="GPT-4 Turbo"
      tokenCount={48}
      variant="card"
    />
  ),

  randomize: () => (
    <ShRandomize
      onRandomize={noop}
      showSeed
      currentSeed="42"
      onSeedChange={noop}
    />
  ),

  expand: () => (
    <ShExpand
      content="React Server Components allow you to render components on the server..."
      onExpand={noop}
      title="Server Components Overview"
      variant="accordion"
    />
  ),

  transform: () => (
    <ShTransform
      content={demoTransformContent}
      options={demoTransformOptions}
      onTransform={noop}
      title="Content Transform"
      variant="buttons"
    />
  ),

  "inline-action": () => (
    <ShInlineAction
      actions={demoInlineActions}
      onAction={noop}
      variant="toolbar"
    />
  ),

  "chained-action": () => (
    <ShChainedAction
      steps={demoChainedSteps}
      onExecute={noop}
      title="Data Pipeline"
    />
  ),

  "data-ownership": () => (
    <ShDataOwnership
      items={demoDataOwnershipItems}
      onDelete={noop}
      onExport={noop}
      onDeleteAll={noop}
      title="Your Data"
    />
  ),

  footprints: () => (
    <ShFootprints
      entries={demoFootprintEntries}
      onEntryClick={noop}
      onClear={noop}
      title="Activity History"
      showTimestamps
    />
  ),

  describe: () => (
    <ShDescribe
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
    <ShInpainting
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
    <ShMadlibs
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
    <ShRestructure
      content={demoRestructureContent}
      options={demoRestructureOptions}
      onRestructure={noop}
      title="Restructure Content"
    />
  ),

  restyle: () => (
    <ShRestyle
      content={demoRestyleContent}
      options={demoRestyleOptions}
      onRestyle={noop}
      title="Restyle Content"
    />
  ),

  "saved-styles": () => (
    <ShSavedStyles
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
    <ShVoiceAndTone
      axes={demoVoiceToneAxes}
      onChange={noop}
      title="Voice and Tone"
      showValues
      variant="sliders"
    />
  ),

  synthesis: () => (
    <ShSynthesis
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
