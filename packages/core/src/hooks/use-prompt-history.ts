import { useCallback, useRef, useState } from "react";

import { type PromptHistoryEntry } from "../types/common";

/**
 * Hook for managing prompt history with navigation
 */
export function usePromptHistory(maxEntries = 50) {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  const indexRef = useRef(-1);
  const [, forceRender] = useState(0);

  const addEntry = useCallback(
    (prompt: string, response?: string) => {
      const entry: PromptHistoryEntry = {
        id: crypto.randomUUID(),
        prompt,
        timestamp: new Date(),
        response,
      };
      setHistory((prev) => {
        const next = [entry, ...prev];
        return next.slice(0, maxEntries);
      });
      indexRef.current = -1;
      forceRender((n) => n + 1);
    },
    [maxEntries],
  );

  const navigateUp = useCallback(() => {
    setHistory((prev) => {
      const newIndex = Math.min(indexRef.current + 1, prev.length - 1);
      indexRef.current = newIndex;
      return prev;
    });
    forceRender((n) => n + 1);
  }, []);

  const navigateDown = useCallback(() => {
    setHistory((prev) => {
      const newIndex = Math.max(indexRef.current - 1, -1);
      indexRef.current = newIndex;
      return prev;
    });
    forceRender((n) => n + 1);
  }, []);

  const clear = useCallback(() => {
    setHistory([]);
    indexRef.current = -1;
    forceRender((n) => n + 1);
  }, []);

  return {
    history,
    currentEntry: indexRef.current >= 0 ? history[indexRef.current] : undefined,
    addEntry,
    navigateUp,
    navigateDown,
    clear,
  };
}
