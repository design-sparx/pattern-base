"use client";

import { IconBulb, IconCircleCheck, IconTarget } from "@tabler/icons-react";
import Link from "next/link";

import { useWorkbench } from "./workbench-context";

import { CodeBlock } from "@/components/preview/code-block";
import { PropsTable } from "@/components/preview/props-table";
import type { PatternExplanation } from "@/data/pattern-explanations";
import type { PropDefinition } from "@/data/props-data";
import { INSPECTOR_TABS, type InspectorTab } from "@/lib/workbench-params";

/** A related pattern resolved to a route; `href` is absent when unresolved. */
export interface RelatedPatternLink {
  label: string;
  href?: string;
}

interface InspectorPaneProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    shadcn: string;
  };
  propDefinitions?: PropDefinition[];
  explanation?: PatternExplanation | null;
  relatedLinks?: readonly RelatedPatternLink[];
}

const TAB_STYLES: Record<string, string> = {
  base: "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
  active: "border-b-2 border-violet-600 text-gray-900 dark:text-gray-100",
};

export function InspectorPane({
  patternId,
  snippets,
  propDefinitions,
  explanation,
  relatedLinks,
}: Readonly<InspectorPaneProps>) {
  const { framework, tab, setTab } = useWorkbench();

  const isTabAvailable = (candidate: InspectorTab) => {
    if (candidate === "props") return Boolean(propDefinitions?.length);
    if (candidate === "docs") return Boolean(explanation);
    return true;
  };

  const activeTab: InspectorTab = isTabAvailable(tab) ? tab : "code";

  const renderTab = (value: InspectorTab, label: string) => {
    const isActive = activeTab === value;
    return (
      <button
        key={value}
        onClick={() => setTab(value)}
        className={[
          TAB_STYLES.base,
          isActive ? TAB_STYLES.active : "border-b-2 border-transparent",
        ].join(" ")}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex w-full border-b border-gray-200 dark:border-gray-700">
        {renderTab("code", "Code")}
        {propDefinitions?.length ? renderTab("props", "Props") : null}
        {explanation ? renderTab("docs", "Docs") : null}
      </div>

      <div className="p-4">
        {activeTab === "code" && (
          <CodeBlock code={snippets[framework]} filename={`${patternId}.tsx`} />
        )}
        {activeTab === "props" && propDefinitions?.length && (
          <PropsTable props={propDefinitions} />
        )}
        {activeTab === "docs" && explanation && (
          <InspectorDocs
            explanation={explanation}
            relatedLinks={relatedLinks ?? []}
          />
        )}
      </div>
    </div>
  );
}

function InspectorDocs({
  explanation,
  relatedLinks,
}: {
  explanation: PatternExplanation;
  relatedLinks: readonly RelatedPatternLink[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {explanation.overview}
      </p>

      {explanation.variants.length ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center rounded-md bg-violet-100 p-1 dark:bg-violet-900/30">
              <IconBulb
                size={14}
                className="text-violet-600 dark:text-violet-400"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Variants
            </h3>
          </div>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {explanation.variants.map((v) => (
              <li key={v.title}>
                <span>
                  <b>{v.title}</b> — {v.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {explanation.useCases.length ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center rounded-md bg-violet-100 p-1 dark:bg-violet-900/30">
              <IconTarget
                size={14}
                className="text-violet-600 dark:text-violet-400"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Use Cases
            </h3>
          </div>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {explanation.useCases.map((uc) => (
              <li key={uc}>{uc}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {explanation.bestPractices.length ? (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center rounded-md bg-teal-100 p-1 dark:bg-teal-900/30">
              <IconCircleCheck
                size={14}
                className="text-teal-600 dark:text-teal-400"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Best Practices
            </h3>
          </div>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {explanation.bestPractices.map((bp) => (
              <li key={bp}>{bp}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedLinks.length ? (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Related Patterns
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {relatedLinks.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex cursor-pointer items-center rounded-md bg-violet-100 px-2.5 py-0.5 text-sm font-medium text-violet-800 no-underline hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
                >
                  {link.label}
                </Link>
              ) : (
                <span
                  key={link.label}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                >
                  {link.label}
                </span>
              ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
