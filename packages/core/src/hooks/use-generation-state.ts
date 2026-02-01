import { useState, useCallback } from 'react';
import { GenerationState } from '../types/common';

/**
 * Lightweight hook for tracking generation state
 */
export function useGenerationState(initialState?: Partial<GenerationState>) {
  const [state, setState] = useState<GenerationState>({
    status: 'idle',
    ...initialState,
  });

  const setIdle = useCallback(() => setState({ status: 'idle' }), []);
  const setGenerating = useCallback(
    (message?: string) => setState({ status: 'generating', message }),
    []
  );
  const setSuccess = useCallback(
    (result: any) => setState({ status: 'success', result }),
    []
  );
  const setError = useCallback(
    (error: Error) => setState({ status: 'error', error }),
    []
  );

  return { state, setIdle, setGenerating, setSuccess, setError };
}
