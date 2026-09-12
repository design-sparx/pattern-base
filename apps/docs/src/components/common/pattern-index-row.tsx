import Link from "next/link";

import type { PatternMeta } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
}

export function PatternIndexRow({ pattern, index }: PatternIndexRowProps) {
  return (
    <Link
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      className="border-border hover:bg-muted group block border-t px-4 py-3 no-underline transition-colors md:px-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="text-muted-foreground font-mono text-xs" aria-hidden>
            {String(index + 1).padStart(3, "0")}
          </span>
        </div>
        <div className="sm:col-span-10 lg:col-span-4">
          <span className="text-foreground group-hover:text-primary font-medium transition-colors">
            {pattern.name}
          </span>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <span className="text-muted-foreground block truncate text-sm">
            {pattern.description}
          </span>
        </div>
        <div className="hidden items-center justify-end gap-1.5 lg:col-span-2 lg:flex">
          {pattern.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          <span className="text-primary font-bold opacity-0 transition-opacity group-hover:opacity-100">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
