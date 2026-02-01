"use client";

import { ActionIcon, Box, Group, Paper, Text, Tooltip } from "@mantine/core";
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
}: CodeBlockProps) {
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
        }}
      >
        <Text fz="xs" c="gray.5" ff="monospace">
          {filename ?? language.toUpperCase()}
        </Text>
        <Tooltip label={copied ? "Copied!" : "Copy code"} withArrow>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? (
              <IconCheck size={14} color="var(--mantine-color-green-4)" />
            ) : (
              <IconCopy size={14} color="var(--mantine-color-gray-5)" />
            )}
          </ActionIcon>
        </Tooltip>
      </Group>
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              margin: 0,
              padding: "16px",
              overflow: "auto",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            {tokens.map((line, i) => (
              <Box
                key={i}
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
                  {i + 1}
                </Text>
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </Box>
            ))}
          </pre>
        )}
      </Highlight>
    </Paper>
  );
}
