import type { SynthesisProps } from "@patternbase/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { RefreshCw } from "lucide-react";

const insightVariant: Record<string, "default" | "secondary" | "destructive"> =
  {
    fact: "default",
    inference: "secondary",
    theme: "secondary",
  };

export function Synthesis({
  sources,
  insights,
  onSourceClick,
  onRegenerate,
  isProcessing = false,
  title = "Synthesis",
  showSources = true,
  showConfidence = false,
  variant: _variant = "aggregated",
}: SynthesisProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {isProcessing ? <Spinner className="size-3.5" /> : null}
          {sources.length > 0 ? (
            <Badge variant="secondary">{sources.length} sources</Badge>
          ) : null}
        </div>
        {onRegenerate ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            disabled={isProcessing}
          >
            <RefreshCw className="size-3.5" />
            Regenerate
          </Button>
        ) : null}
      </div>

      {insights.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            Insights
          </span>
          {insights.map((insight) => (
            <Card key={insight.id} className="p-3">
              <CardContent className="p-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {insight.type ? (
                      <Badge
                        variant={insightVariant[insight.type] ?? "secondary"}
                      >
                        {insight.type}
                      </Badge>
                    ) : null}
                    <span className="text-sm">{insight.text}</span>
                  </div>
                  {showConfidence && insight.confidence !== undefined ? (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        Confidence:
                      </span>
                      <Progress
                        value={insight.confidence * 100}
                        className="flex-1"
                      />
                      <span className="text-muted-foreground text-xs">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    </div>
                  ) : null}
                  {insight.sourceIds.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {insight.sourceIds.map((id) => {
                        const src = sources.find((s) => s.id === id);
                        return src ? (
                          <Badge
                            key={id}
                            variant="outline"
                            className={onSourceClick ? "cursor-pointer" : ""}
                            onClick={() => onSourceClick?.(id)}
                          >
                            {src.title}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {showSources && sources.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs font-medium uppercase">
            Sources
          </span>
          {sources.map((source) => (
            <Card
              key={source.id}
              className={`p-2 ${onSourceClick ? "cursor-pointer" : ""}`}
              onClick={() => onSourceClick?.(source.id)}
            >
              <CardContent className="p-0">
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-xs font-medium">{source.title}</span>
                    {source.content ? (
                      <span className="text-muted-foreground line-clamp-2 text-xs">
                        {source.content}
                      </span>
                    ) : null}
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-xs underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {source.url.length > 50
                          ? `${source.url.substring(0, 50)}...`
                          : source.url}
                      </a>
                    ) : null}
                  </div>
                  {source.relevance !== undefined ? (
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(source.relevance * 100)}% relevant
                    </Badge>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
