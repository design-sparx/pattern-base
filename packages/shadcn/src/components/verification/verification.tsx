import { Check, ExternalLink, HelpCircle, X } from "lucide-react";

import type { VerificationProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  verified: "default",
  disputed: "destructive",
  uncertain: "secondary",
};

const statusIcon: Record<string, React.ReactNode> = {
  verified: <Check className="size-3" />,
  disputed: <X className="size-3" />,
  uncertain: <HelpCircle className="size-3" />,
};

export function Verification({
  claims,
  onRunVerification,
  onSelectClaim,
  title = "Verification",
  showSources = true,
  variant: _variant = "list",
}: VerificationProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        {onRunVerification ? (
          <Button variant="secondary" size="sm" onClick={onRunVerification}>
            Run Verification
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        {claims.map((claim) => (
          <Card
            key={claim.id}
            className={`${onSelectClaim ? "cursor-pointer" : ""} p-3`}
            onClick={() => onSelectClaim?.(claim.id)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <span className="flex-1 text-sm">{claim.text}</span>
                  <Badge variant={statusVariant[claim.status ?? "uncertain"]}>
                    {statusIcon[claim.status ?? "uncertain"]}
                    {claim.status ?? "unknown"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    Confidence:
                  </span>
                  <Progress value={claim.confidence * 100} className="flex-1" />
                  <span className="text-muted-foreground text-xs">
                    {Math.round(claim.confidence * 100)}%
                  </span>
                </div>

                {showSources && claim.url ? (
                  <a
                    href={claim.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="size-2.5" />
                    {claim.source ?? "Source"}
                  </a>
                ) : null}
                {showSources && claim.source && !claim.url ? (
                  <span className="text-muted-foreground text-xs">
                    {claim.source}
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
