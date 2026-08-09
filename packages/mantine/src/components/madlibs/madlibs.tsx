import { useState } from "react";
import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import type { MadlibsProps } from "@patternbase/core";

export function Madlibs({
  template,
  variables,
  values: externalValues,
  onChange,
  onSubmit,
  title,
  description,
  isGenerating = false,
  showPreview = true,
  variant: _variant = "form",
}: MadlibsProps) {
  const [localValues, setLocalValues] = useState<Record<string, string>>(
    Object.fromEntries(
      variables.map((v) => [
        v.id,
        externalValues?.[v.id] ?? v.defaultValue ?? "",
      ]),
    ),
  );

  const values = externalValues ?? localValues;

  const handleChange = (id: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [id]: value }));
    onChange(id, value);
  };

  const renderTemplate = () => {
    let result = template;
    variables.forEach((v) => {
      result = result.replace(`{{${v.id}}}`, values[v.id] || `[${v.label}]`);
    });
    return result;
  };

  const allFilled = variables
    .filter((v) => v.required)
    .every((v) => values[v.id]?.trim());

  return (
    <Stack gap="sm">
      {title && <Text fw={600}>{title}</Text>}
      {description && (
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      )}

      {showPreview && (
        <Card padding="sm" withBorder>
          <Text size="sm" style={{ fontStyle: "italic" }}>
            {renderTemplate()}
          </Text>
        </Card>
      )}

      {variables.map((variable) => {
        const commonProps = {
          key: variable.id,
          label: variable.label,
          placeholder:
            variable.placeholder ?? `Enter ${variable.label.toLowerCase()}...`,
          required: variable.required,
        };

        if (variable.type === "select" && variable.options) {
          return (
            <Select
              {...commonProps}
              data={variable.options.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
              value={values[variable.id] ?? ""}
              onChange={(val) => handleChange(variable.id, val ?? "")}
            />
          );
        }

        if (variable.type === "number") {
          return (
            <NumberInput
              {...commonProps}
              value={values[variable.id] ? Number(values[variable.id]) : ""}
              onChange={(val) => handleChange(variable.id, String(val))}
            />
          );
        }

        if (variable.type === "textarea") {
          return (
            <Textarea
              {...commonProps}
              value={values[variable.id] ?? ""}
              onChange={(e) => handleChange(variable.id, e.currentTarget.value)}
              minRows={2}
              autosize
            />
          );
        }

        return (
          <TextInput
            {...commonProps}
            value={values[variable.id] ?? ""}
            onChange={(e) => handleChange(variable.id, e.currentTarget.value)}
          />
        );
      })}

      <Group justify="flex-end">
        <Button
          leftSection={<IconSend size={14} />}
          onClick={() => onSubmit(values)}
          disabled={!allFilled || isGenerating}
          loading={isGenerating}
          size="sm"
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
}
