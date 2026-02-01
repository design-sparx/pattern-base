import { useState, useCallback } from 'react';
import { PromptHistoryEntry } from '../types/common';

/**
 * Hook for managing prompt history with navigation
 */
export function usePromptHistory(maxEntries = 50) {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  const [index, setIndex] = useState(-1);

  const addEntry = useCallback(
    (prompt: string, response?: string) => {
      const entry: PromptHistoryEntry = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        prompt,
        timestamp: new Date(),
        response,
      };
      setHistory((prev) => {
        const next = [entry, ...prev];
        return next.slice(0, maxEntries);
      });
      setIndex(-1);
    },
    [maxEntries]
  );

  const navigateUp = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, history.length - 1));
    return history[Math.min(index + 1, history.length - 1)];
  }, [history, index]);

  const navigateDown = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, -1));
    return index - 1 >= 0 ? history[index - 1] : undefined;
  }, [history, index]);

  const clear = useCallback(() => {
    setHistory([]);
    setIndex(-1);
  }, []);

  return {
    history,
    currentEntry: index >= 0 ? history[index] : undefined,
    addEntry,
    navigateUp,
    navigateDown,
    clear,
  };
}
