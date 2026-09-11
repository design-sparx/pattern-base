"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PatternFilterTabsProps {
  categories?: string[];
  selected?: string;
  onChange?: (value: string) => void;
}

const DEFAULT_CATEGORIES = [
  "All",
  "Prompt Actions",
  "Generation States",
  "Context Management",
  "Error Handling",
];

export function PatternFilterTabs({
  categories = DEFAULT_CATEGORIES,
  selected = "All",
  onChange,
}: PatternFilterTabsProps) {
  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(value) => onChange?.(value)}
      className="flex-wrap"
    >
      {categories.map((category) => (
        <ToggleGroupItem
          key={category}
          value={category}
          aria-label={category}
          className="border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary rounded-full border px-3 py-1 text-xs font-medium"
        >
          {category}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
