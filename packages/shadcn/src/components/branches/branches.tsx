import type { BranchesProps } from "@patternbase/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";

export function Branches({
  branches,
  activeBranchId,
  onSelectBranch,
  onCreateBranch,
  title,
  variant = "list",
}: BranchesProps) {
  const renderBranch = (branch: (typeof branches)[0]) => {
    if (variant === "tree") {
      return (
        <div
          key={branch.id}
          className="flex flex-col gap-1"
          style={{ paddingLeft: (branch.depth ?? 0) * 16 }}
        >
          <div className="flex items-center gap-2">
            <GitBranch className="size-3" />
            <span
              className={`text-sm ${activeBranchId === branch.id ? "font-semibold" : ""} cursor-pointer`}
              onClick={() => onSelectBranch(branch.id)}
            >
              {branch.label}
            </span>
            {activeBranchId === branch.id ? (
              <Badge variant="secondary">Active</Badge>
            ) : null}
          </div>
          {branch.preview ? (
            <span className="text-muted-foreground line-clamp-1 text-xs">
              {branch.preview}
            </span>
          ) : null}
          {branch.createdAt ? (
            <span className="text-muted-foreground text-xs">
              {branch.createdAt.toLocaleDateString()}
            </span>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-fit"
            onClick={() => onCreateBranch(branch.id)}
          >
            Branch from here
          </Button>
        </div>
      );
    }

    return (
      <Card
        key={branch.id}
        className={`cursor-pointer p-3 ${activeBranchId === branch.id ? "ring-primary ring-2" : ""}`}
        onClick={() => onSelectBranch(branch.id)}
      >
        <CardContent className="p-0">
          <div className="flex items-start justify-between">
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{branch.label}</span>
                {activeBranchId === branch.id ? (
                  <Badge variant="secondary">Active</Badge>
                ) : null}
                {branch.parentId ? (
                  <Badge variant="outline">branch</Badge>
                ) : null}
              </div>
              {branch.preview ? (
                <span className="text-muted-foreground line-clamp-1 text-xs">
                  {branch.preview}
                </span>
              ) : null}
              {branch.createdAt ? (
                <span className="text-muted-foreground text-xs">
                  {branch.createdAt.toLocaleDateString()}
                </span>
              ) : null}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={(e) => {
                e.stopPropagation();
                onCreateBranch(branch.id);
              }}
            >
              Branch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {title ? (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
        </div>
      ) : null}
      <div
        className={
          variant === "tree" ? "flex flex-col gap-2" : "flex flex-col gap-2"
        }
      >
        {branches.map(renderBranch)}
      </div>
    </div>
  );
}
