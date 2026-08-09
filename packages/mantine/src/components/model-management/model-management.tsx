import { Badge, Card, Group, Radio, Stack, Text } from "@mantine/core";

import type { ModelInfo, ModelManagementProps } from "@patternbase/core";

export function ModelManagement({
  models,
  selectedModelId,
  onSelectModel,
  showDetails = true,
  groupByProvider = true,
}: ModelManagementProps) {
  const grouped = groupByProvider
    ? models.reduce<Record<string, ModelInfo[]>>((acc, m) => {
        const key = m.provider;
        if (!acc[key]) acc[key] = [];
        acc[key].push(m);
        return acc;
      }, {})
    : { All: models };

  return (
    <Card padding="sm" withBorder>
      <Stack gap="sm">
        <Text fw={600}>Model Selection</Text>
        <Radio.Group value={selectedModelId} onChange={onSelectModel}>
          <Stack gap="sm">
            {Object.entries(grouped).map(([provider, providerModels]) => (
              <div key={provider}>
                {groupByProvider && (
                  <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                    {provider}
                  </Text>
                )}
                <Stack gap="xs">
                  {providerModels.map((model) => (
                    <Card
                      key={model.id}
                      padding="xs"
                      withBorder
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          model.id === selectedModelId
                            ? "var(--mantine-color-violet-light)"
                            : undefined,
                      }}
                      onClick={() => onSelectModel(model.id)}
                    >
                      <Group justify="space-between" align="flex-start">
                        <Group gap="xs" align="flex-start">
                          <Radio value={model.id} mt={2} />
                          <Stack gap={2}>
                            <Text size="sm" fw={600}>
                              {model.name}
                            </Text>
                            {showDetails && model.description && (
                              <Text size="xs" c="dimmed">
                                {model.description}
                              </Text>
                            )}
                            {showDetails && (
                              <Group gap="xs">
                                {model.contextWindow && (
                                  <Text size="xs" c="dimmed">
                                    {(model.contextWindow / 1000).toFixed(0)}k
                                    ctx
                                  </Text>
                                )}
                                {model.costPer1kInput !== undefined && (
                                  <Text size="xs" c="dimmed">
                                    ${model.costPer1kInput}/1k in
                                  </Text>
                                )}
                              </Group>
                            )}
                          </Stack>
                        </Group>
                        {model.capabilities && (
                          <Group gap={4}>
                            {model.capabilities.slice(0, 2).map((c) => (
                              <Badge key={c} size="xs" variant="light">
                                {c}
                              </Badge>
                            ))}
                          </Group>
                        )}
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </div>
            ))}
          </Stack>
        </Radio.Group>
      </Stack>
    </Card>
  );
}
