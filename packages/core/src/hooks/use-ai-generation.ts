import { useCallback, useState } from "react";

import { type GenerationState } from "../types/common";

/**
 * Hook for managing AI generation lifecycle
 */
export function useAIGeneration() {
  const [state, setState] = useState<GenerationState>({
    status: "idle",
  });

  const startGeneration = useCallback(() => {
    setState({ status: "generating", progress: 0 });
  }, []);

  const updateProgress = useCallback((progress: number, message?: string) => {
    setState((prev) => ({ ...prev, progress, message }));
  }, []);

  const completeGeneration = useCallback((result: unknown) => {
    setState({ status: "success", result, progress: 100 });
  }, []);

  const failGeneration = useCallback((error: Error) => {
    setState({ status: "error", error });
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return {
    state,
    isGenerating: state.status === "generating",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    startGeneration,
    updateProgress,
    completeGeneration,
    failGeneration,
    reset,
  };
}
