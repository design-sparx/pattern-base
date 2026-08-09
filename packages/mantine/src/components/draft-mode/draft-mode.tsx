import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Timeline,
} from "@mantine/core";
import { IconArrowBack, IconGitBranch } from "@tabler/icons-react";
import type { DraftModeProps } from "@patternbase/core";

export function DraftMode({
  drafts,
  activeDraftId,
  onSelectDraft,
  onRevertToDraft,
  onBranchFromDraft,
  title = "Draft History",
  variant = "list",
}: DraftModeProps) {
  return (
    <Stack gap="sm">
      <Text fw={600} size="sm">
        {title}
      </Text>

      {variant === "timeline" ? (
        <Timeline bulletSize={16} lineWidth={2}>
          {drafts.map((draft) => (
            <Timeline.Item
              key={draft.id}
              title={
                <Group gap="xs">
                  <Text
                    size="sm"
                    fw={activeDraftId === draft.id ? 600 : 400}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectDraft(draft.id)}
                  >
                    {draft.label ?? `Draft ${draft.number}`}
                  </Text>
                  {activeDraftId === draft.id && (
                    <Badge size="xs" variant="filled" color="violet">
                      Active
                    </Badge>
                  )}
                </Group>
              }
            >
              {draft.preview && (
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {draft.preview}
                </Text>
              )}
              {draft.createdAt && (
                <Text size="xs" c="dimmed">
                  {draft.createdAt.toLocaleString()}
                </Text>
              )}
              <Group gap="xs" mt={4}>
                <Button
                  variant="subtle"
                  size="compact-xs"
                  leftSection={<IconArrowBack size={12} />}
                  onClick={() => onRevertToDraft(draft.id)}
                >
                  Revert
                </Button>
                {onBranchFromDraft && (
                  <Button
                    variant="subtle"
                    size="compact-xs"
                    leftSection={<IconGitBranch size={12} />}
                    onClick={() => onBranchFromDraft(draft.id)}
                  >
                    Branch
                  </Button>
                )}
              </Group>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <Stack gap="xs">
          {drafts.map((draft) => (
            <Card
              key={draft.id}
              padding="sm"
              withBorder
              style={{
                cursor: "pointer",
                outline:
                  activeDraftId === draft.id
                    ? "2px solid var(--mantine-color-violet-6)"
                    : undefined,
              }}
              onClick={() => onSelectDraft(draft.id)}
            >
              <Group justify="space-between" align="flex-start">
                <Stack gap={2} style={{ flex: 1 }}>
                  <Group gap="xs">
                    <Text size="sm" fw={500}>
                      {draft.label ?? `Draft ${draft.number}`}
                    </Text>
                    {activeDraftId === draft.id && (
                      <Badge size="xs" variant="filled" color="violet">
                        Active
                      </Badge>
                    )}
                  </Group>
                  {draft.preview && (
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {draft.preview}
                    </Text>
                  )}
                  {draft.createdAt && (
                    <Text size="xs" c="dimmed">
                      {draft.createdAt.toLocaleString()}
                    </Text>
                  )}
                </Stack>
                <Group gap="xs">
                  <Button
                    variant="subtle"
                    size="compact-xs"
                    leftSection={<IconArrowBack size={12} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRevertToDraft(draft.id);
                    }}
                  >
                    Revert
                  </Button>
                  {onBranchFromDraft && (
                    <Button
                      variant="subtle"
                      size="compact-xs"
                      leftSection={<IconGitBranch size={12} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onBranchFromDraft(draft.id);
                      }}
                    >
                      Branch
                    </Button>
                  )}
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
