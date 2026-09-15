"use client";

import { IconSearch } from "@tabler/icons-react";
import { cn } from "cn";
import { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { categories, getPatternsByCategory, patterns } from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

interface PatternsToolbarProps {
  query: string;
  activeCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function PatternsToolbar({
  query,
  activeCategory,
  onQueryChange,
  onCategoryChange,
  className,
}: PatternsToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable;

      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !editing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        e.preventDefault();
        inputRef.current?.blur();
        onQueryChange("");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onQueryChange]);

  return (
    <div
      className={cn(
        "border-border bg-background/80 flex flex-wrap items-center gap-3 rounded-2xl border px-3 py-2.5 shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="relative w-full md:w-72">
        <IconSearch
          className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          ref={inputRef}
          placeholder="Filter patterns…"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
          className="pl-9"
          aria-label="Filter patterns by name or keyword"
        />
      </div>

      <ToggleGroup
        type="single"
        variant="outline"
        value={activeCategory}
        onValueChange={(value) => {
          if (value) onCategoryChange(value);
        }}
        className="flex-wrap"
      >
        <ToggleGroupItem
          value="all"
          className="text-muted-foreground data-[state=on]:text-foreground flex-none gap-1.5 rounded-full px-3"
        >
          All patterns
          <span className="font-mono text-xs opacity-70">
            {patterns.length}
          </span>
        </ToggleGroupItem>
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.id);
          return (
            <ToggleGroupItem
              key={category.id}
              value={category.id}
              className="text-muted-foreground data-[state=on]:text-foreground flex-none gap-1.5 rounded-full px-3"
            >
              <Icon className="size-3.5" aria-hidden />
              {category.name}
              <span className="font-mono text-xs opacity-70">
                {getPatternsByCategory(category.id).length}
              </span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
