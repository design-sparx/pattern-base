import { Alert, Anchor, Text } from "@mantine/core";
import { IconAlertTriangle, IconInfoCircle, IconX } from "@tabler/icons-react";

import type { CaveatProps } from "@patternbase/core";

export function Caveat({
  message,
  variant = "banner",
  severity = "info",
  title,
  learnMoreUrl,
  dismissible = false,
  onDismiss,
}: CaveatProps) {
  const iconMap = {
    info: <IconInfoCircle size={16} />,
    warning: <IconAlertTriangle size={16} />,
    error: <IconX size={16} />,
  };

  const colorMap = {
    info: "blue",
    warning: "orange",
    error: "red",
  };

  return (
    <Alert
      icon={iconMap[severity]}
      color={colorMap[severity]}
      title={title}
      withCloseButton={dismissible}
      onClose={() => {
        onDismiss?.();
      }}
      variant={variant === "banner" ? "filled" : "light"}
    >
      <Text size="sm">{message}</Text>
      {learnMoreUrl ? <Anchor
          href={learnMoreUrl}
          target="_blank"
          size="xs"
          rel="noopener noreferrer"
          mt={4}
          display="block"
        >
          Learn more
        </Anchor> : null}
    </Alert>
  );
}
