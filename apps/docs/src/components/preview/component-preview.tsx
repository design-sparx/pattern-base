"use client";

import { Box, Group, Paper, SegmentedControl, Tabs } from "@mantine/core";
import { useState } from "react";

import { CodeBlock } from "./code-block";
import { InstallCommand } from "./install-command";

import { codeSnippets } from "@/data/snippet-templates";
import { componentRegistry } from "@/lib/registry";

const installCommands: Record<string, string> = {
  bootstrap: "pnpm add react-bootstrap bootstrap",
  antd: "pnpm add antd @ant-design/icons",
};

interface ComponentPreviewProps {
  patternId: string;
}

export function ComponentPreview({ patternId }: ComponentPreviewProps) {
  const [tab, setTab] = useState<string | null>("preview");
  const [framework, setFramework] = useState("bootstrap");
  const entry = componentRegistry[patternId];
  const snippets = codeSnippets[patternId];

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

      <Box p="md">
        <InstallCommand command={installCommands[fw]} />
      </Box>

      <Box p="lg" pt={0}>
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
