import { Loader2, Wand2 } from "lucide-react";

import type { TransformOption, TransformProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function renderLeadingIcon(
  icon: TransformOption["icon"],
  isTransforming: boolean,
) {
  if (isTransforming) {
    return <Loader2 className="size-3.5 animate-spin" />;
  }
  if (icon) {
    return <span>{icon}</span>;
  }
  return <Wand2 className="size-3.5" />;
}

export function Transform({
  content,
  options,
  onTransform,
  transformedContent,
  isTransforming = false,
  title,
}: TransformProps) {
  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      <Card>
        <CardContent className="p-3">
          <p className="text-sm">{transformedContent ?? content}</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-2">
        {options.map((opt) => (
          <Button
            key={opt.id}
            variant="outline"
            size="sm"
            disabled={isTransforming}
            onClick={() => {
              onTransform(opt.id);
            }}
          >
            {renderLeadingIcon(opt.icon, isTransforming)}
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
