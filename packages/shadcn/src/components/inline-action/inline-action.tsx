import type { InlineActionItem, InlineActionProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function getButtonVariant(type: InlineActionItem["type"]) {
  if (type === "primary") {
    return "secondary";
  }
  if (type === "danger") {
    return "destructive";
  }
  return "ghost";
}

function renderIcon(icon: InlineActionItem["icon"], iconClass: string) {
  if (typeof icon === "string") {
    return <span className={iconClass}>{icon}</span>;
  }
  if (icon) {
    return icon;
  }
  return <span className={iconClass}>·</span>;
}

export function InlineAction({
  actions,
  onAction,
  size = "medium",
}: InlineActionProps) {
  const iconClass = size === "small" ? "text-xs" : "text-sm";

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={getButtonVariant(action.type)}
                size="icon"
                className={cn(size === "small" && "size-7")}
                aria-label={action.label}
                onClick={() => {
                  onAction(action.id);
                }}
              >
                {renderIcon(action.icon, iconClass)}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
