import Link from "next/link";
import { Fragment } from "react";

import type { PatternMeta } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { highlightQuery } from "@/lib/highlight-query";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
  query?: string;
}

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query) return text;
  return highlightQuery(text, query).map((seg) =>
    seg.match ? (
      <mark
        key={seg.offset}
        className="text-primary bg-transparent font-semibold"
      >
        {seg.text}
      </mark>
    ) : (
      <Fragment key={seg.offset}>{seg.text}</Fragment>
    ),
  );
}

export function PatternIndexRow({
  pattern,
  index,
  query = "",
}: PatternIndexRowProps) {
  const shownTags = pattern.tags.slice(0, 2);
  const overflowTags = pattern.tags.length - shownTags.length;

  return (
    <Link
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      className="hover:bg-muted group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 no-underline transition-colors"
    >
      <span className="text-muted-foreground font-mono text-xs" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="text-foreground group-hover:text-primary block text-sm font-medium transition-colors">
          <Highlighted text={pattern.name} query={query} />
        </span>
        <span className="text-muted-foreground mt-0.5 hidden truncate text-xs sm:block">
          <Highlighted text={pattern.description} query={query} />
        </span>
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="bg-primary/10 text-primary rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold"
          title="Ships in all four UI libraries"
        >
          ×4
        </span>
        {shownTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="hidden lg:inline-flex"
          >
            {tag}
          </Badge>
        ))}
        {overflowTags > 0 && (
          <Badge
            variant="outline"
            className="hidden border-dashed lg:inline-flex"
          >
            +{overflowTags}
          </Badge>
        )}
        <span
          className="text-primary text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          →
        </span>
      </span>
    </Link>
  );
}
