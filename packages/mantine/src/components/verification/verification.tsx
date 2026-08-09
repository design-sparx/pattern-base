import {
  Anchor,
  Badge,
  Button,
  Card,
  Group,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconExternalLink,
  IconHelp,
  IconX,
} from "@tabler/icons-react";
import type { VerificationProps } from "@patternbase/core";

export function Verification({
  claims,
  onRunVerification,
  onSelectClaim,
  title = "Verification",
  showSources = true,
  variant: _variant = "list",
}: VerificationProps) {
  const statusColor = (status?: string) => {
    if (status === "verified") return "green";
    if (status === "disputed") return "red";
    if (status === "uncertain") return "orange";
    return "gray";
  };

  const statusIcon = (status?: string) => {
    if (status === "verified") return <IconCheck size={12} />;
    if (status === "disputed") return <IconX size={12} />;
    return <IconHelp size={12} />;
  };

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {onRunVerification && (
          <Button variant="light" size="compact-sm" onClick={onRunVerification}>
            Run Verification
          </Button>
        )}
      </Group>

      <Stack gap="xs">
        {claims.map((claim) => (
          <Card
            key={claim.id}
            padding="sm"
            withBorder
            style={{ cursor: onSelectClaim ? "pointer" : "default" }}
            onClick={() => onSelectClaim?.(claim.id)}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start">
                <Text size="sm" style={{ flex: 1 }}>
                  {claim.text}
                </Text>
                <Badge
                  color={statusColor(claim.status)}
                  variant="light"
                  leftSection={statusIcon(claim.status)}
                >
                  {claim.status ?? "unknown"}
                </Badge>
              </Group>

              <Group gap="xs" align="center">
                <Text size="xs" c="dimmed">
                  Confidence:
                </Text>
                <Progress
                  value={claim.confidence * 100}
                  size="xs"
                  color={statusColor(claim.status)}
                  style={{ flex: 1 }}
                />
                <Text size="xs" c="dimmed">
                  {Math.round(claim.confidence * 100)}%
                </Text>
              </Group>

              {showSources && claim.url && (
                <Anchor
                  href={claim.url}
                  target="_blank"
                  size="xs"
                  rel="noopener noreferrer"
                >
                  <Group gap={4}>
                    <IconExternalLink size={10} />
                    {claim.source ?? "Source"}
                  </Group>
                </Anchor>
              )}
              {showSources && claim.source && !claim.url && (
                <Text size="xs" c="dimmed">
                  {claim.source}
                </Text>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
