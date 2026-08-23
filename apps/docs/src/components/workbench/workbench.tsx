"use client";

import { Suspense } from "react";

import { InspectorPane } from "./inspector-pane";
import { PreviewPane } from "./preview-pane";
import { WorkbenchProvider } from "./workbench-context";

import styles from "./workbench.module.css";

import type { PropDefinition } from "@/data/props-data";

type Explanation = Parameters<typeof InspectorPane>[0]["explanation"];

interface WorkbenchProps {
  patternId: string;
  snippets: { bootstrap: string; antd: string; mantine: string };
  explanation: Explanation;
  propDefinitions?: PropDefinition[];
}

export function Workbench({
  patternId,
  snippets,
  explanation,
  propDefinitions,
}: Readonly<WorkbenchProps>) {
  return (
    // Suspense must wrap the provider itself: WorkbenchProvider calls
    // useSearchParams(), which needs a boundary for static prerender.
    <Suspense fallback={null}>
      <WorkbenchProvider>
        <div className={styles.grid}>
          <div className={styles.previewCell}>
            <PreviewPane patternId={patternId} />
          </div>
          <div className={styles.inspectorCell}>
            <InspectorPane
              patternId={patternId}
              snippets={snippets}
              propsDefinitions={propDefinitions}
              explanation={explanation}
            />
          </div>
        </div>
      </WorkbenchProvider>
    </Suspense>
  );
}
