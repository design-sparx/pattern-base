"use client";

import { Box, Group, Paper, SegmentedControl, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { CodeBlock } from "./code-block";
import { codeSnippets } from "@/data/snippet-templates";
import { componentRegistry } from "@/lib/registry";

interface ComponentPreviewProps {
  patternId: string;
}

export function ComponentPreview({ patternId }: ComponentPreviewProps) {
  const [tab, setTab] = useState<string | null>("preview");
  const [framework, setFramework] = useState("bootstrap");
  const entry = componentRegistry[patternId];
  const snippets = codeSnippets[patternId];

  if (!entry || !snippets) {
    return <Text c="dimmed">Component not found: {patternId}</Text>;
  }

  const fw = framework as "bootstrap" | "antd";

  return (
    <Paper withBorder style={{ overflow: "hidden" }}>
      <Group
        justify="space-between"
        px="md"
        py="xs"
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
          backgroundColor: "var(--mantine-color-default)",
        }}
      >
        <Tabs value={tab} onChange={setTab} variant="unstyled">
          <Tabs.List>
            <Tabs.Tab
              value="preview"
              fz="sm"
              fw={tab === "preview" ? 600 : 400}
              style={{
                borderBottom:
                  tab === "preview"
                    ? "2px solid var(--mantine-color-violet-6)"
                    : "2px solid transparent",
                paddingBottom: 8,
              }}
            >
              Preview
            </Tabs.Tab>
            <Tabs.Tab
              value="code"
              fz="sm"
              fw={tab === "code" ? 600 : 400}
              style={{
                borderBottom:
                  tab === "code"
                    ? "2px solid var(--mantine-color-violet-6)"
                    : "2px solid transparent",
                paddingBottom: 8,
              }}
            >
              Code
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <SegmentedControl
          size="xs"
          value={framework}
          onChange={setFramework}
          data={[
            { label: "Bootstrap", value: "bootstrap" },
            { label: "Ant Design", value: "antd" },
          ]}
        />
      </Group>

      <Box p="lg">
        {tab === "preview" ? (
          <Box
            mih={200}
            className="dot-grid-bg"
            p="lg"
            style={{ borderRadius: 8 }}
          >
            {fw === "bootstrap" ? <entry.bootstrap /> : <entry.antd />}
          </Box>
        ) : (
          <CodeBlock code={snippets[fw]} filename={`${patternId}.tsx`} />
        )}
      </Box>
    </Paper>
  );
}
