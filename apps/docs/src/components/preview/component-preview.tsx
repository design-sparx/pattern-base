"use client";

import {
  ActionIcon,
  Box,
  Button,
  Code,
  Collapse,
  CopyButton,
  Group,
  Paper,
  Popover,
  SegmentedControl,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDownload,
} from "@tabler/icons-react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useState } from "react";

import { CodeBlock } from "./code-block";
import { PreviewErrorBoundary } from "./error-boundary";

import { codeSnippets } from "@/data/snippet-templates";
import { componentRegistry } from "@/lib/registry";

const installCommands: Record<string, string> = {
  bootstrap: "pnpm add react-bootstrap bootstrap",
  antd: "pnpm add antd @ant-design/icons",
  mantine:
    "pnpm add @mantine/core @mantine/hooks @mantine/dropzone @tabler/icons-react",
};

const viewports = [
  { value: "mobile", label: "Mobile", icon: IconDeviceMobile, width: 375 },
  { value: "tablet", label: "Tablet", icon: IconDeviceTablet, width: 768 },
  {
    value: "desktop",
    label: "Desktop",
    icon: IconDeviceDesktop,
    width: undefined,
  },
] as const;

interface ComponentPreviewProps {
  patternId: string;
}

export function ComponentPreview({
  patternId,
}: Readonly<ComponentPreviewProps>) {
  const { colorScheme } = useMantineColorScheme();
  const [framework, setFramework] = useState<"bootstrap" | "antd" | "mantine">(
    "bootstrap",
  );
  const [codeOpen, setCodeOpen] = useState(false);
  const [viewport, setViewport] = useState("desktop");

  const entry = componentRegistry[patternId];
  const snippets = codeSnippets[patternId];
  const fw = framework;
  const activeViewport = viewports.find((v) => v.value === viewport);
  let previewContent: React.ReactNode;

  if (fw === "bootstrap") {
    previewContent = (
      <div data-bs-theme={colorScheme}>
        <entry.bootstrap />
      </div>
    );
  } else if (fw === "antd") {
    previewContent = (
      <div className="antd-preview">
        <ConfigProvider
          theme={{
            algorithm:
              colorScheme === "dark"
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
          }}
        >
          <entry.antd />
        </ConfigProvider>
      </div>
    );
  } else {
    previewContent = <entry.mantine />;
  }

  return (
    <Box>
      {/* Framework toggle — above the card */}
      <Group justify="flex-end" mb="xs">
        <SegmentedControl
          size="xs"
          value={framework}
          onChange={(v) => {
            setFramework(v as "bootstrap" | "antd" | "mantine");
          }}
          data={[
            { label: "Bootstrap", value: "bootstrap" },
            { label: "Ant Design", value: "antd" },
            { label: "Mantine", value: "mantine" },
          ]}
        />
      </Group>

      <Paper withBorder style={{ overflow: "hidden" }}>
        {/* Toolbar */}
        <Group
          justify="space-between"
          px="md"
          py={6}
          style={{
            borderBottom: "1px solid var(--mantine-color-default-border)",
            backgroundColor: "var(--mantine-color-default)",
          }}
        >
          {/* Viewport controls — left side */}
          <ActionIcon.Group>
            {viewports.map((vp) => (
              <Tooltip key={vp.value} label={vp.label} withArrow>
                <ActionIcon
                  variant={viewport === vp.value ? "light" : "default"}
                  color={viewport === vp.value ? "violet" : "gray"}
                  size="sm"
                  aria-label={vp.label}
                  aria-pressed={viewport === vp.value}
                  onClick={() => {
                    setViewport(vp.value);
                  }}
                >
                  <vp.icon size={14} />
                </ActionIcon>
              </Tooltip>
            ))}
          </ActionIcon.Group>

          {/* Action controls — right side */}
          <Group gap="xs">
            {/* Install popover */}
            <Popover width={360} position="bottom-end" shadow="md" withArrow>
              <Popover.Target>
                <Button
                  variant="subtle"
                  color="gray"
                  size="compact-xs"
                  leftSection={<IconDownload size={14} />}
                >
                  Install
                </Button>
              </Popover.Target>
              <Popover.Dropdown p="sm">
                <Group justify="space-between" gap="xs">
                  <Code fz="sm" style={{ flex: 1 }}>
                    {installCommands[fw]}
                  </Code>
                  <CopyButton value={installCommands[fw]}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? "Copied!" : "Copy"} withArrow>
                        <ActionIcon
                          variant="subtle"
                          color={copied ? "green" : "gray"}
                          size="sm"
                          aria-label={
                            copied ? "Copied!" : "Copy install command"
                          }
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck size={14} />
                          ) : (
                            <IconCopy size={14} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Popover.Dropdown>
            </Popover>

            {/* Code toggle */}
            <Button
              variant={codeOpen ? "light" : "subtle"}
              color={codeOpen ? "violet" : "gray"}
              size="compact-xs"
              leftSection={<IconCode size={14} />}
              aria-expanded={codeOpen}
              onClick={() => {
                setCodeOpen((o) => !o);
              }}
            >
              {codeOpen ? "Hide Code" : "Show Code"}
            </Button>
          </Group>
        </Group>

        {/* Preview area */}
        <Box p="md">
          <Box
            mih={120}
            className="dot-grid-bg"
            p="md"
            style={{
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              w="100%"
              maw={activeViewport?.width}
              style={{
                transition: "max-width 200ms ease",
              }}
            >
              <PreviewErrorBoundary patternId={patternId}>
                {previewContent}
              </PreviewErrorBoundary>
            </Box>
          </Box>
        </Box>

        {/* Collapsible code panel */}
        <Collapse in={codeOpen}>
          <Box
            px="md"
            pb="md"
            style={{
              borderTop: "1px solid var(--mantine-color-default-border)",
            }}
            pt="md"
          >
            <CodeBlock code={snippets[fw]} filename={`${patternId}.tsx`} />
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
