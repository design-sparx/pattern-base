"use client";

import * as React from "react";

import {
  ActionPlan as AntActionPlan,
  Attachments as AntAttachments,
  AutoFill as AntAutoFill,
  Avatar as AntAvatar,
  Branches as AntBranches,
  Caveat as AntCaveat,
  ChainedAction as AntChainedAction,
  CitationsList as AntCitationsList,
  Color as AntColor,
  Connectors as AntConnectors,
  Consent as AntConsent,
  Controls as AntControls,
  CostEstimate as AntCostEstimate,
  DataOwnership as AntDataOwnership,
  Describe as AntDescribe,
  Disclosure as AntDisclosure,
  DraftMode as AntDraftMode,
  Expand as AntExpand,
  Filters as AntFilters,
  FollowUp as AntFollowUp,
  Footprints as AntFootprints,
  Gallery as AntGallery,
  IncognitoMode as AntIncognitoMode,
  InitialCta as AntInitialCta,
  InlineAction as AntInlineAction,
  Inpainting as AntInpainting,
  Madlibs as AntMadlibs,
  Memory as AntMemory,
  ModelManagement as AntModelManagement,
  Modes as AntModes,
  Nudges as AntNudges,
  OpenInput as AntOpenInput,
  ParameterControl as AntParameterControl,
  PresetStyles as AntPresetStyles,
  PromptDetails as AntPromptDetails,
  PromptEnhancer as AntPromptEnhancer,
  Randomize as AntRandomize,
  References as AntReferences,
  Regenerate as AntRegenerate,
  Restructure as AntRestructure,
  Restyle as AntRestyle,
  SampleResponse as AntSampleResponse,
  SavedStyles as AntSavedStyles,
  SharedVision as AntSharedVision,
  StreamOfThought as AntStreamOfThought,
  Suggestions as AntSuggestions,
  Summary as AntSummary,
  Synthesis as AntSynthesis,
  Templates as AntTemplates,
  Transform as AntTransform,
  Variations as AntVariations,
  Verification as AntVerification,
  VoiceAndTone as AntVoiceAndTone,
  Watermark as AntWatermark,
} from "@patternbase/antd";

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

export const antdRegistry: Record<string, React.ComponentType> = {
  "open-input": () => (
    <AntOpenInput
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
    <AntSuggestions
      suggestions={demoSuggestions}
      onSelect={noop}
      variant="card"
      columns={2}
    />
  ),

  "parameter-control": () => (
    <AntParameterControl
      parameters={demoParameters}
      onChange={noop}
      title="Generation Settings"
    />
  ),

  "preset-styles": () => (
    <AntPresetStyles
      presets={demoPresetStyles}
      selectedPresetId="blog-clean"
      onApplyPreset={noop}
      title="Style Presets"
      variant="cards"
    />
  ),

  "prompt-enhancer": () => (
    <AntPromptEnhancer
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
    <AntStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
  ),

  citation: () => (
    <AntCitationsList
      citations={demoCitations}
      title="Sources"
      maxVisible={3}
    />
  ),

  regenerate: () => (
    <AntRegenerate
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
      <AntDisclosure variant="badge" type="ai-generated" model="GPT-4" />
      <AntDisclosure
        variant="banner"
        type="ai-assisted"
        model="Claude"
        timestamp={new Date()}
      />
      <p>
        This content was <AntDisclosure variant="inline" type="ai-suggested" />
      </p>
    </div>
  ),

  variations: () => (
    <AntVariations
      variations={demoVariations}
      selectedId="1"
      onSelect={noop}
      layout="grid"
      columns={3}
    />
  ),

  "cost-estimate": () => (
    <AntCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
  ),

  "model-management": () => (
    <AntModelManagement
      models={demoModels}
      selectedModelId="gpt4"
      onSelectModel={noop}
      showDetails
      groupByProvider
    />
  ),

  modes: () => (
    <AntModes
      modes={demoModes}
      selectedModeId="balanced"
      onModeChange={noop}
      title="Assistant Mode"
      variant="segmented"
    />
  ),

  "follow-up": () => (
    <AntFollowUp
      followUps={demoFollowUps}
      onSelect={noop}
      variant="chip"
      title="Suggested follow-ups"
    />
  ),

  templates: () => (
    <AntTemplates
      templates={demoTemplates}
      onSelect={noop}
      layout="grid"
      columns={2}
      searchable
    />
  ),

  gallery: () => (
    <AntGallery
      items={demoGalleryItems}
      onSelect={noop}
      columns={3}
      selectable
    />
  ),

  attachments: () => (
    <AntAttachments
      attachments={demoAttachments}
      onAdd={noop}
      onRemove={noop}
      maxFiles={5}
    />
  ),

  filters: () => (
    <AntFilters
      groups={demoFilterGroups}
      values={{ type: ["text"], quality: "high", length: 2000 }}
      onChange={noop}
      onClear={noop}
      title="Filter Results"
    />
  ),

  "action-plan": () => (
    <AntActionPlan
      steps={demoActionPlanSteps}
      title="Execution Plan"
      onApprove={noop}
      onReject={noop}
      showEstimates
    />
  ),

  branches: () => (
    <AntBranches
      branches={demoBranches}
      activeBranchId="perf-path"
      onSelectBranch={noop}
      onCreateBranch={noop}
      title="Conversation Branches"
      variant="tree"
    />
  ),

  controls: () => (
    <AntControls
      controls={demoControls}
      onToggleControl={noop}
      title="AI Capability Controls"
      variant="list"
      showStatus
    />
  ),

  "draft-mode": () => (
    <AntDraftMode
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
    <AntMemory
      memories={demoMemories}
      onEditMemory={noop}
      onDeleteMemory={noop}
      title="Stored Memory"
      variant="list"
      showTimestamps
    />
  ),

  references: () => (
    <AntReferences
      references={demoReferences}
      onSelectReference={noop}
      onRemoveReference={noop}
      title="Session References"
      variant="list"
      showRelevance
    />
  ),

  "sample-response": () => (
    <AntSampleResponse
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
    <AntSharedVision
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
    <AntVerification
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
      <AntCaveat
        message="AI-generated content may contain inaccuracies. Please verify important information."
        variant="banner"
        severity="warning"
        title="AI Disclaimer"
        dismissible
      />
      <p>
        This response was generated by AI.{" "}
        <AntCaveat
          message="Results may vary."
          variant="inline"
          severity="info"
        />
      </p>
    </div>
  ),

  consent: () => (
    <AntConsent
      items={demoConsentItems}
      onAccept={noop}
      onDecline={noop}
      title="Data Processing Consent"
      description="Please review and accept the following before proceeding."
    />
  ),

  "incognito-mode": () => (
    <AntIncognitoMode
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
    <AntAvatar
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
    <AntColor
      options={demoColorOptions}
      selectedColorId="c1"
      onSelectColor={noop}
      title="AI Identity Palette"
      showLabels
      variant="card"
    />
  ),

  watermark: () => (
    <AntWatermark
      label={demoWatermark.label}
      visibility={demoWatermark.visibility}
      confidence={demoWatermark.confidence}
      algorithm={demoWatermark.algorithm}
      onVerify={noop}
      variant="banner"
    />
  ),

  connectors: () => (
    <AntConnectors
      sources={demoConnectors}
      onConnect={noop}
      onDisconnect={noop}
      onSync={noop}
      title="Connected Sources"
    />
  ),

  "auto-fill": () => (
    <AntAutoFill
      suggestions={demoAutoFillSuggestions}
      onSelect={noop}
      placeholder="How do I implement..."
      maxSuggestions={5}
    />
  ),

  summary: () => (
    <AntSummary
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
    <AntInitialCta
      title="Welcome to AI Assistant"
      subtitle="What would you like to do today?"
      actions={demoInitialCtaActions}
      onAction={noop}
      variant="cards"
    />
  ),

  nudges: () => (
    <AntNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
  ),

  "prompt-details": () => (
    <AntPromptDetails
      prompt="Explain the difference between React Server Components and Client Components"
      details={demoPromptDetails}
      timestamp={new Date()}
      model="GPT-4 Turbo"
      tokenCount={48}
      variant="card"
    />
  ),

  randomize: () => (
    <AntRandomize
      onRandomize={noop}
      showSeed
      currentSeed="42"
      onSeedChange={noop}
    />
  ),

  expand: () => (
    <AntExpand
      content="React Server Components allow you to render components on the server..."
      onExpand={noop}
      title="Server Components Overview"
      variant="accordion"
    />
  ),

  transform: () => (
    <AntTransform
      content={demoTransformContent}
      options={demoTransformOptions}
      onTransform={noop}
      title="Content Transform"
      variant="buttons"
    />
  ),

  "inline-action": () => (
    <AntInlineAction
      actions={demoInlineActions}
      onAction={noop}
      variant="toolbar"
    />
  ),

  "chained-action": () => (
    <AntChainedAction
      steps={demoChainedSteps}
      onExecute={noop}
      title="Data Pipeline"
    />
  ),

  "data-ownership": () => (
    <AntDataOwnership
      items={demoDataOwnershipItems}
      onDelete={noop}
      onExport={noop}
      onDeleteAll={noop}
      title="Your Data"
    />
  ),

  footprints: () => (
    <AntFootprints
      entries={demoFootprintEntries}
      onEntryClick={noop}
      onClear={noop}
      title="Activity History"
      showTimestamps
    />
  ),

  describe: () => (
    <AntDescribe
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
    <AntInpainting
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
    <AntMadlibs
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
    <AntRestructure
      content={demoRestructureContent}
      options={demoRestructureOptions}
      onRestructure={noop}
      title="Restructure Content"
    />
  ),

  restyle: () => (
    <AntRestyle
      content={demoRestyleContent}
      options={demoRestyleOptions}
      onRestyle={noop}
      title="Restyle Content"
    />
  ),

  "saved-styles": () => (
    <AntSavedStyles
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
    <AntVoiceAndTone
      axes={demoVoiceToneAxes}
      onChange={noop}
      title="Voice and Tone"
      showValues
      variant="sliders"
    />
  ),

  synthesis: () => (
    <AntSynthesis
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
