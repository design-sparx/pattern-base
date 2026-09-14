export const FRAMEWORKS = ["mantine", "antd", "shadcn"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const INSPECTOR_TABS = ["preview", "code", "props", "docs"] as const;
export type InspectorTab = (typeof INSPECTOR_TABS)[number];

export const VIEWPORTS = ["mobile", "tablet", "desktop"] as const;
export type Viewport = (typeof VIEWPORTS)[number];

export type ViewerMode = "preview" | "code";

export const DEFAULT_FRAMEWORK: Framework = "mantine";
export const DEFAULT_TAB: InspectorTab = "preview";
export const DEFAULT_VIEWPORT: Viewport = "desktop";

export interface WorkbenchState {
  framework: Framework;
  tab: InspectorTab;
  viewport: Viewport;
}

/** The workbench viewer shows code only while the tab is `code`. */
export function tabToViewer(tab: InspectorTab): ViewerMode {
  return tab === "code" ? "code" : "preview";
}

interface SearchParamsLike {
  get: (key: string) => string | null;
}

function pick<T extends string>(
  allowed: readonly T[],
  raw: string | null,
  fallback: T,
): T {
  return allowed.find((value) => value === raw) ?? fallback;
}

export function parseWorkbenchParams(params: SearchParamsLike): WorkbenchState {
  return {
    framework: pick(FRAMEWORKS, params.get("fw"), DEFAULT_FRAMEWORK),
    tab: pick(INSPECTOR_TABS, params.get("tab"), DEFAULT_TAB),
    viewport: pick(VIEWPORTS, params.get("vp"), DEFAULT_VIEWPORT),
  };
}

/** Builds a canonical query string containing only non-default values. */
export function buildWorkbenchQuery(state: WorkbenchState): string {
  const parts: string[] = [];
  if (state.framework !== DEFAULT_FRAMEWORK)
    parts.push(`fw=${state.framework}`);
  if (state.tab !== DEFAULT_TAB) parts.push(`tab=${state.tab}`);
  if (state.viewport !== DEFAULT_VIEWPORT) parts.push(`vp=${state.viewport}`);
  return parts.join("&");
}
