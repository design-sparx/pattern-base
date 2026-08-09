"use client";

import * as React from "react";

// Antd components
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
// Bootstrap components
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
// Mantine components
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

// ── Registry ──

interface RegistryEntry {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
  mantine: React.ComponentType;
}

const noop = () => {
  /* no-op for demo callbacks */
};

export const componentRegistry: Record<string, RegistryEntry> = {
  "open-input": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  suggestions: {
    bootstrap: () => (
      <BsSuggestions
        suggestions={demoSuggestions}
        onSelect={noop}
        variant="card"
        columns={2}
      />
    ),
    antd: () => (
      <AntSuggestions
        suggestions={demoSuggestions}
        onSelect={noop}
        variant="card"
        columns={2}
      />
    ),
    mantine: () => (
      <MnSuggestions
        suggestions={demoSuggestions}
        onSelect={noop}
        variant="card"
        columns={2}
      />
    ),
  },

  "parameter-control": {
    bootstrap: () => (
      <BsParameterControl
        parameters={demoParameters}
        onChange={noop}
        title="Generation Settings"
      />
    ),
    antd: () => (
      <AntParameterControl
        parameters={demoParameters}
        onChange={noop}
        title="Generation Settings"
      />
    ),
    mantine: () => (
      <MnParameterControl
        parameters={demoParameters}
        onChange={noop}
        title="Generation Settings"
      />
    ),
  },

  "preset-styles": {
    bootstrap: () => (
      <BsPresetStyles
        presets={demoPresetStyles}
        selectedPresetId="blog-clean"
        onApplyPreset={noop}
        title="Style Presets"
        variant="cards"
      />
    ),
    antd: () => (
      <AntPresetStyles
        presets={demoPresetStyles}
        selectedPresetId="blog-clean"
        onApplyPreset={noop}
        title="Style Presets"
        variant="cards"
      />
    ),
    mantine: () => (
      <MnPresetStyles
        presets={demoPresetStyles}
        selectedPresetId="blog-clean"
        onApplyPreset={noop}
        title="Style Presets"
        variant="cards"
      />
    ),
  },

  "prompt-enhancer": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  "stream-of-thought": {
    bootstrap: () => (
      <BsStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
    antd: () => (
      <AntStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
    mantine: () => (
      <MnStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
  },

  citation: {
    bootstrap: () => (
      <BsCitationsList
        citations={demoCitations}
        title="Sources"
        maxVisible={3}
      />
    ),
    antd: () => (
      <AntCitationsList
        citations={demoCitations}
        title="Sources"
        maxVisible={3}
      />
    ),
    mantine: () => (
      <MnCitationsList
        citations={demoCitations}
        title="Sources"
        maxVisible={3}
      />
    ),
  },

  regenerate: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  disclosure: {
    bootstrap: () => (
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
    antd: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AntDisclosure variant="badge" type="ai-generated" model="GPT-4" />
        <AntDisclosure
          variant="banner"
          type="ai-assisted"
          model="Claude"
          timestamp={new Date()}
        />
        <p>
          This content was{" "}
          <AntDisclosure variant="inline" type="ai-suggested" />
        </p>
      </div>
    ),
    mantine: () => (
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
  },

  variations: {
    bootstrap: () => (
      <BsVariations
        variations={demoVariations}
        selectedId="1"
        onSelect={noop}
        layout="grid"
        columns={3}
      />
    ),
    antd: () => (
      <AntVariations
        variations={demoVariations}
        selectedId="1"
        onSelect={noop}
        layout="grid"
        columns={3}
      />
    ),
    mantine: () => (
      <MnVariations
        variations={demoVariations}
        selectedId="1"
        onSelect={noop}
        layout="grid"
        columns={3}
      />
    ),
  },

  "cost-estimate": {
    bootstrap: () => (
      <BsCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
    ),
    antd: () => (
      <AntCostEstimate
        breakdown={demoCostBreakdown}
        currency="USD"
        showTokens
      />
    ),
    mantine: () => (
      <MnCostEstimate breakdown={demoCostBreakdown} currency="USD" showTokens />
    ),
  },

  "model-management": {
    bootstrap: () => (
      <BsModelManagement
        models={demoModels}
        selectedModelId="gpt4"
        onSelectModel={noop}
        showDetails
        groupByProvider
      />
    ),
    antd: () => (
      <AntModelManagement
        models={demoModels}
        selectedModelId="gpt4"
        onSelectModel={noop}
        showDetails
        groupByProvider
      />
    ),
    mantine: () => (
      <MnModelManagement
        models={demoModels}
        selectedModelId="gpt4"
        onSelectModel={noop}
        showDetails
        groupByProvider
      />
    ),
  },

  modes: {
    bootstrap: () => (
      <BsModes
        modes={demoModes}
        selectedModeId="balanced"
        onModeChange={noop}
        title="Assistant Mode"
        variant="segmented"
      />
    ),
    antd: () => (
      <AntModes
        modes={demoModes}
        selectedModeId="balanced"
        onModeChange={noop}
        title="Assistant Mode"
        variant="segmented"
      />
    ),
    mantine: () => (
      <MnModes
        modes={demoModes}
        selectedModeId="balanced"
        onModeChange={noop}
        title="Assistant Mode"
        variant="segmented"
      />
    ),
  },

  "follow-up": {
    bootstrap: () => (
      <BsFollowUp
        followUps={demoFollowUps}
        onSelect={noop}
        variant="chip"
        title="Suggested follow-ups"
      />
    ),
    antd: () => (
      <AntFollowUp
        followUps={demoFollowUps}
        onSelect={noop}
        variant="chip"
        title="Suggested follow-ups"
      />
    ),
    mantine: () => (
      <MnFollowUp
        followUps={demoFollowUps}
        onSelect={noop}
        variant="chip"
        title="Suggested follow-ups"
      />
    ),
  },

  templates: {
    bootstrap: () => (
      <BsTemplates
        templates={demoTemplates}
        onSelect={noop}
        layout="grid"
        columns={2}
        searchable
      />
    ),
    antd: () => (
      <AntTemplates
        templates={demoTemplates}
        onSelect={noop}
        layout="grid"
        columns={2}
        searchable
      />
    ),
    mantine: () => (
      <MnTemplates
        templates={demoTemplates}
        onSelect={noop}
        layout="grid"
        columns={2}
        searchable
      />
    ),
  },

  gallery: {
    bootstrap: () => (
      <BsGallery
        items={demoGalleryItems}
        onSelect={noop}
        columns={3}
        selectable
      />
    ),
    antd: () => (
      <AntGallery
        items={demoGalleryItems}
        onSelect={noop}
        columns={3}
        selectable
      />
    ),
    mantine: () => (
      <MnGallery
        items={demoGalleryItems}
        onSelect={noop}
        columns={3}
        selectable
      />
    ),
  },

  attachments: {
    bootstrap: () => (
      <BsAttachments
        attachments={demoAttachments}
        onAdd={noop}
        onRemove={noop}
        maxFiles={5}
      />
    ),
    antd: () => (
      <AntAttachments
        attachments={demoAttachments}
        onAdd={noop}
        onRemove={noop}
        maxFiles={5}
      />
    ),
    mantine: () => (
      <MnAttachments
        attachments={demoAttachments}
        onAdd={noop}
        onRemove={noop}
        maxFiles={5}
      />
    ),
  },

  filters: {
    bootstrap: () => (
      <BsFilters
        groups={demoFilterGroups}
        values={{ type: ["text"], quality: "high", length: 2000 }}
        onChange={noop}
        onClear={noop}
        title="Filter Results"
      />
    ),
    antd: () => (
      <AntFilters
        groups={demoFilterGroups}
        values={{ type: ["text"], quality: "high", length: 2000 }}
        onChange={noop}
        onClear={noop}
        title="Filter Results"
      />
    ),
    mantine: () => (
      <MnFilters
        groups={demoFilterGroups}
        values={{ type: ["text"], quality: "high", length: 2000 }}
        onChange={noop}
        onClear={noop}
        title="Filter Results"
      />
    ),
  },

  "action-plan": {
    bootstrap: () => (
      <BsActionPlan
        steps={demoActionPlanSteps}
        title="Execution Plan"
        onApprove={noop}
        onReject={noop}
        showEstimates
      />
    ),
    antd: () => (
      <AntActionPlan
        steps={demoActionPlanSteps}
        title="Execution Plan"
        onApprove={noop}
        onReject={noop}
        showEstimates
      />
    ),
    mantine: () => (
      <MnActionPlan
        steps={demoActionPlanSteps}
        title="Execution Plan"
        onApprove={noop}
        onReject={noop}
        showEstimates
      />
    ),
  },

  branches: {
    bootstrap: () => (
      <BsBranches
        branches={demoBranches}
        activeBranchId="perf-path"
        onSelectBranch={noop}
        onCreateBranch={noop}
        title="Conversation Branches"
        variant="tree"
      />
    ),
    antd: () => (
      <AntBranches
        branches={demoBranches}
        activeBranchId="perf-path"
        onSelectBranch={noop}
        onCreateBranch={noop}
        title="Conversation Branches"
        variant="tree"
      />
    ),
    mantine: () => (
      <MnBranches
        branches={demoBranches}
        activeBranchId="perf-path"
        onSelectBranch={noop}
        onCreateBranch={noop}
        title="Conversation Branches"
        variant="tree"
      />
    ),
  },

  controls: {
    bootstrap: () => (
      <BsControls
        controls={demoControls}
        onToggleControl={noop}
        title="AI Capability Controls"
        variant="list"
        showStatus
      />
    ),
    antd: () => (
      <AntControls
        controls={demoControls}
        onToggleControl={noop}
        title="AI Capability Controls"
        variant="list"
        showStatus
      />
    ),
    mantine: () => (
      <MnControls
        controls={demoControls}
        onToggleControl={noop}
        title="AI Capability Controls"
        variant="list"
        showStatus
      />
    ),
  },

  "draft-mode": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  memory: {
    bootstrap: () => (
      <BsMemory
        memories={demoMemories}
        onEditMemory={noop}
        onDeleteMemory={noop}
        title="Stored Memory"
        variant="list"
        showTimestamps
      />
    ),
    antd: () => (
      <AntMemory
        memories={demoMemories}
        onEditMemory={noop}
        onDeleteMemory={noop}
        title="Stored Memory"
        variant="list"
        showTimestamps
      />
    ),
    mantine: () => (
      <MnMemory
        memories={demoMemories}
        onEditMemory={noop}
        onDeleteMemory={noop}
        title="Stored Memory"
        variant="list"
        showTimestamps
      />
    ),
  },

  references: {
    bootstrap: () => (
      <BsReferences
        references={demoReferences}
        onSelectReference={noop}
        onRemoveReference={noop}
        title="Session References"
        variant="list"
        showRelevance
      />
    ),
    antd: () => (
      <AntReferences
        references={demoReferences}
        onSelectReference={noop}
        onRemoveReference={noop}
        title="Session References"
        variant="list"
        showRelevance
      />
    ),
    mantine: () => (
      <MnReferences
        references={demoReferences}
        onSelectReference={noop}
        onRemoveReference={noop}
        title="Session References"
        variant="list"
        showRelevance
      />
    ),
  },

  "sample-response": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  "shared-vision": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  verification: {
    bootstrap: () => (
      <BsVerification
        claims={demoVerificationClaims}
        onRunVerification={noop}
        onSelectClaim={noop}
        title="Claim Verification"
        showSources
        variant="list"
      />
    ),
    antd: () => (
      <AntVerification
        claims={demoVerificationClaims}
        onRunVerification={noop}
        onSelectClaim={noop}
        title="Claim Verification"
        showSources
        variant="list"
      />
    ),
    mantine: () => (
      <MnVerification
        claims={demoVerificationClaims}
        onRunVerification={noop}
        onSelectClaim={noop}
        title="Claim Verification"
        showSources
        variant="list"
      />
    ),
  },

  caveat: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  consent: {
    bootstrap: () => (
      <BsConsent
        items={demoConsentItems}
        onAccept={noop}
        onDecline={noop}
        title="Data Processing Consent"
        description="Please review and accept the following before proceeding."
      />
    ),
    antd: () => (
      <AntConsent
        items={demoConsentItems}
        onAccept={noop}
        onDecline={noop}
        title="Data Processing Consent"
        description="Please review and accept the following before proceeding."
      />
    ),
    mantine: () => (
      <MnConsent
        items={demoConsentItems}
        onAccept={noop}
        onDecline={noop}
        title="Data Processing Consent"
        description="Please review and accept the following before proceeding."
      />
    ),
  },

  "incognito-mode": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  avatar: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  color: {
    bootstrap: () => (
      <BsColor
        options={demoColorOptions}
        selectedColorId="c1"
        onSelectColor={noop}
        title="AI Identity Palette"
        showLabels
        variant="card"
      />
    ),
    antd: () => (
      <AntColor
        options={demoColorOptions}
        selectedColorId="c1"
        onSelectColor={noop}
        title="AI Identity Palette"
        showLabels
        variant="card"
      />
    ),
    mantine: () => (
      <MnColor
        options={demoColorOptions}
        selectedColorId="c1"
        onSelectColor={noop}
        title="AI Identity Palette"
        showLabels
        variant="card"
      />
    ),
  },

  watermark: {
    bootstrap: () => (
      <BsWatermark
        label={demoWatermark.label}
        visibility={demoWatermark.visibility}
        confidence={demoWatermark.confidence}
        algorithm={demoWatermark.algorithm}
        onVerify={noop}
        variant="banner"
      />
    ),
    antd: () => (
      <AntWatermark
        label={demoWatermark.label}
        visibility={demoWatermark.visibility}
        confidence={demoWatermark.confidence}
        algorithm={demoWatermark.algorithm}
        onVerify={noop}
        variant="banner"
      />
    ),
    mantine: () => (
      <MnWatermark
        label={demoWatermark.label}
        visibility={demoWatermark.visibility}
        confidence={demoWatermark.confidence}
        algorithm={demoWatermark.algorithm}
        onVerify={noop}
        variant="banner"
      />
    ),
  },

  connectors: {
    bootstrap: () => (
      <BsConnectors
        sources={demoConnectors}
        onConnect={noop}
        onDisconnect={noop}
        onSync={noop}
        title="Connected Sources"
      />
    ),
    antd: () => (
      <AntConnectors
        sources={demoConnectors}
        onConnect={noop}
        onDisconnect={noop}
        onSync={noop}
        title="Connected Sources"
      />
    ),
    mantine: () => (
      <MnConnectors
        sources={demoConnectors}
        onConnect={noop}
        onDisconnect={noop}
        onSync={noop}
        title="Connected Sources"
      />
    ),
  },

  "auto-fill": {
    bootstrap: () => (
      <BsAutoFill
        suggestions={demoAutoFillSuggestions}
        onSelect={noop}
        placeholder="How do I implement..."
        maxSuggestions={5}
      />
    ),
    antd: () => (
      <AntAutoFill
        suggestions={demoAutoFillSuggestions}
        onSelect={noop}
        placeholder="How do I implement..."
        maxSuggestions={5}
      />
    ),
    mantine: () => (
      <MnAutoFill
        suggestions={demoAutoFillSuggestions}
        onSelect={noop}
        placeholder="How do I implement..."
        maxSuggestions={5}
      />
    ),
  },

  summary: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  "initial-cta": {
    bootstrap: () => (
      <BsInitialCta
        title="Welcome to AI Assistant"
        subtitle="What would you like to do today?"
        actions={demoInitialCtaActions}
        onAction={noop}
        variant="cards"
      />
    ),
    antd: () => (
      <AntInitialCta
        title="Welcome to AI Assistant"
        subtitle="What would you like to do today?"
        actions={demoInitialCtaActions}
        onAction={noop}
        variant="cards"
      />
    ),
    mantine: () => (
      <MnInitialCta
        title="Welcome to AI Assistant"
        subtitle="What would you like to do today?"
        actions={demoInitialCtaActions}
        onAction={noop}
        variant="cards"
      />
    ),
  },

  nudges: {
    bootstrap: () => (
      <BsNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
    ),
    antd: () => (
      <AntNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
    ),
    mantine: () => (
      <MnNudges nudges={demoNudges} onDismiss={noop} variant="inline" />
    ),
  },

  "prompt-details": {
    bootstrap: () => (
      <BsPromptDetails
        prompt="Explain the difference between React Server Components and Client Components"
        details={demoPromptDetails}
        timestamp={new Date()}
        model="GPT-4 Turbo"
        tokenCount={48}
        variant="card"
      />
    ),
    antd: () => (
      <AntPromptDetails
        prompt="Explain the difference between React Server Components and Client Components"
        details={demoPromptDetails}
        timestamp={new Date()}
        model="GPT-4 Turbo"
        tokenCount={48}
        variant="card"
      />
    ),
    mantine: () => (
      <MnPromptDetails
        prompt="Explain the difference between React Server Components and Client Components"
        details={demoPromptDetails}
        timestamp={new Date()}
        model="GPT-4 Turbo"
        tokenCount={48}
        variant="card"
      />
    ),
  },

  randomize: {
    bootstrap: () => (
      <BsRandomize
        onRandomize={noop}
        showSeed
        currentSeed="42"
        onSeedChange={noop}
      />
    ),
    antd: () => (
      <AntRandomize
        onRandomize={noop}
        showSeed
        currentSeed="42"
        onSeedChange={noop}
      />
    ),
    mantine: () => (
      <MnRandomize
        onRandomize={noop}
        showSeed
        currentSeed="42"
        onSeedChange={noop}
      />
    ),
  },

  expand: {
    bootstrap: () => (
      <BsExpand
        content="React Server Components allow you to render components on the server..."
        onExpand={noop}
        title="Server Components Overview"
        variant="accordion"
      />
    ),
    antd: () => (
      <AntExpand
        content="React Server Components allow you to render components on the server..."
        onExpand={noop}
        title="Server Components Overview"
        variant="accordion"
      />
    ),
    mantine: () => (
      <MnExpand
        content="React Server Components allow you to render components on the server..."
        onExpand={noop}
        title="Server Components Overview"
        variant="accordion"
      />
    ),
  },

  transform: {
    bootstrap: () => (
      <BsTransform
        content={demoTransformContent}
        options={demoTransformOptions}
        onTransform={noop}
        title="Content Transform"
        variant="buttons"
      />
    ),
    antd: () => (
      <AntTransform
        content={demoTransformContent}
        options={demoTransformOptions}
        onTransform={noop}
        title="Content Transform"
        variant="buttons"
      />
    ),
    mantine: () => (
      <MnTransform
        content={demoTransformContent}
        options={demoTransformOptions}
        onTransform={noop}
        title="Content Transform"
        variant="buttons"
      />
    ),
  },

  "inline-action": {
    bootstrap: () => (
      <BsInlineAction
        actions={demoInlineActions}
        onAction={noop}
        variant="toolbar"
      />
    ),
    antd: () => (
      <AntInlineAction
        actions={demoInlineActions}
        onAction={noop}
        variant="toolbar"
      />
    ),
    mantine: () => (
      <MnInlineAction
        actions={demoInlineActions}
        onAction={noop}
        variant="toolbar"
      />
    ),
  },

  "chained-action": {
    bootstrap: () => (
      <BsChainedAction
        steps={demoChainedSteps}
        onExecute={noop}
        title="Data Pipeline"
      />
    ),
    antd: () => (
      <AntChainedAction
        steps={demoChainedSteps}
        onExecute={noop}
        title="Data Pipeline"
      />
    ),
    mantine: () => (
      <MnChainedAction
        steps={demoChainedSteps}
        onExecute={noop}
        title="Data Pipeline"
      />
    ),
  },

  "data-ownership": {
    bootstrap: () => (
      <BsDataOwnership
        items={demoDataOwnershipItems}
        onDelete={noop}
        onExport={noop}
        onDeleteAll={noop}
        title="Your Data"
      />
    ),
    antd: () => (
      <AntDataOwnership
        items={demoDataOwnershipItems}
        onDelete={noop}
        onExport={noop}
        onDeleteAll={noop}
        title="Your Data"
      />
    ),
    mantine: () => (
      <MnDataOwnership
        items={demoDataOwnershipItems}
        onDelete={noop}
        onExport={noop}
        onDeleteAll={noop}
        title="Your Data"
      />
    ),
  },

  footprints: {
    bootstrap: () => (
      <BsFootprints
        entries={demoFootprintEntries}
        onEntryClick={noop}
        onClear={noop}
        title="Activity History"
        showTimestamps
      />
    ),
    antd: () => (
      <AntFootprints
        entries={demoFootprintEntries}
        onEntryClick={noop}
        onClear={noop}
        title="Activity History"
        showTimestamps
      />
    ),
    mantine: () => (
      <MnFootprints
        entries={demoFootprintEntries}
        onEntryClick={noop}
        onClear={noop}
        title="Activity History"
        showTimestamps
      />
    ),
  },

  describe: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  inpainting: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  madlibs: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  restructure: {
    bootstrap: () => (
      <BsRestructure
        content={demoRestructureContent}
        options={demoRestructureOptions}
        onRestructure={noop}
        title="Restructure Content"
      />
    ),
    antd: () => (
      <AntRestructure
        content={demoRestructureContent}
        options={demoRestructureOptions}
        onRestructure={noop}
        title="Restructure Content"
      />
    ),
    mantine: () => (
      <MnRestructure
        content={demoRestructureContent}
        options={demoRestructureOptions}
        onRestructure={noop}
        title="Restructure Content"
      />
    ),
  },

  restyle: {
    bootstrap: () => (
      <BsRestyle
        content={demoRestyleContent}
        options={demoRestyleOptions}
        onRestyle={noop}
        title="Restyle Content"
      />
    ),
    antd: () => (
      <AntRestyle
        content={demoRestyleContent}
        options={demoRestyleOptions}
        onRestyle={noop}
        title="Restyle Content"
      />
    ),
    mantine: () => (
      <MnRestyle
        content={demoRestyleContent}
        options={demoRestyleOptions}
        onRestyle={noop}
        title="Restyle Content"
      />
    ),
  },

  "saved-styles": {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },

  "voice-and-tone": {
    bootstrap: () => (
      <BsVoiceAndTone
        axes={demoVoiceToneAxes}
        onChange={noop}
        title="Voice and Tone"
        showValues
        variant="sliders"
      />
    ),
    antd: () => (
      <AntVoiceAndTone
        axes={demoVoiceToneAxes}
        onChange={noop}
        title="Voice and Tone"
        showValues
        variant="sliders"
      />
    ),
    mantine: () => (
      <MnVoiceAndTone
        axes={demoVoiceToneAxes}
        onChange={noop}
        title="Voice and Tone"
        showValues
        variant="sliders"
      />
    ),
  },

  synthesis: {
    bootstrap: () => (
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
    antd: () => (
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
    mantine: () => (
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
  },
};
