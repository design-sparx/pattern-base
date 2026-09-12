"use client";

import { Suspense } from "react";

import { InspectorPane, type RelatedPatternLink } from "./inspector-pane";
import { PreviewPane } from "./preview-pane";
import { PreviewSkeleton } from "./preview-skeleton";
import { WorkbenchProvider } from "./workbench-context";

import styles from "./workbench.module.css";

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
    // The fallback mirrors the real grid so layout dimensions do not jump
    // when the boundary resolves.
    <Suspense
      fallback={
        <div className={styles.grid} aria-hidden>
          <div className={styles.previewCell}>
            <PreviewSkeleton />
          </div>
          <div className={styles.inspectorCell} />
        </div>
      }
    >
      <WorkbenchProvider>
        <div className={styles.grid}>
          <div className={styles.previewCell}>
            <PreviewPane patternId={patternId} />
          </div>
          <div className={styles.inspectorCell}>
            <InspectorPane
              patternId={patternId}
              snippets={snippets}
              propDefinitions={propDefinitions}
              explanation={explanation}
              relatedLinks={relatedLinks}
            />
          </div>
        </div>
      </WorkbenchProvider>
    </Suspense>
  );
}
