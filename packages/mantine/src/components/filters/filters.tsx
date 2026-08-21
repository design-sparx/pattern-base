import {
  Button,
  Checkbox,
  Group,
  Radio,
  Select,
  Slider,
  Stack,
  Text,
} from "@mantine/core";

import type { FiltersProps } from "@patternbase/core";

export function Filters({
  groups,
  values,
  onChange,
  onClear,
  layout = "vertical",
  title,
}: FiltersProps) {
  const hasValues = Object.values(values).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== "",
  );

  const renderGroup = (group: (typeof groups)[0]) => (
    <Stack key={group.id} gap="xs">
      <Text size="xs" fw={500} c="dimmed" tt="uppercase">
        {group.label}
      </Text>

      {group.type === "checkbox" && group.options ? <Stack gap={4}>
          {group.options.map((opt) => {
            const currentVal = values[group.id];
            const checked = Array.isArray(currentVal)
              ? (currentVal as string[]).includes(opt.value)
              : currentVal === opt.value;
            return (
              <Checkbox
                key={opt.id}
                label={
                  <Group gap="xs">
                    <span>{opt.label}</span>
                    {opt.count !== undefined && (
                      <Text size="xs" c="dimmed">
                        ({opt.count})
                      </Text>
                    )}
                  </Group>
                }
                checked={Boolean(checked)}
                onChange={(e) => {
                  const current = (values[group.id] as string[]) ?? [];
                  if (e.currentTarget.checked) {
                    onChange(group.id, [...current, opt.value]);
                  } else {
                    onChange(
                      group.id,
                      current.filter((v) => v !== opt.value),
                    );
                  }
                }}
                size="sm"
              />
            );
          })}
        </Stack> : null}

      {group.type === "radio" && group.options ? <Radio.Group
          value={(values[group.id] as string) ?? ""}
          onChange={(val) => { onChange(group.id, val); }}
        >
          <Stack gap={4}>
            {group.options.map((opt) => (
              <Radio
                key={opt.id}
                value={opt.value}
                label={opt.label}
                size="sm"
              />
            ))}
          </Stack>
        </Radio.Group> : null}

      {group.type === "range" && (
        <Stack gap="xs">
          <Slider
            min={group.min ?? 0}
            max={group.max ?? 100}
            step={group.step ?? 1}
            value={(values[group.id] as number) ?? group.min ?? 0}
            onChange={(val) => { onChange(group.id, val); }}
          />
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              {group.min ?? 0}
            </Text>
            <Text size="xs" c="dimmed">
              {group.max ?? 100}
            </Text>
          </Group>
        </Stack>
      )}

      {group.type === "select" && group.options ? <Select
          data={group.options.map((o) => ({ value: o.value, label: o.label }))}
          value={(values[group.id] as string) ?? null}
          onChange={(val) => { onChange(group.id, val ?? ""); }}
          placeholder="Select..."
          size="sm"
          clearable
        /> : null}
    </Stack>
  );

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        {title ? <Text fw={500} size="sm">
            {title}
          </Text> : null}
        {onClear && hasValues ? <Button
            variant="subtle"
            size="compact-xs"
            color="gray"
            onClick={onClear}
          >
            Clear all
          </Button> : null}
      </Group>

      {layout === "horizontal" ? (
        <Group gap="md" align="flex-start" wrap="wrap">
          {groups.map(renderGroup)}
        </Group>
      ) : (
        <Stack gap="md">{groups.map(renderGroup)}</Stack>
      )}
    </Stack>
  );
}
