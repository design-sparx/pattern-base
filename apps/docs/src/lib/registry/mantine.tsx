"use client";

import * as React from "react";

import {
  ActionPlan as MaActionPlan,
  Attachments as MaAttachments,
  AutoFill as MaAutoFill,
  Avatar as MaAvatar,
  Branches as MaBranches,
  Caveat as MaCaveat,
  ChainedAction as MaChainedAction,
  CitationsList as MaCitationsList,
  Color as MaColor,
  Connectors as MaConnectors,
  Consent as MaConsent,
  Controls as MaControls,
  CostEstimate as MaCostEstimate,
  DataOwnership as MaDataOwnership,
  Describe as MaDescribe,
  Disclosure as MaDisclosure,
  DraftMode as MaDraftMode,
  Expand as MaExpand,
  Filters as MaFilters,
  FollowUp as MaFollowUp,
  Footprints as MaFootprints,
  Gallery as MaGallery,
  IncognitoMode as MaIncognitoMode,
  InitialCta as MaInitialCta,
  InlineAction as MaInlineAction,
  Inpainting as MaInpainting,
  Madlibs as MaMadlibs,
  Memory as MaMemory,
  ModelManagement as MaModelManagement,
  Modes as MaModes,
  Nudges as MaNudges,
  OpenInput as MaOpenInput,
  ParameterControl as MaParameterControl,
  PresetStyles as MaPresetStyles,
  PromptDetails as MaPromptDetails,
  PromptEnhancer as MaPromptEnhancer,
  Randomize as MaRandomize,
  References as MaReferences,
  Regenerate as MaRegenerate,
  Restructure as MaRestructure,
  Restyle as MaRestyle,
  SampleResponse as MaSampleResponse,
  SavedStyles as MaSavedStyles,
  SharedVision as MaSharedVision,
  StreamOfThought as MaStreamOfThought,
  Suggestions as MaSuggestions,
  Summary as MaSummary,
  Synthesis as MaSynthesis,
  Templates as MaTemplates,
  Transform as MaTransform,
  Variations as MaVariations,
  Verification as MaVerification,
  VoiceAndTone as MaVoiceAndTone,
  Watermark as MaWatermark,
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

export const mantineRegistry: Record<string, React.ComponentType | undefined> =
  {
    "open-input": () => (
      <MaOpenInput
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
      <MaSuggestions
        suggestions={demoSuggestions}
        onSelect={noop}
        variant="card"
        columns={2}
      />
    ),

    "parameter-control": () => (
      <MaParameterControl
        parameters={demoParameters}
        onChange={noop}
        title="Generation Settings"
      />
    ),

    "preset-styles": () => (
      <MaPresetStyles
        presets={demoPresetStyles}
        selectedPresetId="blog-clean"
        onApplyPreset={noop}
        title="Style Presets"
        variant="cards"
      />
    ),

    "prompt-enhancer": () => (
      <MaPromptEnhancer
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
      <MaStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),

    citation: () => (
      <MaCitationsList
        citations={demoCitations}
        title="Sources"
        maxVisible={3}
      />
    ),

    regenerate: () => (
      <MaRegenerate
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
        <MaDisclosure variant="badge" type="ai-generated" model="GPT-4" />
        <MaDisclosure
          variant="banner"
          type="ai-assisted"
          model="Claude"
          timestamp={new Date()}
        />
        <p>
          This content was <MaDisclosure variant="inline" type="ai-suggested" />
        </p>
      </div>
    ),

    variations: () => (
      <MaVariations
        variations={demoVariations}
        selectedId="1"
        onSelect={noop}
        layout="grid"
        columns={3}
      />
    ),

    "cost-estimate": () => (
      <MaCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
    ),

    "model-management": () => (
      <MaModelManagement
        models={demoModels}
        selectedModelId="gpt4"
        onSelectModel={noop}
        showDetails
        groupByProvider
      />
    ),

    modes: () => (
      <MaModes
        modes={demoModes}
        selectedModeId="balanced"
        onModeChange={noop}
        title="Assistant Mode"
        variant="segmented"
      />
    ),

    "follow-up": () => (
      <MaFollowUp
        followUps={demoFollowUps}
        onSelect={noop}
        variant="chip"
        title="Suggested follow-ups"
      />
    ),

    templates: () => (
      <MaTemplates
        templates={demoTemplates}
        onSelect={noop}
        layout="grid"
        columns={2}
        searchable
      />
    ),

    gallery: () => (
      <MaGallery
        items={demoGalleryItems}
        onSelect={noop}
        columns={3}
        selectable
      />
    ),

    attachments: () => (
      <MaAttachments
        attachments={demoAttachments}
        onAdd={noop}
        onRemove={noop}
        maxFiles={5}
      />
    ),

    filters: () => (
      <MaFilters
        groups={demoFilterGroups}
        values={{ type: ["text"], quality: "high", length: 2000 }}
        onChange={noop}
        onClear={noop}
        title="Filter Results"
      />
    ),

    "action-plan": () => (
      <MaActionPlan
        steps={demoActionPlanSteps}
        title="Execution Plan"
        onApprove={noop}
        onReject={noop}
        showEstimates
      />
    ),

    branches: () => (
      <MaBranches
        branches={demoBranches}
        activeBranchId="perf-path"
        onSelectBranch={noop}
        onCreateBranch={noop}
        title="Conversation Branches"
        variant="tree"
      />
    ),

    controls: () => (
      <MaControls
        controls={demoControls}
        onToggleControl={noop}
        title="AI Capability Controls"
        variant="list"
        showStatus
      />
    ),

    "draft-mode": () => (
      <MaDraftMode
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
      <MaMemory
        memories={demoMemories}
        onEditMemory={noop}
        onDeleteMemory={noop}
        title="Stored Memory"
        variant="list"
        showTimestamps
      />
    ),

    references: () => (
      <MaReferences
        references={demoReferences}
        onSelectReference={noop}
        onRemoveReference={noop}
        title="Session References"
        variant="list"
        showRelevance
      />
    ),

    "sample-response": () => (
      <MaSampleResponse
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
      <MaSharedVision
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
      <MaVerification
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
        <MaCaveat
          message="AI-generated content may contain inaccuracies. Please verify important information."
          variant="banner"
          severity="warning"
          title="AI Disclaimer"
          dismissible
        />
        <p>
          This response was generated by AI.{" "}
          <MaCaveat
            message="Results may vary."
            variant="inline"
            severity="info"
          />
        </p>
      </div>
    ),

    consent: () => (
      <MaConsent
        items={demoConsentItems}
        onAccept={noop}
        onDecline={noop}
        title="Data Processing Consent"
        description="Please review and accept the following before proceeding."
      />
    ),

    "incognito-mode": () => (
      <MaIncognitoMode
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
      <MaAvatar
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
      <MaColor
        options={demoColorOptions}
        selectedColorId="c1"
        onSelectColor={noop}
        title="AI Identity Palette"
        showLabels
        variant="card"
      />
    ),

    watermark: () => (
      <MaWatermark
        label={demoWatermark.label}
        visibility={demoWatermark.visibility}
        confidence={demoWatermark.confidence}
        algorithm={demoWatermark.algorithm}
        onVerify={noop}
        variant="banner"
      />
    ),

    connectors: () => (
      <MaConnectors
        sources={demoConnectors}
        onConnect={noop}
        onDisconnect={noop}
        onSync={noop}
        title="Connected Sources"
      />
    ),

    "auto-fill": () => (
      <MaAutoFill
        suggestions={demoAutoFillSuggestions}
        onSelect={noop}
        placeholder="How do I implement..."
        maxSuggestions={5}
      />
    ),

    summary: () => (
      <MaSummary
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
      <MaInitialCta
        title="Welcome to AI Assistant"
        subtitle="What would you like to do today?"
        actions={demoInitialCtaActions}
        onAction={noop}
        variant="cards"
      />
    ),

    nudges: () => (
      <MaNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
    ),

    "prompt-details": () => (
      <MaPromptDetails
        prompt="Explain the difference between React Server Components and Client Components"
        details={demoPromptDetails}
        timestamp={new Date()}
        model="GPT-4 Turbo"
        tokenCount={48}
        variant="card"
      />
    ),

    randomize: () => (
      <MaRandomize
        onRandomize={noop}
        showSeed
        currentSeed="42"
        onSeedChange={noop}
      />
    ),

    expand: () => (
      <MaExpand
        content="React Server Components allow you to render components on the server..."
        onExpand={noop}
        title="Server Components Overview"
        variant="accordion"
      />
    ),

    transform: () => (
      <MaTransform
        content={demoTransformContent}
        options={demoTransformOptions}
        onTransform={noop}
        title="Content Transform"
        variant="buttons"
      />
    ),

    "inline-action": () => (
      <MaInlineAction
        actions={demoInlineActions}
        onAction={noop}
        variant="toolbar"
      />
    ),

    "chained-action": () => (
      <MaChainedAction
        steps={demoChainedSteps}
        onExecute={noop}
        title="Data Pipeline"
      />
    ),

    "data-ownership": () => (
      <MaDataOwnership
        items={demoDataOwnershipItems}
        onDelete={noop}
        onExport={noop}
        onDeleteAll={noop}
        title="Your Data"
      />
    ),

    footprints: () => (
      <MaFootprints
        entries={demoFootprintEntries}
        onEntryClick={noop}
        onClear={noop}
        title="Activity History"
        showTimestamps
      />
    ),

    describe: () => (
      <MaDescribe
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
      <MaInpainting
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
      <MaMadlibs
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
      <MaRestructure
        content={demoRestructureContent}
        options={demoRestructureOptions}
        onRestructure={noop}
        title="Restructure Content"
      />
    ),

    restyle: () => (
      <MaRestyle
        content={demoRestyleContent}
        options={demoRestyleOptions}
        onRestyle={noop}
        title="Restyle Content"
      />
    ),

    "saved-styles": () => (
      <MaSavedStyles
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
      <MaVoiceAndTone
        axes={demoVoiceToneAxes}
        onChange={noop}
        title="Voice and Tone"
        showValues
        variant="sliders"
      />
    ),

    synthesis: () => (
      <MaSynthesis
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
