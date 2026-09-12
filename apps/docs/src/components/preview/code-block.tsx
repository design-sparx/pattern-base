"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";

import { Button } from "@/components/ui/button";

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
    <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
      <div
        className="flex items-center justify-between border-b border-white/10 bg-[#1e1e2e] px-4 py-1.5"
        style={{ minHeight: 40 }}
      >
        <span className="font-mono text-xs text-gray-400">
          {filename ?? language.toUpperCase()}
        </span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            void handleCopy();
          }}
          className="text-gray-400 hover:text-gray-200"
        >
          {copied ? (
            <IconCheck size={14} className="text-green-400" />
          ) : (
            <IconCopy size={14} />
          )}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            tabIndex={0}
            className="m-0 overflow-auto p-4 text-sm"
            style={{
              ...style,
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            {tokens.map((line, lineIndex) => (
              <div
                key={`line-${String(lineIndex)}`}
                {...getLineProps({ line })}
                className="flex"
              >
                <span className="mr-4 inline-block w-8 flex-shrink-0 select-none text-right font-mono text-xs text-gray-500">
                  {lineIndex + 1}
                </span>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span
                      key={`token-${String(tokenIndex)}`}
                      {...getTokenProps({ token })}
                    />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
