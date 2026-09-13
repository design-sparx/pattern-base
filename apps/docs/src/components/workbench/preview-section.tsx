"use client";

import { Suspense } from "react";

import { PreviewPane } from "@/components/workbench/preview-pane";
import { PreviewSkeleton } from "@/components/workbench/preview-skeleton";
import { WorkbenchProvider } from "@/components/workbench/workbench-context";

interface PreviewSectionProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    shadcn: string;
  };
}

export function PreviewSection({
  patternId,
  snippets,
}: Readonly<PreviewSectionProps>) {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <WorkbenchProvider>
        <PreviewPane patternId={patternId} snippets={snippets} />
      </WorkbenchProvider>
    </Suspense>
  );
}
