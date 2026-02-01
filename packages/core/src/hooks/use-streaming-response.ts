import { useCallback, useRef, useState } from "react";

import { type StreamChunk } from "../types/common";

/**
 * Hook for managing streaming AI responses
 */
export function useStreamingResponse() {
  const [chunks, setChunks] = useState<StreamChunk[]>([]);
  const [fullText, setFullText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(() => {
    setChunks([]);
    setFullText("");
    setIsStreaming(true);
    abortRef.current = new AbortController();
  }, []);

  const appendChunk = useCallback((chunk: StreamChunk) => {
    setChunks((prev) => [...prev, chunk]);
    setFullText((prev) => prev + chunk.content);
    if (chunk.done) {
      setIsStreaming(false);
    }
  }, []);

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setChunks([]);
    setFullText("");
    setIsStreaming(false);
  }, []);

  return {
    chunks,
    fullText,
    isStreaming,
    startStream,
    appendChunk,
    stopStream,
    reset,
    abortSignal: abortRef.current?.signal,
  };
}
