import { AlertTriangle, Info, X } from "lucide-react";

import type { CaveatProps } from "@patternbase/core";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  info: <Info className="size-4" />,
  warning: <AlertTriangle className="size-4" />,
  error: <X className="size-4" />,
};

export function Caveat({
  message,
  variant = "banner",
  severity = "info",
  title,
  learnMoreUrl,
  dismissible = false,
  onDismiss,
}: CaveatProps) {
  const hasIcon = variant === "banner";

  return (
    <Alert className={hasIcon ? "" : ""}>
      {hasIcon ? (iconMap[severity] ?? iconMap.info) : null}
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>
        <div className="flex flex-col gap-1">
          <span className="text-sm">{message}</span>
          {learnMoreUrl ? (
            <a
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-1 text-xs underline"
            >
              Learn more
            </a>
          ) : null}
        </div>
      </AlertDescription>
      {dismissible ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 size-7"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <X className="size-3" />
        </Button>
      ) : null}
    </Alert>
  );
}
