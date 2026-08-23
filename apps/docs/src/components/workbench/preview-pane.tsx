"use client";

import {
  ActionIcon,
  Box,
  Button,
  Code,
  CopyButton,
  Group,
  Paper,
  Popover,
  SegmentedControl,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconCheck,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDownload,
} from "@tabler/icons-react";
import { useEffect } from "react";

import {
  LazyAntdSlot,
  LazyBootstrapSlot,
  LazyMantineSlot,
  preloadInactiveSlots,
} from "./framework-slots";
import { useWorkbench } from "./workbench-context";

import { PreviewErrorBoundary } from "@/components/preview/error-boundary";
import {
  type Framework,
  type Viewport,
  VIEWPORTS,
} from "@/lib/workbench-params";

const viewportIcons: Record<Viewport, React.ElementType> = {
  mobile: IconDeviceMobile,
  tablet: IconDeviceTablet,
  desktop: IconDeviceDesktop,
};

const viewportWidths: Record<Viewport, number | undefined> = {
  mobile: 375,
  tablet: 768,
  desktop: undefined,
};

const INSTALL_COMMANDS: Record<string, string> = {
  bootstrap: "pnpm add react-bootstrap bootstrap",
  antd: "pnpm add antd @ant-design/icons",
  mantine:
    "pnpm add @mantine/core @mantine/hooks @mantine/dropzone @tabler/icons-react",
};

const FRAMEWORK_SLOTS: Record<Framework, React.ElementType> = {
  bootstrap: LazyBootstrapSlot,
  antd: LazyAntdSlot,
  mantine: LazyMantineSlot,
};

export function PreviewPane({ patternId }: Readonly<{ patternId: string }>) {
  const { framework, viewport, setFramework, setViewport } = useWorkbench();
  const ActiveSlot = FRAMEWORK_SLOTS[framework];

  // Warm the other framework chunks once, after first paint.
  useEffect(() => {
    preloadInactiveSlots(framework);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once on mount only
  }, []);

  return (
    <Paper withBorder style={{ overflow: "hidden" }}>
      {/* Toolbar */}
      <Group
        justify="space-between"
        wrap="nowrap"
        px="md"
        py={6}
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <ActionIcon.Group>
          {VIEWPORTS.map((vp) => {
            const Icon = viewportIcons[vp];
            const label = vp.charAt(0).toUpperCase() + vp.slice(1);
            return (
              <Tooltip key={vp} label={label} withArrow>
                <ActionIcon
                  variant={viewport === vp ? "light" : "default"}
                  color={viewport === vp ? "violet" : "gray"}
                  size="sm"
                  aria-label={label}
                  aria-pressed={viewport === vp}
                  onClick={() => {
                    setViewport(vp);
                  }}
                >
                  <Icon size={14} />
                </ActionIcon>
              </Tooltip>
            );
          })}
        </ActionIcon.Group>

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
                {INSTALL_COMMANDS[framework]}
              </Code>
              <CopyButton value={INSTALL_COMMANDS[framework]}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied!" : "Copy"} withArrow>
                    <ActionIcon
                      variant="subtle"
                      color={copied ? "green" : "gray"}
                      size="sm"
                      aria-label={copied ? "Copied!" : "Copy install command"}
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
      </Group>

      {/* Framework selector */}
      <Group
        justify="center"
        py="xs"
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <SegmentedControl
          size="xs"
          value={framework}
          onChange={(value) => {
            setFramework(value as Framework);
          }}
          data={[
            { label: "Bootstrap", value: "bootstrap" },
            { label: "Ant Design", value: "antd" },
            { label: "Mantine", value: "mantine" },
          ]}
        />
      </Group>

      {/* Live preview */}
      <Box p="md">
        <Box
          className="dot-grid-bg"
          mih={180}
          p="md"
          style={{ borderRadius: 8, display: "flex", justifyContent: "center" }}
        >
          <Box
            w="100%"
            maw={viewportWidths[viewport]}
            style={{ transition: "max-width 200ms ease" }}
          >
            <PreviewErrorBoundary patternId={patternId}>
              <ActiveSlot patternId={patternId} />
            </PreviewErrorBoundary>
          </Box>
        </Box>
        <Text c="dimmed" fz="xs" ta="center" mt="xs">
          Rendered live from <Code>@patternbase/{framework}</Code>
        </Text>
      </Box>
    </Paper>
  );
}
