"use client";

import { IconSearch } from "@tabler/icons-react";
import { cn } from "cn";
import { useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const TAG_FILTERS = [
  "all",
  "prompt",
  "generation",
  "transparency",
  "control",
  "trust",
];

interface PatternsToolbarProps {
  query: string;
  tag: string;
  count: number;
  onQueryChange: (query: string) => void;
  onTagChange: (tag: string) => void;
  className?: string;
}

export function PatternsToolbar({
  query,
  tag,
  count,
  onQueryChange,
  onTagChange,
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
      <div className="relative w-full md:w-80">
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
        value={tag}
        onValueChange={(value) => {
          if (value) onTagChange(value);
        }}
      >
        {TAG_FILTERS.map((t) => (
          <ToggleGroupItem key={t} value={t} className="capitalize">
            {t}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <span className="text-muted-foreground font-mono text-xs md:ml-auto">
        {count} pattern{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}
