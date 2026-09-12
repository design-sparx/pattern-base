import type { PatternCategory } from "@patternbase/core";

export interface CategoryColorClasses {
  chip: string;
  text: string;
}

export const categoryColors: Record<PatternCategory, CategoryColorClasses> = {
  "prompt-actions": {
    chip: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
  },
  wayfinders: {
    chip: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-600 dark:text-teal-400",
  },
  tuners: {
    chip: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
  },
  governors: {
    chip: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  "trust-builders": {
    chip: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-600 dark:text-pink-400",
  },
};

export const defaultCategoryColors: CategoryColorClasses =
  categoryColors["prompt-actions"];

export function getCategoryColors(category: string): CategoryColorClasses {
  return category in categoryColors
    ? categoryColors[category as PatternCategory]
    : defaultCategoryColors;
}
