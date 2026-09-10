import { GitBranch, RotateCcw } from "lucide-react";

import type { DraftModeProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DraftMode({
  drafts,
  activeDraftId,
  onSelectDraft,
  onRevertToDraft,
  onBranchFromDraft,
  title = "Draft History",
  variant = "list",
}: DraftModeProps) {
  const renderDraft = (draft: (typeof drafts)[0]) => {
    if (variant === "timeline") {
      return (
        <div key={draft.id} className="flex flex-col gap-1 border-l-2 pl-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${activeDraftId === draft.id ? "font-semibold" : ""} cursor-pointer`}
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectDraft(draft.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDraft(draft.id);
                }
              }}
            >
              {draft.label ?? `Draft ${String(draft.number)}`}
            </span>
            {activeDraftId === draft.id ? (
              <Badge variant="secondary">Active</Badge>
            ) : null}
          </div>
          {draft.preview ? (
            <span className="text-muted-foreground line-clamp-1 text-xs">
              {draft.preview}
            </span>
          ) : null}
          {draft.createdAt ? (
            <span className="text-muted-foreground text-xs">
              {draft.createdAt.toLocaleString()}
            </span>
          ) : null}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={() => {
                onRevertToDraft(draft.id);
              }}
            >
              <RotateCcw className="size-3" />
              Revert
            </Button>
            {onBranchFromDraft ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7"
                onClick={() => {
                  onBranchFromDraft(draft.id);
                }}
              >
                <GitBranch className="size-3" />
                Branch
              </Button>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <Card
        key={draft.id}
        className={`cursor-pointer p-3 ${activeDraftId === draft.id ? "ring-primary ring-2" : ""}`}
        onClick={() => {
          onSelectDraft(draft.id);
        }}
      >
        <CardContent className="p-0">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {draft.label ?? `Draft ${String(draft.number)}`}
                </span>
                {activeDraftId === draft.id ? (
                  <Badge variant="secondary">Active</Badge>
                ) : null}
              </div>
              {draft.preview ? (
                <span className="text-muted-foreground line-clamp-1 text-xs">
                  {draft.preview}
                </span>
              ) : null}
              {draft.createdAt ? (
                <span className="text-muted-foreground text-xs">
                  {draft.createdAt.toLocaleString()}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevertToDraft(draft.id);
                }}
              >
                <RotateCcw className="size-3" />
                Revert
              </Button>
              {onBranchFromDraft ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBranchFromDraft(draft.id);
                  }}
                >
                  <GitBranch className="size-3" />
                  Branch
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{title}</span>
      <div className="flex flex-col gap-2">{drafts.map(renderDraft)}</div>
    </div>
  );
}
