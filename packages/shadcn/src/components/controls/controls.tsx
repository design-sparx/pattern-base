import type { ControlsProps } from "@patternbase/core";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  restricted: "destructive",
  disabled: "secondary",
};

export function Controls({
  controls,
  onToggleControl,
  title,
  variant = "list",
  showStatus = true,
}: ControlsProps) {
  const renderControl = (control: (typeof controls)[0]) => {
    let switchLabel = "Enable";
    if (control.locked) {
      switchLabel = "This control is locked";
    } else if (control.enabled) {
      switchLabel = "Disable";
    }

    return (
      <Card key={control.id} className="p-3">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{control.label}</span>
                {showStatus && control.status ? (
                  <Badge variant={statusVariant[control.status] ?? "secondary"}>
                    {control.status}
                  </Badge>
                ) : null}
                {control.locked ? (
                  <Badge variant="outline">Locked</Badge>
                ) : null}
              </div>
              {control.description ? (
                <span className="text-muted-foreground text-xs">
                  {control.description}
                </span>
              ) : null}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={control.enabled}
                    onCheckedChange={(checked) => {
                      if (!control.locked) {
                        onToggleControl(control.id, checked);
                      }
                    }}
                    disabled={control.locked}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>{switchLabel}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}
      {variant === "cards" ? (
        <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {controls.map(renderControl)}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{controls.map(renderControl)}</div>
      )}
    </div>
  );
}
