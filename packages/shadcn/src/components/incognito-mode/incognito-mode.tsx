import { EyeOff } from "lucide-react";

import type { IncognitoModeProps } from "@patternbase/core";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function IncognitoMode({
  enabled,
  onToggle,
  onEndSession,
  title = "Incognito Mode",
  description,
  retentionNotice,
  variant = "card",
}: IncognitoModeProps) {
  const inner = (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EyeOff className="size-5 opacity-70" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{title}</span>
              {enabled ? (
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              ) : null}
            </div>
            {description ? (
              <span className="text-muted-foreground text-xs">
                {description}
              </span>
            ) : null}
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={(checked) => onToggle?.(checked)}
        />
      </div>

      {enabled && retentionNotice ? (
        <Alert>
          <EyeOff className="size-4" />
          <AlertDescription>
            <span className="text-xs">{retentionNotice}</span>
          </AlertDescription>
        </Alert>
      ) : null}

      {enabled && onEndSession ? (
        <Button variant="ghost" size="sm" onClick={onEndSession}>
          End Session
        </Button>
      ) : null}
    </div>
  );

  if (variant === "banner") {
    return (
      <Alert>
        <EyeOff className="size-4" />
        <AlertDescription>{inner}</AlertDescription>
      </Alert>
    );
  }

  if (variant === "inline") {
    return <div className="flex flex-col gap-3">{inner}</div>;
  }

  return (
    <Card className="p-4">
      <CardContent className="p-0">{inner}</CardContent>
    </Card>
  );
}
