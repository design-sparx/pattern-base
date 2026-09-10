import { useState } from "react";

import type {
  CitationProps,
  CitationsListProps,
  InlineCitationProps,
} from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getRelevanceLabel(score: number) {
  if (score >= 0.8) return "High";
  if (score >= 0.5) return "Medium";
  return "Low";
}

export function Citation({ citation }: CitationProps) {
  const [expanded, setExpanded] = useState(false);
  const { source, url, snippet, relevance = 1 } = citation;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm font-semibold">
                  {source}
                </span>
                <Badge variant="secondary">
                  {getRelevanceLabel(relevance)} Relevance
                </Badge>
              </div>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-xs underline"
                >
                  {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                </a>
              ) : null}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            >
              {expanded ? "Hide" : "View"} excerpt
            </Button>
          </div>

          {expanded && snippet ? (
            <p className="border-primary text-muted-foreground border-l-[3px] pl-3 text-sm italic">
              &ldquo;{snippet}&rdquo;
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function CitationsList({
  citations,
  title = "Sources",
  maxVisible = 3,
}: CitationsListProps) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? citations : citations.slice(0, maxVisible);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <Badge variant="secondary">{citations.length}</Badge>
      </div>

      {display.map((c) => (
        <Citation key={c.id} citation={c} />
      ))}

      {citations.length > maxVisible ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setShowAll((prev) => !prev);
          }}
        >
          {showAll
            ? "Show fewer"
            : `Show ${String(citations.length - maxVisible)} more`}
        </Button>
      ) : null}
    </div>
  );
}

export function InlineCitation({
  citationNumber,
  source,
  url,
}: InlineCitationProps) {
  return (
    <sup>
      <a
        href={url ?? "#"}
        title={source}
        className={cn(
          "bg-primary text-primary-foreground ml-0.5 rounded px-1 text-[10px] no-underline",
        )}
      >
        [{citationNumber}]
      </a>
    </sup>
  );
}
