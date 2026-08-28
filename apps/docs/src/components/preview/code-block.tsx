"use client";

import { Box, Button, Group, Paper, Text } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
}: Readonly<CodeBlockProps>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Paper
      radius="md"
      style={{
        overflow: "hidden",
        border: "1px solid var(--mantine-color-default-border)",
      }}
    >
      <Group
        justify="space-between"
        px="md"
        py="xs"
        style={{
          backgroundColor: "#1e1e2e",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: 40,
        }}
      >
        <Text fz="xs" c="gray.5" ff="monospace">
          {filename ?? language.toUpperCase()}
        </Text>
        <Button
          variant="subtle"
          color={copied ? "green" : "gray"}
          size="compact-xs"
          leftSection={
            copied ? <IconCheck size={14} /> : <IconCopy size={14} />
          }
          onClick={() => {
            void handleCopy();
          }}
          styles={{
            label: { fontSize: "var(--mantine-font-size-xs)" },
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Group>
      {/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- a horizontally scrollable code region must be keyboard-focusable (axe scrollable-region-focusable) */}
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            tabIndex={0}
            style={{
              ...style,
              margin: 0,
              padding: "16px",
              overflow: "auto",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            {tokens.map((line, lineIndex) => (
              <Box
                key={`line-${String(lineIndex)}`}
                {...getLineProps({ line })}
                component="div"
                style={{ display: "flex" }}
              >
                <Text
                  component="span"
                  c="gray.6"
                  fz="xs"
                  ff="monospace"
                  style={{
                    userSelect: "none",
                    display: "inline-block",
                    width: 32,
                    textAlign: "right",
                    marginRight: 16,
                    flexShrink: 0,
                  }}
                >
                  {lineIndex + 1}
                </Text>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span
                      key={`token-${String(tokenIndex)}`}
                      {...getTokenProps({ token })}
                    />
                  ))}
                </span>
              </Box>
            ))}
          </pre>
        )}
      </Highlight>
      {/* eslint-enable jsx-a11y/no-noninteractive-tabindex -- re-enable after the scrollable code region */}
    </Paper>
  );
}
