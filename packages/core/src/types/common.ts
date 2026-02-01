/**
 * Common types used across all AI UI components
 */

export interface GenerationState {
  status: 'idle' | 'generating' | 'success' | 'error';
  progress?: number;
  message?: string;
  result?: any;
  error?: Error;
}

export interface StreamChunk {
  id: string;
  content: string;
  done: boolean;
  metadata?: Record<string, any>;
}

export interface PromptHistoryEntry {
  id: string;
  prompt: string;
  timestamp: Date;
  response?: string;
}

export interface AIModelConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}
