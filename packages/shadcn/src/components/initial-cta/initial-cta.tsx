import type { InitialCtaProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function cardGridCols(count: number) {
  const cols = Math.min(count, 3);
  if (cols === 2) return "grid-cols-2";
  if (cols === 3) return "grid-cols-3";
  return "grid-cols-1";
}

export function InitialCta({
  title,
  subtitle,
  actions,
  onAction,
  variant = "centered",
}: InitialCtaProps) {
  if (variant === "cards") {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <h3 className="text-center text-lg font-semibold">{title}</h3>
        {subtitle ? (
          <p className="text-muted-foreground max-w-[480px] text-center text-sm">
            {subtitle}
          </p>
        ) : null}
        <div className={cn("grid gap-3", cardGridCols(actions.length))}>
          {actions.map((action) => (
            <Card
              key={action.id}
              className="cursor-pointer text-center"
              onClick={() => {
                onAction(action);
              }}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4">
                {action.icon ? (
                  <span className="text-2xl">{action.icon}</span>
                ) : null}
                <span className="text-sm font-semibold">{action.label}</span>
                {action.description ? (
                  <span className="text-muted-foreground text-xs">
                    {action.description}
                  </span>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium">{title}</span>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            size="sm"
            onClick={() => {
              onAction(action);
            }}
          >
            {action.icon ? <span>{action.icon}</span> : null}
            {action.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle ? (
        <p className="text-muted-foreground max-w-[480px] text-sm">
          {subtitle}
        </p>
      ) : null}
      <div className="flex flex-wrap justify-center gap-3">
        {actions.map((action, i) => (
          <Button
            key={action.id}
            variant={i === 0 ? "default" : "outline"}
            onClick={() => {
              onAction(action);
            }}
          >
            {action.icon ? <span>{action.icon}</span> : null}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
