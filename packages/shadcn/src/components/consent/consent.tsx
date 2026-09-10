import { useState } from "react";

import type { ConsentProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function Consent({
  items,
  onAccept,
  onDecline,
  title,
  description,
  acceptLabel = "Accept",
  declineLabel = "Decline",
  variant = "inline",
}: ConsentProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(
      items.map((item) => [item.id, item.defaultChecked ?? false]),
    ),
  );

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const requiredItems = items.filter((i) => i.required);
  const allRequiredChecked = requiredItems.every((i) => checked[i.id]);

  const handleAccept = () => {
    const acceptedIds = Object.entries(checked)
      .filter(([, v]) => v)
      .map(([k]) => k);
    onAccept(acceptedIds);
  };

  const inner = (
    <div className="flex flex-col gap-3">
      {title ? <span className="font-semibold">{title}</span> : null}
      {description ? (
        <span className="text-muted-foreground text-sm">{description}</span>
      ) : null}

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <label key={item.id} className="flex items-start gap-2">
            <Checkbox
              checked={Boolean(checked[item.id])}
              onCheckedChange={() => {
                toggle(item.id);
              }}
              disabled={item.required ? !item.defaultChecked : undefined}
              className="mt-0.5"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm">
                {item.label}
                {item.required ? (
                  <span className="text-destructive ml-1">*</span>
                ) : null}
              </span>
              {item.description ? (
                <span className="text-muted-foreground text-xs">
                  {item.description}
                </span>
              ) : null}
            </div>
          </label>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col gap-1.5">
        <Button onClick={handleAccept} disabled={!allRequiredChecked}>
          {acceptLabel}
        </Button>
        {onDecline ? (
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={onDecline}
          >
            {declineLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );

  if (variant === "modal") {
    return (
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title ?? "Consent"}</DialogTitle>
          </DialogHeader>
          {inner}
        </DialogContent>
      </Dialog>
    );
  }

  if (variant === "inline") {
    return inner;
  }

  return (
    <Card className="p-4">
      <CardContent className="p-0">{inner}</CardContent>
    </Card>
  );
}
