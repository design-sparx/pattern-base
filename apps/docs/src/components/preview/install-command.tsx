"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface InstallCommandProps {
  command: string;
}

export function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Install
          </span>
          <code className="text-sm">{command}</code>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy install command"}
          title={copied ? "Copied!" : "Copy"}
        >
          {copied ? (
            <IconCheck size={14} className="text-green-600" />
          ) : (
            <IconCopy size={14} />
          )}
        </Button>
      </div>
    </div>
  );
}
