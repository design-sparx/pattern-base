"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories } from "@/data/patterns";

interface PatternFilterTabItem {
  value: string;
  label: string;
}

interface PatternFilterTabsProps {
  items?: PatternFilterTabItem[];
  selected?: string;
  onChange?: (value: string) => void;
}

const DEFAULT_ITEMS: PatternFilterTabItem[] = [
  { value: "all", label: "All" },
  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
];

export function PatternFilterTabs({
  items = DEFAULT_ITEMS,
  selected = "all",
  onChange,
}: PatternFilterTabsProps) {
  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(value) => {
        if (value) onChange?.(value);
      }}
      className="flex-wrap"
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          aria-label={item.label}
          className="border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary rounded-full border px-3 py-1 text-xs font-medium"
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
