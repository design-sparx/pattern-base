"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  type Framework,
  type InspectorTab,
  parseWorkbenchParams,
  type Viewport,
  type WorkbenchState,
} from "@/lib/workbench-params";

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
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initial = useMemo(
    () => parseWorkbenchParams(searchParams),
    [searchParams],
  );
  const [state, setState] = useState<WorkbenchState>(initial);

  // Stay truthful when the user navigates back/forward or edits the URL.
  useEffect(() => {
    setState(parseWorkbenchParams(searchParams));
  }, [searchParams]);

  const update = useCallback(
    (patch: Partial<WorkbenchState>) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        const query = buildWorkbenchQuery(next);
        const href = `/patterns/${params.category}/${params.pattern}${
          query ? `?${query}` : ""
        }`;
        startTransition(() => {
          router.replace(href, { scroll: false });
        });
        return next;
      });
    },
    [params.category, params.pattern, router],
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
