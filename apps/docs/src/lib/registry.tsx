"use client";

import React from "react";

// Antd components
import {
  CitationsList as AntCitationsList,
  CostEstimate as AntCostEstimate,
  Disclosure as AntDisclosure,
  ModelManagement as AntModelManagement,
  OpenInput as AntOpenInput,
  ParameterControl as AntParameterControl,
  Regenerate as AntRegenerate,
  StreamOfThought as AntStreamOfThought,
  Suggestions as AntSuggestions,
  Variations as AntVariations,
} from "@ai-ui/antd";
// Bootstrap components
import {
  CitationsList as BsCitationsList,
  CostEstimate as BsCostEstimate,
  Disclosure as BsDisclosure,
  ModelManagement as BsModelManagement,
  OpenInput as BsOpenInput,
  ParameterControl as BsParameterControl,
  Regenerate as BsRegenerate,
  StreamOfThought as BsStreamOfThought,
  Suggestions as BsSuggestions,
  Variations as BsVariations,
} from "@ai-ui/bootstrap";
import {
  demoCitations,
  demoCostBreakdown,
  demoModels,
  demoParameters,
  demoSteps,
  demoSuggestions,
  demoVariations,
} from "@/data/demo-data";

// ── Registry ──

interface RegistryEntry {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
}

const noop = () => {};

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
  },

  "stream-of-thought": {
    bootstrap: () => (
      <BsStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
    ),
    antd: () => (
      <AntStreamOfThought steps={demoSteps} isStreaming={false} collapsible />
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
  },
};
