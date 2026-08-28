"use client";

import { useParams, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { preloadInactiveSlots } from "./framework-slots";

import {
  buildWorkbenchQuery,
  DEFAULT_FRAMEWORK,
  DEFAULT_TAB,
  DEFAULT_VIEWPORT,
  type Framework,
  type InspectorTab,
  parseWorkbenchParams,
  type Viewport,
  type WorkbenchState,
} from "@/lib/workbench-params";

/**
 * The island must prerender static HTML, so it cannot read search params
 * during render (useSearchParams forces a CSR bailout that removes the whole
 * subtree from the server output). We render these documented defaults on the
 * server, then apply the real URL state post-hydration in a mount effect.
 */
const DEFAULT_STATE: WorkbenchState = {
  framework: DEFAULT_FRAMEWORK,
  tab: DEFAULT_TAB,
  viewport: DEFAULT_VIEWPORT,
};

interface WorkbenchContextValue extends WorkbenchState {
  isPending: boolean;
  setFramework: (fw: Framework) => void;
  setTab: (tab: InspectorTab) => void;
  setViewport: (vp: Viewport) => void;
}

const WorkbenchContext = createContext<WorkbenchContextValue | null>(null);

export function WorkbenchProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const params = useParams<{
    category: string;
    pattern: string;
  }>();
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<WorkbenchState>(DEFAULT_STATE);

  // Apply the URL once after hydration; plain setState so no history churn.
  useEffect(() => {
    setState(parseWorkbenchParams(new URLSearchParams(window.location.search)));
  }, []);

  // Stay truthful when the user navigates back/forward.
  useEffect(() => {
    const onPopState = () => {
      setState(
        parseWorkbenchParams(new URLSearchParams(window.location.search)),
      );
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const update = useCallback(
    (patch: Partial<WorkbenchState>) => {
      const next = { ...state, ...patch };
      setState(next);
      const query = buildWorkbenchQuery(next);
      const href = `/patterns/${params.category}/${params.pattern}${
        query ? `?${query}` : ""
      }`;
      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [state, params.category, params.pattern, router],
  );

  const setFramework = useCallback(
    (framework: Framework) => {
      update({ framework });
      preloadInactiveSlots(framework); // no-op for the just-loaded one
    },
    [update],
  );

  const setTab = useCallback(
    (tab: InspectorTab) => {
      update({ tab });
    },
    [update],
  );

  const setViewport = useCallback(
    (viewport: Viewport) => {
      update({ viewport });
    },
    [update],
  );

  const value = useMemo<WorkbenchContextValue>(
    () => ({ ...state, isPending, setFramework, setTab, setViewport }),
    [state, isPending, setFramework, setTab, setViewport],
  );

  return (
    <WorkbenchContext.Provider value={value}>
      {children}
    </WorkbenchContext.Provider>
  );
}

export function useWorkbench(): WorkbenchContextValue {
  const ctx = useContext(WorkbenchContext);
  if (!ctx)
    throw new Error("useWorkbench must be used within WorkbenchProvider");
  return ctx;
}
