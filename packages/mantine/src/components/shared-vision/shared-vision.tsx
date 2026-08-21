import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import type { SharedVisionProps } from "@patternbase/core";

export function SharedVision({
  participants,
  goals,
  context,
  onAddGoal,
  onSelectParticipant,
  title = "Shared Vision",
  variant = "board",
}: SharedVisionProps) {
  const [newGoal, setNewGoal] = useState("");

  const priorityColor = (priority?: string) => {
    if (priority === "high") return "red";
    if (priority === "medium") return "orange";
    return "blue";
  };

  const contextTypeColor = (type?: string) => {
    if (type === "constraint") return "red";
    if (type === "assumption") return "yellow";
    return "blue";
  };

  if (variant === "compact") {
    return (
      <Stack gap="sm">
        <Text fw={600} size="sm">
          {title}
        </Text>
        <Group gap="xs" wrap="wrap">
          {participants.map((p) => (
            <Badge
              key={p.id}
              variant="light"
              color={p.isActive ? "green" : "gray"}
              style={{ cursor: onSelectParticipant ? "pointer" : "default" }}
              onClick={() => onSelectParticipant?.(p.id)}
            >
              {p.name}
            </Badge>
          ))}
        </Group>
        <Stack gap={4}>
          {goals.map((g) => (
            <Group key={g.id} gap="xs">
              <Badge size="xs" color={priorityColor(g.priority)} variant="dot">
                {g.priority ?? "low"}
              </Badge>
              <Text size="sm">{g.text}</Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Text fw={600}>{title}</Text>

      <SimpleGrid cols={3} spacing="sm">
        <Card withBorder padding="sm">
          <Stack gap="sm">
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">
              Participants
            </Text>
            {participants.map((p) => (
              <Group
                key={p.id}
                gap="xs"
                style={{ cursor: onSelectParticipant ? "pointer" : "default" }}
                onClick={() => onSelectParticipant?.(p.id)}
              >
                <Avatar name={p.name} size="sm" radius="xl" color="violet" />
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {p.name}
                  </Text>
                  {p.role ? <Text size="xs" c="dimmed">
                      {p.role}
                    </Text> : null}
                </Stack>
                {p.isActive ? <Badge size="xs" color="green" variant="dot">
                    active
                  </Badge> : null}
              </Group>
            ))}
          </Stack>
        </Card>

        <Card withBorder padding="sm">
          <Stack gap="sm">
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">
              Goals
            </Text>
            {goals.map((g) => (
              <Group key={g.id} gap="xs" align="flex-start">
                <Badge
                  size="xs"
                  color={priorityColor(g.priority)}
                  variant="light"
                >
                  {g.priority ?? "low"}
                </Badge>
                <Text size="sm" style={{ flex: 1 }}>
                  {g.text}
                </Text>
              </Group>
            ))}
            {onAddGoal ? <Group gap="xs">
                <TextInput
                  placeholder="Add goal..."
                  value={newGoal}
                  onChange={(e) => { setNewGoal(e.currentTarget.value); }}
                  size="xs"
                  style={{ flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newGoal.trim()) {
                      onAddGoal(newGoal.trim());
                      setNewGoal("");
                    }
                  }}
                />
                <Button
                  size="compact-xs"
                  onClick={() => {
                    if (newGoal.trim()) {
                      onAddGoal(newGoal.trim());
                      setNewGoal("");
                    }
                  }}
                  disabled={!newGoal.trim()}
                >
                  <IconPlus size={12} />
                </Button>
              </Group> : null}
          </Stack>
        </Card>

        <Card withBorder padding="sm">
          <Stack gap="sm">
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">
              Context
            </Text>
            {context.map((c) => (
              <Stack key={c.id} gap={2}>
                <Group gap="xs">
                  <Badge
                    size="xs"
                    color={contextTypeColor(c.type)}
                    variant="light"
                  >
                    {c.type ?? "input"}
                  </Badge>
                  <Text size="xs" fw={500}>
                    {c.label}
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {c.value}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
