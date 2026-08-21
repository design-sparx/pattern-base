import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Timeline,
} from "@mantine/core";
import { IconGitBranch } from "@tabler/icons-react";

import type { BranchesProps } from "@patternbase/core";

export function Branches({
  branches,
  activeBranchId,
  onSelectBranch,
  onCreateBranch,
  title,
  variant = "list",
}: BranchesProps) {
  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        {title ? <Text fw={600} size="sm">
            {title}
          </Text> : null}
      </Group>

      {variant === "tree" ? (
        <Timeline bulletSize={20} lineWidth={2}>
          {branches.map((branch) => (
            <Timeline.Item
              key={branch.id}
              bullet={<IconGitBranch size={12} />}
              title={
                <Group
                  gap="xs"
                  style={{ paddingLeft: (branch.depth ?? 0) * 16 }}
                >
                  <Text
                    size="sm"
                    fw={activeBranchId === branch.id ? 600 : 400}
                    style={{ cursor: "pointer" }}
                    onClick={() => { onSelectBranch(branch.id); }}
                  >
                    {branch.label}
                  </Text>
                  {activeBranchId === branch.id && (
                    <Badge size="xs" variant="filled" color="violet">
                      Active
                    </Badge>
                  )}
                </Group>
              }
            >
              {branch.preview ? <Text size="xs" c="dimmed" lineClamp={1}>
                  {branch.preview}
                </Text> : null}
              {branch.createdAt ? <Text size="xs" c="dimmed">
                  {branch.createdAt.toLocaleDateString()}
                </Text> : null}
              <Button
                variant="subtle"
                size="compact-xs"
                mt={4}
                onClick={() => { onCreateBranch(branch.id); }}
              >
                Branch from here
              </Button>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <Stack gap="xs">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              padding="sm"
              withBorder
              style={{
                cursor: "pointer",
                outline:
                  activeBranchId === branch.id
                    ? "2px solid var(--mantine-color-violet-6)"
                    : undefined,
              }}
              onClick={() => { onSelectBranch(branch.id); }}
            >
              <Group justify="space-between" align="flex-start">
                <Stack gap={2} style={{ flex: 1 }}>
                  <Group gap="xs">
                    <Text size="sm" fw={500}>
                      {branch.label}
                    </Text>
                    {activeBranchId === branch.id && (
                      <Badge size="xs" variant="filled" color="violet">
                        Active
                      </Badge>
                    )}
                    {branch.parentId ? <Badge size="xs" variant="light" color="gray">
                        branch
                      </Badge> : null}
                  </Group>
                  {branch.preview ? <Text size="xs" c="dimmed" lineClamp={1}>
                      {branch.preview}
                    </Text> : null}
                  {branch.createdAt ? <Text size="xs" c="dimmed">
                      {branch.createdAt.toLocaleDateString()}
                    </Text> : null}
                </Stack>
                <Button
                  variant="subtle"
                  size="compact-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateBranch(branch.id);
                  }}
                >
                  Branch
                </Button>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
