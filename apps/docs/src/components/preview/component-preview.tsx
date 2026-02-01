"use client";

import { Box, Paper, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { CodeBlock } from "./code-block";
import { FrameworkTabs } from "./framework-tabs";
import { codeSnippets } from "@/data/code-snippets";
import { componentRegistry } from "@/lib/registry";

interface ComponentPreviewProps {
  patternId: string;
}

export function ComponentPreview({ patternId }: ComponentPreviewProps) {
  const [tab, setTab] = useState<string | null>("preview");
  const entry = componentRegistry[patternId];
  const snippets = codeSnippets[patternId];

  if (!entry || !snippets) {
    return <Text c="gray.5">Component not found: {patternId}</Text>;
  }

  return (
    <Paper withBorder radius="md" style={{ overflow: "hidden" }}>
      <Tabs value={tab} onChange={setTab}>
        <Tabs.List
          style={{
            backgroundColor: "var(--mantine-color-gray-0)",
            borderBottom: "1px solid var(--mantine-color-gray-2)",
          }}
        >
          <Tabs.Tab value="preview" fz="sm" fw={500}>
            Preview
          </Tabs.Tab>
          <Tabs.Tab value="code" fz="sm" fw={500}>
            Code
          </Tabs.Tab>
        </Tabs.List>

        <FrameworkTabs>
          {(framework) => (
            <Box p="lg">
              {tab === "preview" ? (
                <Box mih={200}>
                  {framework === "bootstrap" ? (
                    <entry.bootstrap />
                  ) : (
                    <entry.antd />
                  )}
                </Box>
              ) : (
                <CodeBlock code={snippets[framework]} />
              )}
            </Box>
          )}
        </FrameworkTabs>
      </Tabs>
    </Paper>
  );
}
