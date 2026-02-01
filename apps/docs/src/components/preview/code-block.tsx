"use client";

import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Paper radius="md" withBorder style={{ overflow: "hidden" }}>
      <Group
        justify="space-between"
        px="md"
        py="xs"
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        }}
      >
        <Text fz="xs" c="gray.5" tt="uppercase" ff="monospace">
          {language}
        </Text>
        <ActionIcon variant="default" size="sm" onClick={handleCopy}>
          <Text fz="xs">{copied ? "✓" : "⎘"}</Text>
        </ActionIcon>
      </Group>
      <Highlight theme={themes.github} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              margin: 0,
              padding: "16px",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <Text
                  component="span"
                  c="gray.4"
                  fz="xs"
                  ff="monospace"
                  style={{
                    userSelect: "none",
                    display: "inline-block",
                    width: 32,
                    textAlign: "right",
                    marginRight: 16,
                  }}
                >
                  {i + 1}
                </Text>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Paper>
  );
}
