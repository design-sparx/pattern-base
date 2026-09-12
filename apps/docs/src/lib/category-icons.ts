import {
  type Icon,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconSettings,
  IconShield,
} from "@tabler/icons-react";

export const categoryIcons: Record<string, Icon> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconSettings,
  governors: IconEye,
  "trust-builders": IconShield,
};

export const defaultCategoryIcon: Icon = IconLayoutGrid;

export function getCategoryIcon(category: string): Icon {
  return categoryIcons[category] ?? defaultCategoryIcon;
}
