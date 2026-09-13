"use client";

import { Suspense, useEffect } from "react";

import { PreviewPane } from "./preview-pane";
import { PreviewSkeleton } from "./preview-skeleton";
import { useWorkbench, WorkbenchProvider } from "./workbench-context";

import {
  DocsCard,
  type RelatedPatternLink,
} from "@/components/preview/docs-card";
import { PropsTable } from "@/components/preview/props-table";
import type { PatternExplanation } from "@/data/pattern-explanations";
import type { PropDefinition } from "@/data/props-data";

interface WorkbenchProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    shadcn: string;
  };
  explanation?: PatternExplanation | null;
  propDefinitions?: PropDefinition[];
  relatedLinks?: readonly RelatedPatternLink[];
}

export function Workbench({
  patternId,
  snippets,
  explanation,
  propDefinitions,
  relatedLinks,
}: Readonly<WorkbenchProps>) {
  return (
    <Suspense fallback={<WorkbenchSkeleton />}>
      <WorkbenchProvider>
        <WorkbenchContent
          patternId={patternId}
          snippets={snippets}
          explanation={explanation}
          propDefinitions={propDefinitions}
          relatedLinks={relatedLinks}
        />
      </WorkbenchProvider>
    </Suspense>
  );
}

function WorkbenchContent(props: WorkbenchProps) {
  const { tab } = useWorkbench();

  // Deep-linked ?tab=props|docs scroll the always-visible cards into view.
  useEffect(() => {
    if (tab !== "props" && tab !== "docs") return;
    const id = tab === "props" ? "pattern-props" : "pattern-docs";
    document
      .getElementById(id)
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [tab]);

  return (
    <div className="flex flex-col gap-4">
      <div className="min-w-0">
        <PreviewPane patternId={props.patternId} snippets={props.snippets} />
      </div>

      {(props.propDefinitions?.length ?? props.explanation) ? (
        <div className="grid gap-4 md:grid-cols-2">
          {props.propDefinitions?.length ? (
            <div id="pattern-props" className="min-w-0 scroll-mt-28">
              <PropsTable props={props.propDefinitions} />
            </div>
          ) : null}
          {props.explanation ? (
            <div id="pattern-docs" className="min-w-0 scroll-mt-28">
              <DocsCard
                explanation={props.explanation}
                relatedLinks={props.relatedLinks ?? []}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function WorkbenchSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="border-border bg-muted/40 overflow-hidden rounded-2xl border p-4 shadow-sm">
        <PreviewSkeleton />
      </div>
    </div>
  );
}
