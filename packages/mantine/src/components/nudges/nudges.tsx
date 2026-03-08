import { useState } from "react";
import { Alert, Button, Stack } from "@mantine/core";
import {
  IconBulb,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";
import type { NudgesProps } from "@ai-ui/core";

export function Nudges({
  nudges,
  onDismiss,
  variant: _variant = "inline",
  maxVisible,
}: NudgesProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = nudges
    .filter((n) => !dismissed.has(n.id))
    .slice(0, maxVisible ?? nudges.length);

  if (visible.length === 0) return null;

  const getIcon = (type?: string) => {
    if (type === "reminder") return <IconAlertTriangle size={16} />;
    if (type === "suggestion") return <IconInfoCircle size={16} />;
    return <IconBulb size={16} />;
  };

  const getColor = (type?: string) => {
    if (type === "reminder") return "orange";
    if (type === "suggestion") return "blue";
    return "yellow";
  };

  return (
    <Stack gap="xs">
      {visible.map((nudge) => (
        <Alert
          key={nudge.id}
          icon={nudge.icon ? <span>{nudge.icon}</span> : getIcon(nudge.type)}
          color={getColor(nudge.type)}
          withCloseButton
          onClose={() => {
            setDismissed((prev) => new Set(prev).add(nudge.id));
            onDismiss?.(nudge.id);
          }}
        >
          {nudge.message}
          {nudge.actionLabel && nudge.onAction && (
            <Button
              variant="subtle"
              size="compact-xs"
              mt="xs"
              onClick={nudge.onAction}
            >
              {nudge.actionLabel}
            </Button>
          )}
        </Alert>
      ))}
    </Stack>
  );
}
