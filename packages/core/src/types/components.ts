import { ReactNode } from 'react';

/**
 * Base component props shared across all AI UI components
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

/**
 * Pattern metadata for the registry
 */
export interface PatternMeta {
  id: string;
  name: string;
  slug: string;
  category: PatternCategory;
  description: string;
  tags: string[];
}

export type PatternCategory =
  | 'prompt-actions'
  | 'wayfinders'
  | 'tuners'
  | 'governors'
  | 'trust-builders';

export interface CategoryInfo {
  id: PatternCategory;
  name: string;
  description: string;
  icon: string;
}
