import { Select, Slider, Stack, Switch, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import type { ParameterControlProps } from "@patternbase/core";

export function ParameterControl({
  parameters,
  onChange,
  title = "Parameters",
  layout = "vertical",
}: ParameterControlProps) {
  return (
    <Stack gap="md">
      {title && (
        <Text fw={600} size="md">
          {title}
        </Text>
      )}

      <div
        style={
          layout === "horizontal"
            ? { display: "flex", flexWrap: "wrap", gap: 16 }
            : undefined
        }
      >
        {parameters.map((param) => (
          <Stack
            key={param.id}
            gap="xs"
            style={{
              width: layout === "horizontal" ? 200 : "100%",
              marginBottom: layout === "vertical" ? 12 : 0,
            }}
          >
            <Text
              fw={500}
              size="sm"
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {param.label}
              {param.description && (
                <Tooltip label={param.description} withArrow>
                  <IconInfoCircle size={14} style={{ opacity: 0.5 }} />
                </Tooltip>
              )}
            </Text>

            {param.type === "slider" && (
              <>
                <Slider
                  min={param.min ?? 0}
                  max={param.max ?? 100}
                  step={param.step ?? 1}
                  value={param.value as number}
                  onChange={(v) => onChange(param.id, v)}
                />
                <Text size="xs" c="dimmed">
                  Current: {String(param.value)}
                </Text>
              </>
            )}

            {param.type === "toggle" && (
              <Switch
                checked={param.value as boolean}
                onChange={(e) => onChange(param.id, e.currentTarget.checked)}
                onLabel="On"
                offLabel="Off"
              />
            )}

            {param.type === "select" && (
              <Select
                value={param.value as string}
                onChange={(v) => onChange(param.id, v ?? "")}
                data={param.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value as string,
                }))}
              />
            )}

            {param.type === "matrix" &&
              (() => {
                const matrixValue = param.value as
                  | Record<string, number>
                  | undefined;
                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <Text size="xs" c="dimmed">
                        {param.options?.[0]?.label ?? "X Axis"}
                      </Text>
                      <Slider
                        value={matrixValue?.x ?? 50}
                        onChange={(x) =>
                          onChange(param.id, { ...matrixValue, x })
                        }
                      />
                    </div>
                    <div>
                      <Text size="xs" c="dimmed">
                        {param.options?.[1]?.label ?? "Y Axis"}
                      </Text>
                      <Slider
                        value={matrixValue?.y ?? 50}
                        onChange={(y) =>
                          onChange(param.id, { ...matrixValue, y })
                        }
                      />
                    </div>
                  </div>
                );
              })()}
          </Stack>
        ))}
      </div>
    </Stack>
  );
}
