import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconBrush } from "@tabler/icons-react";
import type { InpaintingProps } from "@ai-ui/core";

export function Inpainting({
  content,
  regions,
  onRegionSelect,
  onApply,
  selectedRegionId,
  isProcessing = false,
  prompt = "",
  onPromptChange,
  title = "Inpainting",
  variant = "segment",
}: InpaintingProps) {
  const [localPrompt, setLocalPrompt] = useState(prompt);

  const handlePromptChange = (value: string) => {
    setLocalPrompt(value);
    onPromptChange?.(value);
  };

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Text fw={600} size="sm">
          {title}
        </Text>
        {isProcessing && <Loader size="xs" />}
      </Group>

      <Card padding="sm" withBorder>
        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
          {content}
        </Text>
      </Card>

      {regions.length > 0 && (
        <Stack gap="xs">
          <Text size="xs" fw={500} c="dimmed" tt="uppercase">
            Regions
          </Text>
          <Group gap="xs" wrap="wrap">
            {regions.map((region) => (
              <Badge
                key={region.id}
                variant={selectedRegionId === region.id ? "filled" : "light"}
                style={{ cursor: "pointer" }}
                onClick={() => onRegionSelect(region.id)}
              >
                {region.label ?? region.id}
              </Badge>
            ))}
          </Group>
        </Stack>
      )}

      {selectedRegion && (
        <Text size="xs" c="dimmed">
          Selected: <strong>{selectedRegion.label ?? selectedRegion.id}</strong>
        </Text>
      )}

      <Textarea
        placeholder="Describe what to replace in the selected region..."
        value={localPrompt}
        onChange={(e) => handlePromptChange(e.currentTarget.value)}
        minRows={2}
        autosize
        disabled={!selectedRegionId}
      />

      <Button
        leftSection={<IconBrush size={14} />}
        onClick={() => {
          if (selectedRegionId && localPrompt.trim()) {
            onApply(selectedRegionId, localPrompt.trim());
          }
        }}
        disabled={!selectedRegionId || !localPrompt.trim() || isProcessing}
        loading={isProcessing}
        size="sm"
        variant={variant === "brush" ? "filled" : "default"}
      >
        Apply
      </Button>
    </Stack>
  );
}
