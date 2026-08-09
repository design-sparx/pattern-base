import {
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { InitialCtaProps } from "@patternbase/core";

export function InitialCta({
  title,
  subtitle,
  actions,
  onAction,
  variant = "centered",
}: InitialCtaProps) {
  if (variant === "cards") {
    return (
      <Stack gap="md" align="center" py="lg">
        <Title order={3} ta="center">
          {title}
        </Title>
        {subtitle && (
          <Text size="sm" c="dimmed" ta="center" maw={480}>
            {subtitle}
          </Text>
        )}
        <SimpleGrid cols={Math.min(actions.length, 3)} spacing="sm">
          {actions.map((action) => (
            <Card
              key={action.id}
              padding="md"
              withBorder
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => onAction(action)}
            >
              <Stack gap="xs" align="center">
                {action.icon && (
                  <span style={{ fontSize: 24 }}>{action.icon}</span>
                )}
                <Text fw={600} size="sm">
                  {action.label}
                </Text>
                {action.description && (
                  <Text size="xs" c="dimmed">
                    {action.description}
                  </Text>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    );
  }

  if (variant === "minimal") {
    return (
      <Group gap="sm" wrap="wrap">
        <Text size="sm" fw={500}>
          {title}
        </Text>
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="subtle"
            size="compact-sm"
            leftSection={action.icon ? <span>{action.icon}</span> : undefined}
            onClick={() => onAction(action)}
          >
            {action.label}
          </Button>
        ))}
      </Group>
    );
  }

  return (
    <Stack gap="md" align="center" ta="center" py="lg">
      <Title order={3}>{title}</Title>
      {subtitle && (
        <Text size="sm" c="dimmed" maw={480}>
          {subtitle}
        </Text>
      )}
      <Group gap="sm" justify="center" wrap="wrap">
        {actions.map((action, i) => (
          <Button
            key={action.id}
            variant={i === 0 ? "filled" : "default"}
            leftSection={action.icon ? <span>{action.icon}</span> : undefined}
            onClick={() => onAction(action)}
          >
            {action.label}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
