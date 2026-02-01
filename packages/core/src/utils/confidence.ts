/**
 * Utilities for working with confidence/relevance scores
 */

export type ConfidenceLevel = "high" | "medium" | "low";

export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 0.8) return "high";
  if (score >= 0.5) return "medium";
  return "low";
}

export function getConfidenceColor(score: number): string {
  if (score >= 0.8) return "#10b981";
  if (score >= 0.5) return "#f59e0b";
  return "#6b7280";
}

export function formatConfidence(score: number): string {
  return `${String(Math.round(score * 100))}%`;
}
