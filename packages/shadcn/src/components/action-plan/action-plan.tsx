import { Check, Circle, X } from "lucide-react";

import type { ActionPlanProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const statusIcon: Record<string, React.ReactNode> = {
  completed: <Check className="size-3" />,
  "in-progress": <Spinner className="size-3" />,
  failed: <X className="size-3" />,
  skipped: <span className="text-muted-foreground text-xs">—</span>,
  pending: <Circle className="text-muted-foreground size-3" />,
};

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  completed: "default",
  failed: "destructive",
  "in-progress": "secondary",
  skipped: "secondary",
  pending: "secondary",
};

export function ActionPlan({
  steps,
  title,
  onApprove,
  onReject,
  onStepClick,
  showEstimates = false,
}: ActionPlanProps) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col gap-3">
          {title ? (
            <span className="text-sm font-semibold">{title}</span>
          ) : null}

          <div className="flex flex-col gap-2">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start gap-2">
                <div className="mt-0.5 flex items-center justify-center">
                  {statusIcon[step.status] ?? null}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${onStepClick ? "cursor-pointer" : ""}`}
                      role={onStepClick ? "button" : undefined}
                      tabIndex={onStepClick ? 0 : undefined}
                      onClick={() => onStepClick?.(step.id)}
                      onKeyDown={(e) => {
                        if (
                          onStepClick &&
                          (e.key === "Enter" || e.key === " ")
                        ) {
                          e.preventDefault();
                          onStepClick(step.id);
                        }
                      }}
                    >
                      {step.title}
                    </span>
                    {step.tool ? (
                      <span className="text-muted-foreground text-xs">
                        ({step.tool})
                      </span>
                    ) : null}
                    <Badge variant={statusVariant[step.status]}>
                      {step.status}
                    </Badge>
                  </div>
                  {step.description ? (
                    <span className="text-muted-foreground text-xs">
                      {step.description}
                    </span>
                  ) : null}
                  {showEstimates && step.estimatedDuration ? (
                    <span className="text-muted-foreground text-xs">
                      Est: {step.estimatedDuration}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {(onApprove ?? onReject) ? (
            <div className="flex items-center gap-2">
              {onApprove ? (
                <Button size="sm" onClick={onApprove}>
                  Approve
                </Button>
              ) : null}
              {onReject ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={onReject}
                >
                  Reject
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
